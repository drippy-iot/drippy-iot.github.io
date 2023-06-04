import { StatusCodes } from 'http-status-codes';

import { assert } from '../assert.ts';
import { BadInput, UnexpectedStatusCode } from './error.ts';
import { Command } from '../models/command.ts';

export interface Session {
    mac: ArrayBuffer;
    request: Command;
}

/**
 * Returns the current {@linkcode Session} of the user, if any.
 * Notably, it returns the MAC address of the registered unit
 * as well as its current shutdown flag state.
 */
export async function getSession(): Promise<Session | null> {
    const res = await fetch('/auth/session', { credentials: 'include' });
    const mac = await res.arrayBuffer();
    assert(mac.byteLength === 6);
    switch (res.status) {
        case StatusCodes.OK:
            return { mac, request: Command.None };
        case StatusCodes.ACCEPTED:
            return { mac, request: Command.Open };
        case StatusCodes.NO_CONTENT:
            return { mac, request: Command.Close };
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
