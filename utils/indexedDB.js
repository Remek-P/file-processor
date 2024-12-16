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

export const checkIndexedDB_Size = async () => {
  try {
    const db = await initDB();
    let totalSize = 0;

    // Get all object store names from the database
    const storeNames = db.objectStoreNames;

    for (const storeName of storeNames) {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);

      const cursor = store.openCursor();
      await cursor.iterate(async (cursor) => {
        const value = cursor.value;

        // Estimate the size of the object by converting it to a JSON string
        const sizeInBytes = new Blob([JSON.stringify(value)]).size;
        totalSize += sizeInBytes;
      });
    }

    return totalSize;
  } catch (err) {
    console.error('Error calculating IndexedDB size:', err);
    return 0;
  }
};

// TODO: Add a component to suggest cleaning the storage;

export const isIndexedDB_LimitReached = async () => {
  try {
    const size = await checkIndexedDB_Size(); // Ensure checkIndexedDB_Size() returns the size in bytes
    const limit = 5 * 1024 * 1024; // Set the limit to 5 MB
    return size >= limit; // Return true if size exceeds the limit, false otherwise
  } catch (err) {
    console.error('Error checking IndexedDB size:', err);
    return false; // Return false in case of an error
  }
}