<script lang="ts">
  import { bridgeService } from "app/frontend/services/bridgeService";
  import { configService } from "app/frontend/services/configService";
  import { configStore } from "app/frontend/stores";
  import { ipcRenderer } from "electron";
  import { fly } from "svelte/transition";

  let theme = "dark";

  let themes = ["dark", "light", "rgb"];

  function changeTheme() {
    theme = themes[(themes.indexOf(theme) + 1) % themes.length];

    configStore.update((state) => {
      state.theme = theme;

      return state;
    });

    configService.set([["theme", theme]]);

    document.querySelector("html")?.setAttribute("data-theme", theme);
  }

  ipcRenderer.on("urlinfo", (e, url) => {
    configService.set([["profile", url]]);
  });
</script>

<div class="settings" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Pannello di controllo</div>

  <div class="subtitle">Profilo</div>
  <button class="switchProfile" on:click={() => bridgeService.message("setup")}
    >Cambia profilo</button
  >

  <div class="subtitle">Tema</div>
  <button class="switchTheme" on:click={changeTheme}>Cambia tema</button>
</div>

<style lang="scss">
  @import "./settings.scss";
</style>
