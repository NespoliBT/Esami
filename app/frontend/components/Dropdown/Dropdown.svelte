<script lang="ts">
  import { fly } from "svelte/transition";

  export let list: { name: string; value: string }[] = null;
  export let current = null;
  export let change = () => {};

  let currentIndex = 0;
  let open = false;

  function changeCurrent(i: number) {
    current = list[i];
    currentIndex = i;
    open = false;
    change();
  }

  $: currentIndex = list.findIndex(
    (item) => item.name === current.name && item.value === current.value
  );
</script>

<div class="dropdown">
  <div class="themeSelector-container">
    <button class="openDropdown" on:click={() => (open = !open)}>
      {current.name}
    </button>
    {#if open}
      <div class="dropdown" in:fly={{ y: -50 }} out:fly={{ y: -50 }}>
        {#each list as l, i}
          <button
            class={`item ${currentIndex == i ? "selected" : ""}`}
            on:click={() => changeCurrent(i)}
          >
            {l.name}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "./dropdown.scss";
</style>
