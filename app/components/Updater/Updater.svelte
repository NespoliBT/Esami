<script lang="ts">
  import { fly } from "svelte/transition";

  let popupShow: boolean;
  let popupInfo: string;
  let downloading: boolean;
  let progress = 0;
</script>

{#if popupShow}
  <div class="updater" in:fly={{ x: 200 }} out:fly={{ x: 200 }}>
    <div class="info">{popupInfo ? popupInfo : ""}</div>
    {#if downloading}
      <input
        class="loading"
        type="range"
        min="0"
        max="100"
        disabled
        value={progress}
      />
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "./updater.scss";
</style>
