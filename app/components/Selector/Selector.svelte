<script lang="ts">
  import { sectionStore } from "app/stores";
  import { onMount } from "svelte";

  let bubbleLeft = 20;

  const menu = [
    {
      icon: "",
      section: "exams",
    },
    {
      icon: "",
      section: "calendar",
    },
    {
      icon: "",
      section: "settings",
    },
  ];

  function changeSection(i: number, section: string) {
    const barWidth = document.querySelector(".selector").clientWidth;
    const iconWidth = document.querySelector(".icon").clientWidth;
    const bubbleWidth = document.querySelector(".bubble").clientWidth;

    bubbleLeft =
      ((barWidth - 3 * iconWidth) / 3 + iconWidth) * i +
      (barWidth - 3 * iconWidth) / 6 -
      (bubbleWidth - iconWidth) / 2;

    sectionStore.update((state) => {
      state.section = section;

      return state;
    });
  }

  onMount(() => {
    const barWidth = document.querySelector(".selector").clientWidth;
    const iconWidth = document.querySelector(".icon").clientWidth;
    const bubbleWidth = document.querySelector(".bubble").clientWidth;

    bubbleLeft = (barWidth - 3 * iconWidth) / 6 - (bubbleWidth - iconWidth) / 2;
  });
</script>

<div class="selector">
  <div class="bubble" style={`left: ${bubbleLeft}px`} />
  {#each menu as item, i}
    <button
      class={`icon ${$sectionStore.section == item.section ? "active" : ""}`}
      on:click={() => changeSection(i, item.section)}
      >{item.icon}
    </button>
  {/each}
</div>

<style lang="scss">
  @import "./selector.scss";
</style>
