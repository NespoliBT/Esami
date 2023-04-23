<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";
  import Calendar from "@components/Calendar/Calendar.svelte";
  import Sidebar from "@components/Sidebar/Sidebar.svelte";

  let sidebarStatus = false;

  let selectedDate: Date;
</script>

<div class="main">
  <Sidebar bind:open={sidebarStatus} bind:selectedDate />
  <div class="right-container {sidebarStatus ? 'small' : ''}">
    <div class="right">
      <Calendar {selectedDate} />
    </div>
  </div>
</div>

<style lang="scss">
  @import "./main.scss";
</style>
