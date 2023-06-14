import { assert } from '../assert.ts';
import { BASE } from './base.ts';
import {
    type Bypass,
    type Close,
    type Flow,
    type Open,
    BypassSchema,
    CloseSchema,
    FlowSchema,
    OpenSchema,
} from '../models/user.ts';

export interface MetricsListener {
    onFlows(flow: Flow[]): void;
    onOpen(timestamp: Open): void;
    onClose(timestamp: Close): void;
    onBypass(timestamp: Bypass): void;
}

export async function getUserMetrics(
    listener: MetricsListener,
    since: Date,
    secs?: number
) {
    const params = new URLSearchParams({ since: since.valueOf().toString() });
    if (typeof secs !== 'undefined') params.set('secs', secs.toString());

    const src = new EventSource(`${BASE}/api/metrics/user?${params}`, {
        withCredentials: true,
    });

    // Attempt to connect to the server
    await new Promise((resolve, reject) => {
        src.addEventListener('error', reject, { once: true, passive: true });
        src.addEventListener('open', resolve, { once: true, passive: true });
    });

    // NOTE: From this point forward, we silently consume the errors.
    src.addEventListener('error', console.error, { passive: true });
    src.addEventListener(
        'flow',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            listener.onFlows(FlowSchema.array().parse(json));
        },
        { passive: true }
    );
    src.addEventListener(
        'shutdown',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            listener.onClose(CloseSchema.parse(json));
        },
        { passive: true }
    );
    src.addEventListener(
        'reset',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            listener.onOpen(OpenSchema.parse(json));
        },
        { passive: true }
    );
    src.addEventListener(
        'bypass',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            listener.onBypass(BypassSchema.parse(json));
        },
        { passive: true }
    );

    return src.close.bind(src);
}

export async function getSystemMetrics(
    listener: Pick<MetricsListener, 'onFlows'>,
    since: Date,
    secs?: number
) {
    const params = new URLSearchParams({ since: since.valueOf().toString() });
    if (typeof secs !== 'undefined') params.set('secs', secs.toString());

    const src = new EventSource(`${BASE}/api/metrics/system?${params}`, {
        withCredentials: true,
    });

    // Attempt to connect to the server
    await new Promise((resolve, reject) => {
        src.addEventListener('error', reject, { once: true, passive: true });
        src.addEventListener('open', resolve, { once: true, passive: true });
    });

    // NOTE: From this point forward, we silently consume the errors.
    src.addEventListener('error', console.error, { passive: true });
    src.addEventListener(
        'flow',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            listener.onFlows(FlowSchema.array().parse(json));
        },
        { passive: true }
    );

    return src.close.bind(src);
}
