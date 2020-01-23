//menyimpan aset ke cache
const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/achievements.html",
  "/pages/contact.html",
  "/pages/experiences.html",
  "/pages/home.html",
  "/pages/volunteering.html",
  "/css/materialize.min.css",
  "/img/icon-128x128.png",
  "/img/icon-192x192.png",
  "/img/icon-512x512.png",
  "/img/pasfoto.jpg",
  "/img/experience1.png",
  "/img/huawei.jpg",
  "/img/imt.jpg",
  "/img/mgg.jpg",
  "/img/mtf.jpg",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/manifest.json"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//menggunakan aset dari cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

//mekanisme penghapusan cache lama
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});