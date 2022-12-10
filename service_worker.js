// Cache name
const CACHE_NAME = 'tbos_cache';
// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './js/chart.js',
  './js/default.js',
  './js/graph.js',
  './js/jquery.min.js',
  './img/TBoS_icon_ios.png',
  './img/TBoS_icon.png',
  './img/TBoS_logo.png',
  './img/TBoS_title.png',
  './css/default.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(async function() {
		try{
			var res = await fetch(event.request);
			var cache = await caches.open(CACHE_NAME);
			cache.put(event.request.url, res.clone());
			return res;
		}
		catch(error){
			return caches.match(event.request);
		}
	}());
});


// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         return response ? response : fetch(event.request);
//       })
//   );
// });