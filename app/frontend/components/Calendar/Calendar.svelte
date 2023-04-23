<script lang="ts">
  import { scraperService } from "app/frontend/services/scraperService";
  import { configStore } from "app/frontend/stores";
  import Lecture from "@components/Lecture/Lecture.svelte";

  let lectureObj: any = {};
  let pastLectures: any = [];
  let futureLectures: any = [];

  configStore.subscribe(() => {
    if ($configStore.profile == null) return;

    console.log($configStore.profile);

    scraperService.getLectures($configStore.profile).then((data) => {
      lectureObj = data;
      lectureObj.celle.forEach((lecture: any) => {
        let today = new Date();
        let date = new Date(lecture.data.split("-").reverse().join("/"));

        if (lecture.nome_insegnamento) {
          if (date.getDate() < today.getDate()) {
            pastLectures.push(lecture);
          } else {
            futureLectures.push(lecture);
          }
        }
      });
    });
  });
</script>

<div class="title">Calendario</div>

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
