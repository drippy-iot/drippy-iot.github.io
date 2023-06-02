import { writable } from 'svelte/store';

interface Flow {
    ts: Date;
    flow: number;
}

export const flow = writable<Flow[]>([]);

function mockUpdate() {
    flow.update(old => {
        old.push({
            ts: new Date(),
            flow: Math.floor(Math.random() * 100),
        });
        return old;
    });
}

setInterval(mockUpdate, 1000);
