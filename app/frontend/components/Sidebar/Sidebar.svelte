<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";
  import ExamsSide from "@components/ExamsSide/ExamsSide.svelte";
  import NewExamForm from "@components/NewExamForm/NewExamForm.svelte";
  import { sectionStore } from "app/frontend/stores";
  import Settings from "@components/Settings/Settings.svelte";
  import { fly } from "svelte/transition";
  import CalendarPicker from "@components/CalendarPicker/CalendarPicker.svelte";
  import SettingsSide from "@components/SettingsSide/SettingsSide.svelte";

  export let open = false;
  export let selectedDate;

  let newExamFormOpen = false;
  let section = $sectionStore.section;

  sectionStore.subscribe(() => {
    section = $sectionStore.section;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key == "Tab" && e.shiftKey) {
      open = !open;
    }
  });
</script>

<div class="sidebar {open ? 'opened' : ''}">
  {#if section == "calendar"}
    <div class="date-selection" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
      <div class="title">Settimana</div>
      <CalendarPicker />
    </div>
  {:else if section == "exams"}
    <ExamsSide bind:openForm={newExamFormOpen} />
  {:else if section == "settings"}
    <SettingsSide />
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
    󰍜
  </button>
</div>

{#if newExamFormOpen}
  <NewExamForm bind:open={newExamFormOpen} />
{/if}

<style lang="scss">
  @import "./sidebar.scss";
</style>
