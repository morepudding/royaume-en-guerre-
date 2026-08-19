const CACHE_PREFIX = "royaumes-";
const PRECACHE = "royaumes-precache-v10";
const RUNTIME = "royaumes-runtime-v10";

const CORE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/assets/buildings/human-tower.webp",
  "/assets/buildings/orc-fortress.webp",
  "/assets/buildings/orc-tower.webp",
  "/assets/buildings/orc-village.webp",
  "/assets/mission-2/fortress.png",
  "/assets/mission-2/river-diorama.webp",
  "/assets/mission-2/village.png",
];

const OPTIONAL_MAP_URLS = [
  ...Array.from(
    { length: 15 },
    (_, index) => `/assets/maps/mission-${String(index + 1).padStart(2, "0")}.webp`,
  ),
];

const canCache = response =>
  response && response.ok && response.type === "basic";

const cacheResponse = async (cacheName, request, response) => {
  if (!canCache(response)) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
};

const precacheAppShell = async () => {
  const cache = await caches.open(PRECACHE);
  await cache.addAll(CORE_URLS);
  await Promise.allSettled(OPTIONAL_MAP_URLS.map(url => cache.add(url)));

  const shell = await cache.match("/");
  if (!shell) return;

  const html = await shell.clone().text();
  const shellAssets = [
    ...new Set(
      [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
        .map(match => new URL(match[1], self.location.origin))
        .filter(
          url =>
            url.origin === self.location.origin &&
            url.pathname.startsWith("/_next/static/"),
        )
        .map(url => url.href),
    ),
  ];

  if (shellAssets.length) await cache.addAll(shellAssets);
};

const navigationResponse = async event => {
  const { request } = event;
  try {
    const response = (await event.preloadResponse) || (await fetch(request));
    await cacheResponse(RUNTIME, request, response);
    await cacheResponse(PRECACHE, "/", response);
    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match("/")) ||
      Response.error()
    );
  }
};

const cacheFirst = async request => {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  await cacheResponse(RUNTIME, request, response);
  return response;
};

const staleWhileRevalidate = async (event, request) => {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then(async response => {
      await cacheResponse(RUNTIME, request, response);
      return response;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }

  return (await network) || Response.error();
};

self.addEventListener("install", event => {
  event.waitUntil(
    precacheAppShell().then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(
              key =>
                key.startsWith(CACHE_PREFIX) &&
                key !== PRECACHE &&
                key !== RUNTIME,
            )
            .map(key => caches.delete(key)),
        ),
      ),
      self.registration.navigationPreload?.enable(),
    ]).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(navigationResponse(event));
    return;
  }

  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname === "/favicon.svg" ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event, request));
});
