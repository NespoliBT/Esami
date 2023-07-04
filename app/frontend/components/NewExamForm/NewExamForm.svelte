<script lang="ts">
  import { examsService } from "app/frontend/services/examsService";
  import { fly } from "svelte/transition";

  /**
   * ! Da aggiungere:
   * * Link eLearning
   * * Altri link?
   * * Argomenti
   * * sync con servizi bicocca per date esami?!!
   */

  export let open;

  let examName = "";

  function submitForm(e) {
    e.preventDefault();
    examsService.set({
      name: examName,
      value: "123123",
    });

    examsService.getAll().then((data) => console.log(data));

    examName = "";
    open = false;
  }
</script>

<div class="newExamForm" in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
  <button class="close" on:click={() => (open = false)}></button>
  <div class="form">
    <div class="title">Nuovo Esame</div>
    <form on:submit={submitForm}>
      <input
        type="text"
        name="titolo"
        placeholder="Nome esame"
        bind:value={examName}
      />

      <input type="submit" value="Aggiungi" />
    </form>
  </div>
</div>

<style lang="scss">
  @import "./newExamForm.scss";
</style>
