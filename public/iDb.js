let db;
// Define string name value of primary objectStore
const transactionStore = "Transactions";
// Store iDB session as variable
const request = indexedDB.open("pennyDB", 1);

const saveRecord = async (record) =>
  await db
    .transaction([transactionStore], "readwrite")
    .objectStore(transactionStore)
    .add(record);

// Checks for changes to iDB and updates accordingly, creates objectStore if not present
request.onupgradeneeded = function (e) {
  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;
  console.log(`PennyDB UPDATED from version ${oldVersion} to ${newVersion}`);

  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore(transactionStore, {
      autoIncrement: true
    });
  }
};

// Checks
request.onsuccess = function (e) {
  console.log(e.target.result);

  db = e.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (e) {
  console.log(`Error: ${e.target.errorCode}`);
};

function checkDatabase() {
  let transaction = db
    .transaction([transactionStore], "readwrite")
    .objectStore(transactionStore)
    .getAll();

  transaction.onsuccess = function () {
    if (transaction.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(transaction.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.length !== 0) {
            clearStore();
          }
        });
    }
  };
}
function clearStore() {
  db.transaction([transactionStore], "readwrite")
    .objectStore(transactionStore)
    .clear();
}

window.addEventListener("online", checkDatabase);
