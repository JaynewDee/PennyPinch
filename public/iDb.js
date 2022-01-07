let db;

const transactionStore = 'Transactions';
const request = indexedDB.open('pennyDB', 1);

request.onupgradeneeded = function (e) {
     const {
          oldVersion
     } = e;
     const newVersion = e.newVersion || db.version;
     console.log(`PennyDB UPDATED from version ${oldVersion} to ${newVersion}`);

     db = e.target.result;

     if (db.objectStoreNames.length === 0) {
          db.createObjectStore(transactionStore, {
               autoIncrement: true
          });
     }
};

request.onsuccess = function (e) {
     db = e.target.result;

     if (navigator.onLine) {
          checkDatabase();
     }
};

request.onerror = function (e) {
     console.log(`Error: ${e.target.errorCode}`);
};

function checkDatabase() {

     let transaction = db.transaction([transactionStore], 'readwrite')
          .objectStore(transactionStore)
          .getAll();

     transaction.onsuccess = function () {
          if (transaction.result.length > 0) {
               fetch('/api/transaction/bulk', {
                         method: 'POST',
                         body: JSON.stringify(transaction.result),
                         headers: {
                              Accept: 'application/json, text/plain, */*',
                              'Content-Type': 'application/json',
                         },
                    })
                    .then((response) => response.json())
                    .then((res) => {
                         if (res.length !== 0) {
                                   clearStore()
                         }
                    });
          }
     };
}
function clearStore() {
     db.transaction([transactionStore], 'readwrite')
     .objectStore(transactionStore)
     .clear();
}
const saveRecord = async (record) => {
     await
     db.transaction([transactionStore], 'readwrite')
          .objectStore(transactionStore)
          .add(record);
};

window.addEventListener('online', checkDatabase)