import { StatusCodes } from 'http-status-codes';

import { BadInput, UnexpectedStatusCode } from './error.ts';

export interface Session {
    mac: ArrayBuffer;
    shutdown: boolean;
}

/**
 * Returns the current {@linkcode Session} of the user, if any.
 * Notably, it returns the MAC address of the registered unit
 * as well as its current shutdown flag state.
 */
export async function getSession(): Promise<Session | null> {
    const res = await fetch('/auth/session', { credentials: 'include' });
    const mac = await res.arrayBuffer();
    switch (res.status) {
        case StatusCodes.OK:
            return { mac, shutdown: false };
        case StatusCodes.SERVICE_UNAVAILABLE:
            return { mac, shutdown: true };
        case StatusCodes.UNAUTHORIZED:
            return null;
        default:
            throw new UnexpectedStatusCode(res.status);
    }
}

/**
 * Logs in the provided 6-byte MAC address. Returns `false` if the device with
 * the provided MAC address has not yet been registered into the system. Otherwise,
 * returns `true` and saves the session ID into an HTTP-only cookie.
 */
export async function login(mac: ArrayBuffer): Promise<boolean> {
    const { status } = await fetch('/auth/session', {
        method: 'POST',
        body: mac,
    });
    switch (status) {
        case StatusCodes.CREATED:
            return true;
        case StatusCodes.NOT_FOUND:
            return false;
        case StatusCodes.BAD_REQUEST:
            throw new BadInput();
        default:
            throw new UnexpectedStatusCode(status);
    }
}
