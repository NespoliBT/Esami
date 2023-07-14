import { Writable, writable } from "svelte/store";

export const configStore: Writable<{
  profile: string;
  theme: string;
}> = writable({
  profile: null,
  theme: "dark",
});

export const sectionStore: Writable<{
  section: string;
}> = writable({
  section: "exams",
});

export const examStore: Writable<{
  exams: Array<any>;
}> = writable({
  exams: [],
});
