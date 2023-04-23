<script lang="ts">
  import Selector from "@components/Selector/Selector.svelte";
  import { fly } from "svelte/transition";

  export let open = false;
</script>

<div class="sidebar {open ? 'opened' : ''}">
  <p>sidebar WIPPP</p>

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
