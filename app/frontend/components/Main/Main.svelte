<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";
  import Calendar from "@components/Calendar/Calendar.svelte";
  import Sidebar from "@components/Sidebar/Sidebar.svelte";

  let sidebarStatus = false;
</script>

<div class="main">
  <Sidebar bind:open={sidebarStatus} />
  <div class="right-container {sidebarStatus ? 'small' : ''}">
    <div class="right">
      <Calendar />
    </div>
  </div>
</div>

<style lang="scss">
  @import "./main.scss";
</style>
