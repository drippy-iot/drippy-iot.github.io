import { manifest, version } from '@parcel/service-worker';

import { assert } from './assert.ts';

async function installWorker() {
    // Get all the new assets
    const cache = await caches.open(version);
    return cache.addAll(manifest);
}

async function activateWorker() {
    const keys = await caches.keys();
    const deletePromises = keys.map(key =>
        key === version ? Promise.resolve(true) : caches.delete(key)
    );
    const results = await Promise.all(deletePromises);
    assert(results.every(x => x));
}

self.addEventListener(
    'install',
    evt => {
        assert(evt instanceof ExtendableEvent);
        evt.waitUntil(installWorker());
    },
    { once: true, passive: true }
);

self.addEventListener('activate', evt => {
    assert(evt instanceof ExtendableEvent);
    evt.waitUntil(activateWorker());
});
