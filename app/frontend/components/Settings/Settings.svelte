<script lang="ts">
  import Dropdown from "@components/Dropdown/Dropdown.svelte";
  import { bridgeService } from "app/frontend/services/bridgeService";
  import { configService } from "app/frontend/services/configService";
  import { configStore } from "app/frontend/stores";
  import { ipcRenderer } from "electron";
  import { fly } from "svelte/transition";

  let themes = [
    { name: "Scuro", value: "dark" },
    { name: "Chiaro", value: "light" },
    { name: "RGB", value: "rgb" },
  ];

  let theme = themes[0];

  configService.get("theme").then((t: string) => {
    theme = JSON.parse(t);
  });

  function changeTheme() {
    configService.set([["theme", JSON.stringify(theme)]]);

    document.querySelector("html")?.setAttribute("data-theme", theme.value);
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
  <Dropdown list={themes} bind:current={theme} change={changeTheme} />

  <div class="subtitle">CFU Massimi</div>
  <input
    type="number"
    name="cfu"
    value={$configStore.maxCFU}
    on:input={(e) => configService.set([["maxCFU", e.currentTarget.value]])}
  />
</div>

<style lang="scss">
  @import "./settings.scss";
</style>
