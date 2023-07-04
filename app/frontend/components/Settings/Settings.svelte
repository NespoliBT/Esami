<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<div class="settings" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>settings</div>

<style lang="scss">
  @import "./settings.scss";
</style>
