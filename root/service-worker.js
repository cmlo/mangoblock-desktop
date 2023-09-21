const CACHE_NAME = 'static-cache-v2-6-0';

const FILES_TO_CACHE = [
    "/index.html",
    "/manifest.json",
    "/favicon.ico",
    "/mangoblock.js",    

    "/blockly/closure/goog/base.js",
    "/blockly/blockly_compressed.js",
    "/blockly/blocks_compressed.js",
    "/blockly/python_compressed.js",
    "/blockly/javascript_compressed.js",
    "/blockly/themes/classic.js",
    "/blockly/msg/index.js",
    "/blockly/msg/lang/en.js",
    "/blockly/msg/ext/en.js",
    "/js/utilities.js",
    "/js/settings.js",
    "/js/install.js",
    "/blockly/extensions/blocks.js",
    "/blockly/extensions/generator.js",

    "js/jquery-3.5.1.min.js",
    "js/jquery-ui.js",
    "css/jquery-ui.css",
    "js/pako.min.js",
    "js/md5.min.js",
    "plug-in/notiflix/notiflix-2.3.3.min.css",
    "plug-in/notiflix/notiflix-2.3.3.min.js",
    "plug-in/tippyjs/popper.min.js",
    "plug-in/tippyjs/tippy-bundle.umd.min.js",
    "plug-in/xterm.js/xterm.css",
    "plug-in/xterm.js/xterm.js",
    "plug-in/xterm.js/xterm-addon-fit.js",
    "js/esptool.js",    
    "plug-in/fontawesome/css/all.min.css",
    "css/animate.min.css",
    "css/note.css",
    "css/terminal.css",
    "css/board-info.css",
    "css/style-base.css",
    "css/style-main.css",
    "css/toolbox-style.css",
    "css/switch.css",

    "plug-in/monaco-editor/min/vs/editor/editor.main.css",
    "plug-in/monaco-editor/min/vs/loader.js",
    "plug-in/monaco-editor/min/vs/editor/editor.main.nls.js",
    "plug-in/monaco-editor/min/vs/editor/editor.main.js",
    "js/code2block.js",
    "js/Notify.js",
    "js/Base64.js",
    "js/vFS.js",
    "js/GitHubAPI.js",
    "js/mode.js",
    "js/firmware.js",
    "js/serial.js",
    "js/tools.js",
    "js/terminal.js",
    "js/note.js",
    "js/dialog.js",
    "js/extension.js",
    "js/examples.js",
    "js/board.js",
    "boards/index.js",
    "js/menu.js",
    "js/ui.js",
    "js/app.js"
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    // console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('index.html');
                });
            })
    );
});