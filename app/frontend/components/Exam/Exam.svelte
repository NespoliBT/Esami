<script lang="ts">
  import { examsService } from "app/frontend/services/examsService";
  import { scale } from "svelte/transition";

  export let exam;

  let deletePopupOpen = false;
  let deleted = false;

  function openDeletePopup() {
    deletePopupOpen = true;
  }

  function remove() {
    examsService.remove(exam.id);
    deleted = true;
    deletePopupOpen = false;
  }
</script>

{#if !deleted}
  <div class="exam" in:scale out:scale>
    <div class="title">{exam.name}</div>
    <div class="tools">
      <button class="delete" on:click={openDeletePopup}>Elimina</button>
      <button class="clear">Completa</button>
    </div>
  </div>
{/if}

{#if deletePopupOpen}
  <div class="deletePopup-container" in:scale out:scale>
    <div class="deletePopup">
      <div class="title">
        Vuoi veramente eliminare <span>{exam.name}</span>?
      </div>
      <button class="delete" on:click={remove}>Elimina</button>
      <button class="keep" on:click={() => (deletePopupOpen = false)}
        >Mantieni</button
      >
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./exam.scss";
</style>
