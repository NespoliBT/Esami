<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<div class="settingsSide" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Informazioni</div>
  <div class="text">
    Esami (WIP) è un progetto Open Source, chiunque può contibuire. <br />
    Se vuoi segnalare un bug, proporre una funzionalità o insultarmi puoi scrivermi
    qui: <br />
    <button class="telegram"> Telegram </button> <br />
    Il codice è accessibile qui: <br />
    <button class="github"> GitHub </button>
  </div>
</div>

<style lang="scss">
  @import "./settingsSide.scss";
</style>
