<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";

  export let open = false;
  export let selectedDate;

  let section = "calendar";

  document.addEventListener("keydown", function (e) {
    if (e.key == "Tab") {
      open = !open;
    }
  });
</script>

<div class="sidebar {open ? 'opened' : ''}">
  {#if section == "calendar"}
    <div class="date-selection">
      <div class="title">Seleziona una data</div>
      <input type="date" bind:value={selectedDate} />
    </div>
  {:else if section == "exams"}
    esami
  {:else if section == "settings"}
    settings
  {/if}
  <Selector />
</div>

<div class="open {open ? 'opened' : ''}">
  <button
    class="icon"
    on:click={() => {
      open = !open;
    }}
  >
    
  </button>
</div>

<style lang="scss">
  @import "./sidebar.scss";
</style>
