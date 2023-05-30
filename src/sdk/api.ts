import { StatusCodes } from 'http-status-codes';

import { assert } from '../assert.ts';
import { InvalidSession, UnexpectedStatusCode } from './error.ts';
import { type UserMessage, UserMessageSchema } from '../models/user.ts';

/**
 * Assuming that the user has already logged in (i.e., there exists a valid session ID
 * in the cookie store), this endpoint sends a request to the Cloud to reset or manually
 * bypass a locked unit (i.e., "closed valve").
 *
 * Returns `true` if the unit was previously locked. Returns `false` if the device is
 * already unlocked (due to a previous invocation for example).
 */
export async function requestReset(): Promise<boolean> {
    const { status } = await fetch('/api/reset', {
        method: 'POST',
        credentials: 'include',
    });
    switch (status) {
        case StatusCodes.OK:
            return true;
        case StatusCodes.ACCEPTED:
            return false;
        case StatusCodes.UNAUTHORIZED:
            throw new InvalidSession();
        default:
            throw new UnexpectedStatusCode(status);
    }
}

/**
 * Assuming that the user has already logged in (i.e., there exists a valid session ID
 * in the cookie store), this endpoint sends a request to the Cloud to shut down the
 * device associated with the session.
 *
 * Returns `true` if we are the first to request the shutdown. Returns `false` if a
 * previous invocation has already requested the shutdown, but the device is yet to poll
 * the server for its remote shutdown.
 */
export async function requestShutdown(): Promise<boolean> {
    const { status } = await fetch('/api/shutdown', {
        method: 'POST',
        credentials: 'include',
    });
    switch (status) {
        case StatusCodes.OK:
            return true;
        case StatusCodes.ACCEPTED:
            return false;
        case StatusCodes.UNAUTHORIZED:
            throw new InvalidSession();
        default:
            throw new UnexpectedStatusCode(status);
    }
}

export type MetricsCallback = (message: UserMessage) => void;

export async function getMetrics(since: Date, callback: MetricsCallback): Promise<UserMessage[]> {
    const source = new EventSource(`/api/metrics?start=${since.valueOf()}`, { withCredentials: true });

    // Attempt to connect to the server
    await new Promise((resolve, reject) => {
        source.addEventListener('error', reject, { once: true, passive: true });
        source.addEventListener('open', resolve, { once: true, passive: true });
    });

    // Receive only the first message
    const first = await new Promise((resolve, reject) => {
        source.addEventListener('error', reject, { once: true, passive: true });
        source.addEventListener('message', ({ data }) => resolve(data), { once: true, passive: true });
    });
    assert(typeof first === 'string');
    const init = UserMessageSchema.array().parse(JSON.parse(first));

    // NOTE: From this point forward, we silently consume the errors.
    source.addEventListener('error', console.error.bind(console), { passive: true });
    source.addEventListener('message', ({ data }) => {
        assert(typeof data === 'string');
        const json = JSON.parse(data);
        callback(UserMessageSchema.parse(json));
    }, { passive: true });

    return init;
}
