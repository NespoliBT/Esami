<script lang="ts">
  import Dropdown from "@components/Dropdown/Dropdown.svelte";
  import { configService } from "app/services/configService";
  import { configStore } from "app/stores";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let pickerOpen = false;
  let pickerID = 0;

  let themes = [
    { name: "Scuro", value: "dark" },
    { name: "Chiaro", value: "light" },
    { name: "RGB", value: "rgb" },
    { name: "Manuale", value: "custom" },
  ];

  let theme = themes[0];

  let customColors = [
    "#1b2128",
    "#212931",
    "#dd83a0",
    "#63aec0",
    "#e25987",
    "#85ba86",
    "#b877b4",
    "#fec262",
    "#e5e5e5",
  ];

  configService.get("theme").then((t: string) => {
    theme = JSON.parse(t);
  });

  function setColor(color: number, value: string) {
    document.querySelector("html").style.setProperty(`--color_${color}`, value);
  }

  function openPicker(color: number) {
    pickerOpen = true;
    pickerID = color;
  }

  function changeTheme() {
    configService.set([["theme", JSON.stringify(theme)]]);

    document.querySelector("html")?.setAttribute("data-theme", theme.value);
  }
</script>

<div class="settings" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Pannello di controllo</div>

  <div class="subtitle">Profilo</div>
  <button class="switchProfile">Cambia profilo</button>

  <div class="subtitle">Tema</div>
  <Dropdown list={themes} bind:current={theme} change={changeTheme} />

  {#if theme.value == "custom"}
    <div class="colors">
      {#each customColors as _, i}
        <button class="color" on:click={() => openPicker(i)} />
      {/each}
    </div>
    {#if pickerOpen}
      <div class="colorPicker-container">
        <div class="colorPicker" />
      </div>
    {/if}
  {/if}

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
