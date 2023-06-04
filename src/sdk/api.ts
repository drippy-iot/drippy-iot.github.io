import { StatusCodes } from 'http-status-codes';

import { assert } from '../assert.ts';
import { InvalidSession, UnexpectedStatusCode } from './error.ts';
import { type UserMessage, UserMessageSchema } from '../models/user.ts';

/** The previous state of the database. */
export const enum State {
    /** No pending commands. */
    None,
    /** Issued command is the same as the pending one. */
    Same,
    /** Issued command nullifies the pending one. */
    Different,
}

/**
 * Assuming that the user has already logged in (i.e., there exists a valid session ID
 * in the cookie store), this endpoint sends a request to the Cloud to reset or manually
 * bypass a locked unit (i.e., "closed valve").
 */
export async function requestReset(): Promise<State> {
    const { status } = await fetch('/api/reset', {
        method: 'POST',
        credentials: 'include',
    });
    switch (status) {
        case StatusCodes.CREATED:
            return State.None;
        case StatusCodes.NO_CONTENT:
            return State.Same;
        case StatusCodes.RESET_CONTENT:
            return State.Different;
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
export async function requestShutdown(): Promise<State> {
    const { status } = await fetch('/api/shutdown', {
        method: 'POST',
        credentials: 'include',
    });
    switch (status) {
        case StatusCodes.CREATED:
            return State.None;
        case StatusCodes.NO_CONTENT:
            return State.Same;
        case StatusCodes.RESET_CONTENT:
            return State.Different;
        case StatusCodes.UNAUTHORIZED:
            throw new InvalidSession();
        default:
            throw new UnexpectedStatusCode(status);
    }
}

export type MetricsCallback = (message: UserMessage) => void;

export interface MetricsListener {
    /** An array of all data points to be used as an initial reference point. */
    init: UserMessage[];
    /** Manually closes the underlying {@linkcode EventSource}. */
    close(): void;
}

export async function getMetrics(
    since: Date,
    callback: MetricsCallback
): Promise<MetricsListener> {
    const source = new EventSource(`/api/metrics?start=${since.valueOf()}`, {
        withCredentials: true,
    });

    // Attempt to connect to the server
    await new Promise((resolve, reject) => {
        source.addEventListener('error', reject, { once: true, passive: true });
        source.addEventListener('open', resolve, { once: true, passive: true });
    });

    // Receive only the first message
    const first = await new Promise((resolve, reject) => {
        source.addEventListener('error', reject, { once: true, passive: true });
        source.addEventListener('message', ({ data }) => resolve(data), {
            once: true,
            passive: true,
        });
    });
    assert(typeof first === 'string');
    const init = UserMessageSchema.array().parse(JSON.parse(first));

    // NOTE: From this point forward, we silently consume the errors.
    source.addEventListener('error', console.error.bind(console), {
        passive: true,
    });
    source.addEventListener(
        'message',
        ({ data }) => {
            assert(typeof data === 'string');
            const json = JSON.parse(data);
            callback(UserMessageSchema.parse(json));
        },
        { passive: true }
    );

    return { init, close: source.close.bind(source) };
}
