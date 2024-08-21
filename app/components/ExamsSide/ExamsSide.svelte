<script lang="ts">
  import { configStore, examStore } from "app/stores";
  import { fly } from "svelte/transition";

  export let openForm = true;

  let exams = [];
  let credits = 0;
  let average = 0; // ? Forse ?
  let maxCredits = 180;

  examStore.subscribe(() => {
    exams = $examStore.exams;
    average = 0;
    credits = 0;

    exams.forEach((exam) => {
      if (exam.grade && exam.grade >= 18) credits += Number(exam.value);
    });

    exams.forEach((exam) => {
      if (!exam.grade || exam.grade < 18) return;

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
  <div class="pies">
    <div class="average">
      <div class="subtitle">Media</div>
      <div class="progress-container">
        <div class="value">{average.toFixed(2)}</div>
        <svg height="200" width="200">
          <circle cx="100" cy="100" r="80" stroke-width="32" class="outer" />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke-width="16"
            class="inner"
            style={`stroke-dashoffset: ${
              6.28 * 80 - (average / 30) * 6.28 * 80
            }px`}
          />
        </svg>
      </div>
    </div>
    <div class="credits">
      <div class="subtitle">CFU</div>
      <div class="progress-container">
        <div class="value">{credits}</div>
        <svg height="200" width="200">
          <circle cx="100" cy="100" r="80" stroke-width="32" class="outer" />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke-width="16"
            class="inner"
            style={`stroke-dashoffset: ${
              6.28 * 80 - (credits / $configStore.maxCFU) * 6.28 * 80
            }px`}
          />
        </svg>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./examsSide.scss";
</style>
