import { Writable, writable } from "svelte/store";

export const configStore: Writable<{
  profile: string;
}> = writable({
  profile: null,
});

export const sectionStore: Writable<{
  section: string;
}> = writable({
  section: "exams",
});
