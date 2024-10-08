<script lang="ts">
  import { examService } from "app/services/examService";
  import { scale, fly } from "svelte/transition";
  import NewExamForm from "@components/NewExamForm/NewExamForm.svelte";
  import { examStore } from "app/stores";

  export let exam;

  let fullView = false;

  let deletePopupOpen = false;

  let editing = false;

  let completePopupOpen = false;
  $: completed = exam.grade != null && exam.grade >= 18;

  const links = exam.metas.filter((meta) => {
    return meta.type == "link";
  });

  const documents = exam.metas.filter((meta) => {
    return meta.type == "document";
  });

  const todos = exam.metas.filter((meta) => {
    return meta.type == "todo";
  });

  $: todoCompletion =
    (todos.filter((todo) => todo.value == "check").length / todos.length) * 100;

  function remove() {
    examService.remove(exam.id);
    deletePopupOpen = false;
  }

  function saveGrade(e) {
    const grade = e.target.grade.value;
    exam.grade = grade;

    examService.set(exam);

    examStore.update((state) => {
      state.exams = state.exams.map((ex) => {
        if (ex.id == exam.id) {
          ex.grade = exam.grade;
        }
        return ex;
      });

      return state;
    });

    completePopupOpen = false;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      fullView = false;
      deletePopupOpen = false;
      completePopupOpen = false;
    }
  });
</script>

<button
  class={`exam ${completed ? "completed" : ""}`}
  in:scale
  out:scale
  on:click={(e) => (fullView = true)}
>
  <div class="title">{exam.name}</div>
  <div class="tools">
    <button
      class="delete"
      on:click|stopPropagation={() => (deletePopupOpen = true)}>Elimina</button
    >
    <button
      class="clear"
      on:click|stopPropagation={() => (completePopupOpen = true)}
      >Completa</button
    >
    {#if exam.grade != 0 && exam.grade != null}
      <div class="grade">Voto: {exam.grade}</div>
    {/if}
  </div>
</button>

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

{#if completePopupOpen}
  <div class="completePopup-container" in:scale out:scale>
    <div class="completePopup">
      <form on:submit|preventDefault={saveGrade}>
        <div class="title">
          Voto <span>{exam.name}</span>
        </div>
        <input
          type="number"
          required
          class="grade"
          name="grade"
          placeholder="voto"
          value={exam.grade || ""}
        />
        <input class="complete" type="submit" value="Salva" />
        <button
          class="close"
          on:click|preventDefault={(e) => {
            console.log(e);

            if (e.screenX != 0) completePopupOpen = false;
          }}>Chiudi</button
        >
      </form>
    </div>
  </div>
{/if}

{#if fullView}
  <div class="fullView-container" in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
    <div class="fullView">
      <button class="close" on:click={() => (fullView = false)}></button>

      <div class="header">
        <div class="title">{exam.name} <span>[{exam.value} CFU]</span></div>
        <button
          class="edit"
          on:click={() => {
            editing = true;
            fullView = false;
          }}>Modifica</button
        >
      </div>

      <div class="content">
        {#if links.length > 0}
          <div class="links">
            <div class="subtitle">Link esterni</div>
            {#each links as link}
              <button class="link">{link.name}</button>
            {/each}
          </div>
        {/if}
        {#if documents.length > 0}
          <div class="documents">
            <div class="subtitle">Documenti</div>
            {#each documents as document}
              <button class="document">
                {document.name}
              </button>
            {/each}
          </div>
        {/if}
        {#if todos.length > 0}
          <div class="todos">
            <div class="subtitle">Da fare</div>
            {#each todos as todo}
              <div class="todo">
                <button
                  on:click|preventDefault={() => {
                    todo.value = todo.value == "" ? "check" : "";
                    examService.metaSet(todos);
                  }}
                  class={`todoCheck ${todo.value}`}
                />
                <div class="name">
                  {todo.name}
                </div>
              </div>
            {/each}
            <div class="completionRange">
              <div
                class={`slider ${todoCompletion == 100 ? "done" : ""}`}
                style={`width: ${todoCompletion}%;`}
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

{#if editing}
  <NewExamForm {exam} bind:open={editing} />
{/if}

<style lang="scss">
  @import "./exam.scss";
</style>
