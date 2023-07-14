<script lang="ts">
  import { examStore } from "app/frontend/stores";
  import { fly } from "svelte/transition";

  export let openForm = true;

  let exams = [];
  let credits = 0;
  let average = 0;

  examStore.subscribe(() => {
    exams = $examStore.exams;
    average = 0;
    credits = 0;

    exams.forEach((exam) => {
      if (exam.grade) credits += Number(exam.value);
    });

    exams.forEach((exam) => {
      if (!exam.grade) return;

      const weight = exam.value / credits;

      const weightedGrade = weight * exam.grade;
      average += weightedGrade;
    });
  });
</script>

<div class="examsSide" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Libretto</div>
  <button class="new" on:click={() => (openForm = true)}
    >Aggiungi un esame</button
  >
  <div class="average">
    <div class="subtitle">Media pesata: {average.toFixed(2)}</div>
  </div>
</div>

<style lang="scss">
  @import "./examsSide.scss";
</style>
