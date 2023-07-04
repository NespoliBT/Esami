<script lang="ts">
  import { fly } from "svelte/transition";

  export let openForm = true;
</script>

<div class="examsSide" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Libretto</div>
  <button class="new" on:click={() => (openForm = true)}
    >Aggiungi un esame</button
  >
  <div class="suggestions">
    # Suggestions <br />
    // Da implementare
  </div>
</div>

<style lang="scss">
  @import "./examsSide.scss";
</style>
