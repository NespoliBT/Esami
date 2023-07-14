<script lang="ts">
  import Exam from "@components/Exam/Exam.svelte";
  import { examService } from "app/frontend/services/examService";
  import { examStore } from "app/frontend/stores";
  import { fly } from "svelte/transition";

  let exams = [];

  examService.getAll().then((data: []) =>
    examStore.update((state) => {
      exams = data;
      state.exams = data;

      return state;
    })
  );

  examStore.subscribe(() => {
    exams = $examStore.exams;
  });
</script>

<div class="exams" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Esami</div>
  <div class="exams-list">
    {#each exams as exam}
      <Exam {exam} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "./exams.scss";
</style>
