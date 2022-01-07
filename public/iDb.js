export function checkForIndexedDb() {
     if (!window.indexedDB) {
          console.log("Your browser doesn't support a stable version of IndexedDB.");
          return false;
        }
        return true;
}

export function saveRecord(databaseName, storeName, method, object) {
     return new Promise((resolve, reject) => {
          const request = window.indexedDB.open(databaseName, 1);

          let db, tx, store;

          request.onupgradeneeded = (e) => {
               const db = request.result;
               db.createObjectStore(storeName);
          };
          request.onerror = (e) => {
               console.log("There was an error using indexedDB! =(")
          }
          request.onsuccess = (e) => {
               db = request.result;
               tx = db.transaction(storeName, "readwrite");
               store = tx.objectStore(storeName);

               db.onerror = function(e) {
                    console.log("Error in IDB onsuccess method")
               }

               if (method === "post") {
                    store.put(object);
               } else if (method === "get") {
                    const all = store.getAll();
                    all.onsuccess = () => {
                         resolve(all.result);
                    }
               }
               tx.oncomplete = () => {
                    db.close();
               }
          }
     })
}

