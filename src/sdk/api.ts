import { StatusCodes } from 'http-status-codes';

import { BadInput, InvalidSession, ServiceUnavailable, UnexpectedStatusCode } from './error.ts';

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

export async function getMetrics(lastModified: Date): Promise<JSON>{
    const res = await fetch('/api/metrics', {
        credentials: 'same-origin',
        headers: {  'Accept': 'application/json',
                    'Last-Modified': lastModified.toString()},
    });

    switch (res.status){
        case StatusCodes.OK:
            return res.json();
        case StatusCodes.SERVICE_UNAVAILABLE:
            throw new ServiceUnavailable();
        case StatusCodes.UNAUTHORIZED:
            throw new InvalidSession();
        case StatusCodes.BAD_REQUEST:
            throw new BadInput();
        default:
            throw new UnexpectedStatusCode(res.status);   
    }
}
