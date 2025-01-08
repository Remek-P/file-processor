self.onmessage = async function (e) {
  const { dbName } = e.data;
  const openDB = indexedDB.open(dbName, 1);

  openDB.onsuccess = async function (event) {
    const db = event.target.result;
    let totalSize = 0;

    const objectStoreNames = db.objectStoreNames;

    for (const storeName of objectStoreNames) {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);

      const cursor = store.openCursor();
      await new Promise((resolve, reject) => {
        cursor.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            const sizeInBytes = new Blob([JSON.stringify(cursor.value)]).size;
            totalSize += sizeInBytes;
            cursor.continue();
          } else {
            resolve();
          }
        };
        cursor.onerror = reject;
      });
    }

    postMessage(totalSize);
  };

  openDB.onerror = function () {
    postMessage('Error accessing IndexedDB');
  };
};