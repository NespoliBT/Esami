<script lang="ts">
  import { fly } from "svelte/transition";
  import { configStore } from "app/frontend/stores";

  const now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  let selectedDay = null;

  let monthDropdownOpen = false;

  let nOfDays;
  let daysOffset;

  const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  function getNumberOfDays(month, year) {
    // Array containing the number of days in each month (in a non-leap year)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check if it's a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Adjust the number of days in February for a leap year
    if (isLeapYear) {
      daysInMonth[1] = 29;
    }
    // Return the number of days for the given month
    return daysInMonth[month - 1];
  }

  $: month, year && updateCalendar();

  $: selectedWeek = Math.floor((selectedDay + daysOffset) / 7);

  $: day, month, year && searchWeek();

  function searchWeek() {
    if (
      day > nOfDays ||
      day < 1 ||
      month > 12 ||
      month < 1 ||
      year < 1 ||
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year)
    ) {
      return;
    }

    let selectedDate = `${year}-${month}-${day}`;

    if ($configStore.profile && selectedDate) {
      let newDate = selectedDate.split("-").reverse().join("-");

      configStore.update((state) => {
        const searchParams = new URL($configStore.profile).searchParams;

        searchParams.forEach((value, key) => {
          if (key == "date") {
            state.profile = $configStore.profile.replace(value, newDate);
          }
        });
        return state;
      });
    }
  }

  function updateCalendar() {
    if (
      day > nOfDays ||
      day < 1 ||
      month > 12 ||
      month < 1 ||
      year < 1 ||
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year)
    ) {
      return;
    }

    nOfDays = getNumberOfDays(month, year);
    daysOffset = new Date(year, month - 1, 1).getDay();
  }
</script>

<div class="calendarPicker">
  <div class="date">
    <input
      type="text"
      class="day"
      placeholder="00"
      bind:value={day}
      maxlength="2"
    />/
    <input
      type="text"
      class="month"
      placeholder="00"
      bind:value={month}
      maxlength="2"
    />/
    <input
      type="text"
      class="year"
      placeholder="0000"
      bind:value={year}
      maxlength="4"
    />
  </div>
  <button class="icon"></button>
</div>

<div class="fullView">
  <div class="header">
    <div class="monthYearSelector-container">
      <button
        class={`monthSelector ${monthDropdownOpen ? "open" : ""}`}
        on:click={() => (monthDropdownOpen = !monthDropdownOpen)}
      >
        {months[month - 1] || "Mese"}
      </button>
      {#if monthDropdownOpen}
        <div class="monthDropdown" in:fly={{ y: -50 }} out:fly={{ y: -50 }}>
          {#each months as m, i}
            <button
              class="month"
              on:click={() => {
                month = i + 1;
                monthDropdownOpen = false;
              }}
            >
              {m}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  <div class="calendar">
    <div class="weekdays">
      <div class="weekday">Dom</div>
      <div class="weekday">Lun</div>
      <div class="weekday">Mar</div>
      <div class="weekday">Mer</div>
      <div class="weekday">Gio</div>
      <div class="weekday">Ven</div>
      <div class="weekday">Sab</div>
    </div>
    <div class="weekSelector" style={`top: ${selectedWeek * 75 + 53}px`} />
    <div class="days">
      {#if daysOffset > 0}
        {#each Array(daysOffset) as _}
          <div class="day" />
        {/each}
      {/if}

      <!-- I wrote this while drunk i'm so sorry -->
      {#each Array(nOfDays) as _, i}
        <button
          on:mouseenter={() => (selectedDay = i)}
          on:click={() => {
            day = i + 1;
          }}
          class={`day ${
            i >= nOfDays - ((nOfDays + daysOffset) % 7) ? " last" : ""
          }`}
        >
          {i + 1}
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "./calendarPicker.scss";
</style>
