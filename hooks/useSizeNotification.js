import { useContext } from "react";
import { IndexedDB_ClickedContext, IndexedDB_SizeContext } from "@/context/global-context";

function UseSizeNotification() {
  const [ totalSize ] = useContext(IndexedDB_SizeContext);
  const [ clickCount, setClickCount ] = useContext(IndexedDB_ClickedContext);

  const sizeLimit = totalSize > 48;

  const checkLoadCount = () => {
    const isClickLimit = clickCount % 5 === 0;
    return sizeLimit && isClickLimit;
  }

  const handleSizeNotification = (componentFunction, componentFunction2) => {
    if (checkLoadCount()) {
      componentFunction()
      setClickCount(prevState => prevState + 1);
    }
    else {
      componentFunction2();
      setClickCount(prevState => prevState + 1);
    }
  }

  return { handleSizeNotification }
}

export default UseSizeNotification;