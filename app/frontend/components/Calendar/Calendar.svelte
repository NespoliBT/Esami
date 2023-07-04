<script lang="ts">
  import { scraperService } from "app/frontend/services/scraperService";
  import { configStore } from "app/frontend/stores";
  import Lecture from "@components/Lecture/Lecture.svelte";
  import CalendarPicker from "@components/CalendarPicker/CalendarPicker.svelte";
  import { fly } from "svelte/transition";

  let lectureObj: any = {};
  let pastLectures: any = [];
  let futureLectures: any = [];

  let loading = false;

  export let selectedDate;

  $: {
    // Changes config to use the date selected by the user

    if ($configStore.profile && selectedDate) {
      let newDate = selectedDate.split("-").reverse().join("-");
      configStore.update((state) => {
        console.log($configStore.profile, selectedDate);
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

    loading = true;

    scraperService.getLectures($configStore.profile).then((data) => {
      lectureObj = data;

      loading = false;

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

<div class="container" in:fly={{ x: -200 }} out:fly={{ x: 200 }}>
  <div class="title">Calendario Settimanale</div>

  {#if lectureObj.legenda == undefined || loading}
    <div class="calendar">
      <div class="loading" />
    </div>
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

      {#if lectureObj.celle.length == 0}
        <div class="error">Non ci sono lezioni questa settimana!</div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "./calendar.scss";
</style>
