<script>
  import { configService } from "../services/configService";
  import { scraperService } from "../services/scraperService";
  import { configStore } from "../stores";
  import Updater from "@components/Updater/Updater.svelte";
  import { ipcRenderer } from "electron";

  import axios from "axios";
  axios.defaults.baseURL = "http://localhost:41968";

  // ! Inizio schifo

  ipcRenderer.on("urlinfo", (e, msg) => {
    scraperService.scrape(msg);
  });


  // ! Fine schifo

  configService.get("gitlab").then((config) => {
    configStore.update((state) => {
      state.gitlab = config;

      return state;
    });
  });
</script>

<div class="content">
  asd3
  <Updater />
</div>

<style lang="scss">
  @import "../scss/index.scss";
</style>
