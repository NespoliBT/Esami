<script lang="ts">
  import { fly, scale } from "svelte/transition";

  export let lecture;
  export let i;

  let today = new Date();
  let date = new Date(lecture.data.split("-").reverse().join("/"));
  let isToday =
    today.getDate() == date.getDate() &&
    today.getMonth() == date.getMonth() &&
    today.getFullYear() == date.getFullYear();
  let isPast = today > date;

  //check if the lecture is this day of the year
</script>

<div
  class="
    lecture
    {isToday ? 'today' : ''}
    {isPast ? 'past' : ''}
  "
  in:scale={{ delay: 100 * i }}
>
  <div class="name">
    {lecture.nome_insegnamento}
  </div>
  <div class="classroom">
    {lecture.codice_aula}
  </div>
  <div class="date">
    <div class="day">
      {lecture.data}
    </div>
    <div class="hour">
      {lecture.orario}
    </div>
  </div>
  {#if isToday}
    <div class="today">Oggi!</div>
  {/if}
</div>

<style lang="scss">
  @import "./lecture.scss";
</style>
