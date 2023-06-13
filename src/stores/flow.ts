import { writable } from 'svelte/store';
import { Flow } from '../models/user';

export const newFlow = writable<Flow[]>([]);

newFlow.subscribe(console.log);
