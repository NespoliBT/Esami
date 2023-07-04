<script lang="ts">
  import { sectionStore } from "app/frontend/stores";

  function changeSection(section: string) {
    sectionStore.update((state) => {
      state.section = section;

      return state;
    });
  }
</script>

<div class="selector">
  <button class="icon" on:click={() => changeSection("exams")}></button>
  <button class="icon" on:click={() => changeSection("calendar")}></button>
  <button class="icon" on:click={() => changeSection("settings")}></button>
</div>

<style lang="scss">
  @import "./selector.scss";
</style>
