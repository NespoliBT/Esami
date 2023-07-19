<script lang="ts">
  import { examService } from "app/frontend/services/examService";
  import { examStore } from "app/frontend/stores";
  import { ipcRenderer } from "electron";
  import { fly } from "svelte/transition";

  /**
   * ! Da aggiungere:
   * * bug nomi file
   * * sync con servizi bicocca per date esami?!!
   */

  export let open;

  export let exam;

  let editing = exam != null;

  let examName = exam?.name || "";
  let credits = exam?.value || "";

  let links = exam?.metas.filter((m) => m.type == "link") || [];
  let todos = exam?.metas.filter((m) => m.type == "todo") || [];
  let documents = exam?.metas.filter((m) => m.type == "document") || [];

  function formatItems(items, type, exam_id) {
    return items.map((item) => {
      return {
        ...item,
        exam_id,
        type,
        name: item.name,
        value: item.value,
      };
    });
  }

  function newItem(e, array) {
    e.preventDefault();

    array = [
      ...array,
      {
        name: "",
        value: "",
      },
    ];

    return array;
  }

  function removeItem(e, i, array) {
    e.preventDefault();

    array.splice(i, 1);
    array = [...array];

    return array;
  }

  function submitForm(e) {
    e.preventDefault();

    examService
      .set({
        name: examName,
        value: credits,
        grade: exam?.grade,
        id: exam?.id,
      })
      .then((data: { id: number }) => {
        const { id } = data;

        links = formatItems(links, "link", id);
        todos = formatItems(todos, "todo", id);
        documents = formatItems(documents, "document", id);

        examService.metaSet([...links, ...todos, ...documents]);
      });

    examService.getAll().then((data: []) => {
      examStore.update((state) => {
        state.exams = data;

        return state;
      });
    });

    examName = "";
    open = false;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      open = false;
    }
  });

  ipcRenderer.on("fileName", (event, file) => {
    const filePath = file.name;
    const fileName = filePath.split("/")[filePath.split("/").length - 1];

    documents[file.i].value = filePath;
    documents[file.i].name = fileName;
  });
</script>

<div class="newExamForm" in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
  <button class="close" on:click={() => (open = false)}></button>
  <div class="form">
    <div class="title">{editing ? "Modifica esame" : "Nuovo esame"}</div>
    <form on:submit|preventDefault={submitForm}>
      <div class="name-cfu">
        <input
          type="text"
          placeholder="Nome"
          bind:value={examName}
          class="name"
          required
        />
        <input
          type="text"
          placeholder="CFU"
          bind:value={credits}
          class="cfu"
          required
        />
      </div>
      <div class="content">
        <div class="links">
          <div class="subtitle">Link esterni</div>
          {#each links as link, i}
            <div class="link" in:fly={{ x: -100 }} out:fly={{ x: -100 }}>
              <button
                class="delete"
                on:click={(e) => {
                  if (e.screenX != 0) links = removeItem(e, i, links);
                }}
              >
                󰆴
              </button>
              <input
                type="text"
                bind:value={link.name}
                placeholder="Titolo link"
                class="linkTitle"
                required
              />
              <input
                type="text"
                bind:value={link.value}
                placeholder="Link"
                class="linkValue"
                required
              />
            </div>
          {/each}
          <button
            class="newButton"
            on:click={(e) => {
              if (e.screenX != 0) links = newItem(e, links);
            }}
          >
            
          </button>
        </div>
        <div class="documents">
          <div class="subtitle">Documenti</div>

          {#each documents as doc, i}
            <div class="document" in:fly={{ x: -100 }} out:fly={{ x: -100 }}>
              <button
                class="delete"
                on:click={(e) => {
                  if (e.screenX != 0) documents = removeItem(e, i, documents);
                }}
              >
                󰆴
              </button>
              <button
                class="editFile"
                on:click|preventDefault={() => {
                  ipcRenderer.send("openFile", i);
                }}
              >
                󰈔
              </button>
              <input
                bind:value={doc.name}
                type="text"
                class="fileName"
                placeholder="Titolo file"
                required
              />
            </div>
          {/each}
          <button
            class="newButton"
            on:click={(e) => (documents = newItem(e, documents))}
          >
            
          </button>
        </div>
        <div class="todo">
          <div class="subtitle">Da fare</div>
          {#each todos as todo, i}
            <div class="todoItem" in:fly={{ x: -100 }} out:fly={{ x: -100 }}>
              <button
                class="delete"
                on:click={(e) => (todos = removeItem(e, i, todos))}>󰆴</button
              >
              <button
                on:click|preventDefault={() =>
                  (todo.value = todo.value == "" ? "check" : "")}
                class={`todoCheck ${todo.value}`}
              />
              <input
                bind:value={todo.name}
                class="todoText"
                placeholder="Da fare"
                required
              />
            </div>
          {/each}
          <button
            class="newButton"
            on:click={(e) => (todos = newItem(e, todos))}
          >
            
          </button>
        </div>
      </div>
      <div class="footer">
        <input type="submit" value={editing ? "Modifica" : "Aggiungi"} />
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  @import "./newExamForm.scss";
</style>
