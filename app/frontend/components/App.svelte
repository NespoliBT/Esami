<script lang="ts">
  import { configService } from "app/frontend/services/configService";
  import { configStore } from "../stores";
  import Updater from "@components/Updater/Updater.svelte";
  import Welcome from "@components/Welcome/Welcome.svelte";
  import Main from "@components/Main/Main.svelte";
  import axios from "axios";
  import { onMount } from "svelte";

  axios.defaults.baseURL = "http://localhost:41968";

  let loading = true;

  configService.get("profile").then((profile) => {
    loading = false;

    configStore.update((state) => {
      state.profile = profile;

      // Changes config to use today's date
      if ($configStore.profile) {
        new URL($configStore.profile).searchParams.forEach((value, key) => {
          if (key == "date") {
            state.profile = $configStore.profile.replace(
              value,
              new Date().toLocaleDateString("it-IT")
            );
          }
        });
      }

      return state;
    });
  });

  onMount(() => {
    configService.get("theme").then((data: string) => {
      configStore.update((state) => {
        state.theme = data;

        return state;
      });
      document.querySelector("html")?.setAttribute("data-theme", data);
    });
  });
</script>

<div class="content">
  {#if $configStore.profile == null && loading == false}
    <Welcome />
  {:else}
    <Main />
  {/if}
  <Updater />
</div>

<style lang="scss">
  @import "../scss/index.scss";
</style>
