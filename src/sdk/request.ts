import { StatusCodes } from 'http-status-codes';

import { BASE } from './base.ts';
import { InvalidSession, UnexpectedStatusCode } from './error.ts';

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
    const { status } = await fetch(BASE + '/api/reset', {
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
    const { status } = await fetch(BASE + '/api/shutdown', {
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
