import { asyncReadable } from '@square/svelte-store';
import { getSession } from '../sdk/auth.ts';

export const session = asyncReadable(null, getSession, { reloadable: true });
