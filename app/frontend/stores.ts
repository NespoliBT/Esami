import { Writable, writable } from "svelte/store";

export const configStore: Writable<{
  gitlab: string;
}> = writable({
  gitlab: "",
});
