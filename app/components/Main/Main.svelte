<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";
  import Calendar from "@components/Calendar/Calendar.svelte";
  import Sidebar from "@components/Sidebar/Sidebar.svelte";
  import { sectionStore } from "app/stores";
  import Exams from "@components/Exams/Exams.svelte";
  import Settings from "@components/Settings/Settings.svelte";

  let sidebarStatus = false;

  let selectedDate: Date;
</script>

<div class="main">
  <Sidebar bind:open={sidebarStatus} bind:selectedDate />
  <div class="right-container {sidebarStatus ? 'small' : ''}">
    <div class="right">
      {#if $sectionStore.section == "exams"}
        <Exams />
      {:else if $sectionStore.section == "calendar"}
        <Calendar {selectedDate} />
      {:else if $sectionStore.section == "settings"}
        <Settings />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "./main.scss";
</style>
