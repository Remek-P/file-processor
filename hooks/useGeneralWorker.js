import {useState, useCallback, useContext} from 'react';
import {IsLoadingContext, WarningsContext} from "@/context/global-context";

const useWebWorker = ({ customSetData }) => {

  const [ , setIsLoading] = useContext(IsLoadingContext);
  const { addWarnings } = useContext(WarningsContext);

  const [data, setData] = useState(null); // Default `setData` function if no custom function is provided

  // The runTask function now accepts a custom data setter
  const runTask = useCallback(
      (task, args) => {
        setIsLoading(true);

        const worker = new Worker(new URL('@/public/generalWorker.js', import.meta.url));
        worker.postMessage({ task, args });

        worker.onmessage = (e) => {
          // Use customSetData if it's provided, otherwise fall back to the default setData
          if (customSetData) {
            customSetData(e.data);  // Update data using the custom setter
          } else {
            setData(e.data);  // Update the component's local state
          }

          setIsLoading(false);
          worker.terminate();
        };

        worker.onerror = (error) => {
          addWarnings(error.message);
          setIsLoading(false);
          worker.terminate();
        };
      },
      [customSetData]
  );

  return {
    data,
    runTask,
  };
};

export default useWebWorker;
