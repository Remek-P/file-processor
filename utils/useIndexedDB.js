import { useEffect, useState } from "react";

export default function useIndexedDB(data = null) {
  if (data === null) {

  }
const [loadStorage, setLoadStorage] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('savedFiles');
    if (saved) {
      setLoadStorage(JSON.parse(saved));
    }
  }, []);

  return loadStorage;
}