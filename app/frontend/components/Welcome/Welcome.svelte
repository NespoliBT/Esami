<script lang="ts">
  import { configService } from "app/frontend/services/configService";
  import { bridgeService } from "app/frontend/services/bridgeService";
  import { ipcRenderer } from "electron";
  import { fly } from "svelte/transition";

  ipcRenderer.on("urlinfo", (e, url) => {
    configService.set([["profile", url]]);
  });
</script>

<div class="welcome-container" out:fly={{ y: -500, duration: 700 }}>
  <div class="welcome">
    <div class="icon"></div>
    <div class="title">Esami</div>
    <button
      class="start"
      on:click={() => {
        bridgeService.message("setup");
      }}
    >
      Inizia
    </button>
    <div class="note">
      Nella prossima schermata ti verrà chiesto di inserire il tuo percorso di
      studi per generare il tuo profilo.
      <br />
      <br />
      Questo software non è ufficiale e non è in alcun modo legato all'università
      Bicocca.
    </div>
  </div>
</div>

<style lang="scss">
  @import "./welcome.scss";
</style>
