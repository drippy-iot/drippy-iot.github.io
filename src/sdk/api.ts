import { StatusCodes } from 'http-status-codes';

import { InvalidSession, UnexpectedStatusCode } from './error.ts';

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
