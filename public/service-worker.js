const CACHE_NAME = "penny-static-v1";
const DATA_CACHE_NAME = "penny-data-v1";
const STATICS = [
     "/",
     "/index.html",
     "/index.js",
     "/iDb.js",
     "/styles.css",
     "manifest.webmanifest",
     "/icons/dollar-coin.png"
];

self.addEventListener("install",  (e) => {
     e.waitUntil(
          caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
     );
     e.waitUntil(
          caches.open(CACHE_NAME).then( (cache) => cache.addAll(STATICS))
     );
     self.skipWaiting();
})

self.addEventListener("activate", (e) => {
     e.waitUntil(
          caches.keys().then(keyList => {
               return Promise.all(
                    keyList.map(key => {
                         if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                              console.log("Removing old cache data", key);
                              return caches.delete(key);
                         }
                    })
               )
          })
     )
     self.clients.claim();
})

self.addEventListener("fetch", (e) => {
     if (e.request.url.includes("/api")) {
          e.respondWith(
               caches.open(DATA_CACHE_NAME)
               .then(async cache => {
                    try {
                         const res = await fetch(e.request);
                         if (res.status === 200) {
                              cache.put(e.request.url, res.clone());
                         }
                         return res;
                    } catch (err) {
                         return cache.match(e.request);
                    }
               }).catch(err => console.log(err))
          );
          return;
     }
     e.respondWith(
          caches.open(CACHE_NAME).then(cache => {
               return cache.match(e.request).then( res => {
                    return res || fetch(e.request)
               })
          })
     )
})