// Temporarily hard code Option.value to type string or number until generic props are supported within svelte.
// https://github.com/sveltejs/language-tools/pull/2020
// https://github.com/dummdidumm/rfcs/blob/ts-typedefs-within-svelte-components/text/ts-typing-props-slots-events.md#generics
export type Option = string | number;
