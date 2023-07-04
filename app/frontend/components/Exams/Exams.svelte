<script lang="ts">
  import Exam from "@components/Exam/Exam.svelte";
  import { examsService } from "app/frontend/services/examsService";
  import { fly } from "svelte/transition";

  let exams = [];

  examsService.getAll().then((data: []) => (exams = data));
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
