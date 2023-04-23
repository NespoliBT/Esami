<script lang="ts">
  import { scraperService } from "app/frontend/services/scraperService";
  import { configStore } from "app/frontend/stores";
  import Lecture from "@components/Lecture/Lecture.svelte";

  let lectureObj: any = {};
  let pastLectures: any = [];
  let futureLectures: any = [];

  export let selectedDate;

  $: {
    // Changes config to use the date selected by the user
    if ($configStore.profile && selectedDate) {
      let newDate = selectedDate.split("-").reverse().join("-");
      configStore.update((state) => {
        new URL($configStore.profile).searchParams.forEach((value, key) => {
          if (key == "date") {
            state.profile = $configStore.profile.replace(value, newDate);
          }
        });
        return state;
      });
    }
  }

  configStore.subscribe(() => {
    if ($configStore.profile == null) return;

    scraperService.getLectures($configStore.profile).then((data) => {
      lectureObj = data;

      pastLectures = [];
      futureLectures = [];

      lectureObj.celle.forEach((lecture: any) => {
        let today = new Date();
        let date = new Date(lecture.data.split("-").reverse().join("/"));

        console.log(date.getDate(), today.getDate());

        if (lecture.nome_insegnamento) {
          if (date < today) {
            pastLectures.push(lecture);
          } else {
            futureLectures.push(lecture);
          }
        }
      });
    });
  });
</script>

<div class="title">Calendario Settimanale</div>

{#if lectureObj.legenda == undefined}
  <div class="calendar">Loading...</div>
{:else}
  <div class="calendar">
    <div class="past">
      {#each pastLectures as lecture, i}
        <Lecture {lecture} {i} />
      {/each}
    </div>
    {#each futureLectures as lecture, i}
      <Lecture {lecture} {i} />
    {/each}
  </div>
{/if}

<style lang="scss">
  @import "./calendar.scss";
</style>
