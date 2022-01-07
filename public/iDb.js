function checkForIndexedDb() {
     
}

const request = window.indexedDB.open("pennyDb", 1);

request.onsuccess = e => {
     console.log(request.result);
}
request.onupgradeneeded = ({target}) => {
     const db = target.result;
     const objectStore = db.createObjectStore("Transactions");
};

module.exports = {checkForIndexedDb};