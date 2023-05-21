import { manifest, version } from "@parcel/service-worker";
import { assert } from "./assert";

async function installWorker() {
    const INDEX  = '/index.html';
    const files = manifest.map(path => {
        if (path.endsWith(INDEX))
            return path.slice(0, -INDEX.length) || '/';
        return path;
    });

    // Get all the new assets
    const cache = await caches.open(version);
    return cache.addAll(files);
}

async function activateWorker() {
    const keys = await caches.keys();
    const deletePromises = keys.map(key => {
        if (key !== version) return caches.delete(key);
    })
    const results = await Promise.all(deletePromises)
    assert(results.every(x => x));
}

self.addEventListener('install', evt => {
    assert(evt instanceof ExtendableEvent);
    evt.waitUntil(installWorker());
}, { once: true, passive: true });

self.addEventListener('activate', evt => {
    assert(evt instanceof ExtendableEvent);
    evt.waitUntil(activateWorker());
})

