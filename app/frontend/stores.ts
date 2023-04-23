import { Writable, writable } from "svelte/store";

export const configStore: Writable<{
  profile: string;
}> = writable({
  profile: null,
});
