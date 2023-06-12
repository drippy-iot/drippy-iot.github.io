import { SvelteComponent } from 'svelte';

export interface ChildType {
    icon: typeof SvelteComponent;
    action: (event: MouseEvent) => void;
}
