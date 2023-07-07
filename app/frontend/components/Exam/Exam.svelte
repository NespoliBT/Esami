<script lang="ts">
  import { examService } from "app/frontend/services/examService";
  import { scale, fly } from "svelte/transition";
  import { shell } from "electron";

  export let exam;

  let fullView = false;

  let deletePopupOpen = false;
  let deleted = false;

  const links = exam.metas.filter((meta) => {
    return meta.type == "link";
  });

  function openDeletePopup() {
    deletePopupOpen = true;
  }

  function remove() {
    examService.remove(exam.id);
    deleted = true;
    deletePopupOpen = false;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      fullView = false;
      deletePopupOpen = false;
    }
  });

  console.log(exam);
</script>

{#if !deleted}
  <button
    class="exam"
    in:scale
    out:scale
    on:click|self={() => (fullView = true)}
  >
    <div class="title">{exam.name}</div>
    <div class="tools">
      <button class="delete" on:click={openDeletePopup}>Elimina</button>
      <button class="clear">Completa</button>
    </div>
  </button>
{/if}

{#if deletePopupOpen}
  <div class="deletePopup-container" in:scale out:scale>
    <div class="deletePopup">
      <div class="title">
        Vuoi veramente eliminare <span>{exam.name}</span>?
      </div>
      <button class="delete" on:click={remove}>Elimina</button>
      <button class="keep" on:click={() => (deletePopupOpen = false)}
        >Mantieni</button
      >
    </div>
  </div>
{/if}

{#if fullView}
  <div class="fullView-container" in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
    <div class="fullView">
      <button class="close" on:click={() => (fullView = false)}></button>

      <div class="title">{exam.name}</div>

      {#if links.length > 0}
        <div class="links">
          <div class="subtitle">Link esterni</div>
          {#each links as link}
            <button class="link" on:click={() => shell.openExternal(link.value)}
              >{link.name}</button
            >
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./exam.scss";
</style>
