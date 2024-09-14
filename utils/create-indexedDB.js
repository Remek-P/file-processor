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

export const getAllData = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const getFileNames = async () => {
  const db = await initDB();
  return await db.getAllKeys(STORE_NAME);
};