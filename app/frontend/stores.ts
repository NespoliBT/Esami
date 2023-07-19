import { Writable, writable } from "svelte/store";

export const configStore: Writable<{
  profile: string;
  theme: string;
  maxCFU: number;
}> = writable({
  profile: null,
  theme: null,
  maxCFU: 180,
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
