import { openDB } from 'idb';
import { DB_NAME, STORE_NAME } from "@/constants/constants";

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  return db;
};

export const addData = async (key, value) => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key); // Adds or updates the value by key
};

export const getData = async (key) => {
  const db = await initDB();
  return await db.get(STORE_NAME, key);
};

export const deleteData = async (key) => {
  const db = await initDB();
  return await db.delete(STORE_NAME, key);
};

export const deleteDataAll = async () => {
  const db = await initDB();
  return await db.clear(STORE_NAME);
};

export const getAllData = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const getFileNames = async () => {
  const db = await initDB();
  return await db.getAllKeys(STORE_NAME);
};

export const checkIndexedDB_Size = (dbName, addWarnings, setTotalSize) => {
  const worker = new Worker(new URL("@/public/checkIndexedDB_SizeWorker.js", import.meta.url));

  worker.postMessage({ dbName });

  worker.onmessage = (event) => {
    const result = event.data;

    if (typeof result === 'string' && result.includes('Error')) {
      addWarnings(result);
      console.error(result);
      setTotalSize(null);
    } else {
      const mbSize = result / (1024 * 1024);
      const mbSizeNumber = parseFloat(mbSize.toFixed(2));
      setTotalSize(mbSizeNumber);
    }

    worker.terminate();
  };

  // Handle worker errors
  worker.onerror = (error) => {
    console.error('Worker error:', error);
    addWarnings('An error occurred while calculating the size.');
    worker.terminate();
  };
}
