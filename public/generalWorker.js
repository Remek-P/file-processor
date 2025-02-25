import { generalWorker } from "@/constants/constants";

self.onmessage = (e) => {
  const { task, args } = e.data;  // Destructure task type and arguments
  let result;

  switch (task) {
    case generalWorker.filter:
      result = filterData(...args);
      break;

    default:
      result = { error: "Invalid task type" };
  }

  self.postMessage(result);
};

const filterData = (array, filterValue) => array.filter(item => item !== filterValue);

