<script lang="ts">
  import { examService } from "app/frontend/services/examService";
  import { fly } from "svelte/transition";

  /**
   * ! Da aggiungere:
   * * Link eLearning
   * * Altri link?
   * * Argomenti
   * * sync con servizi bicocca per date esami?!!
   */

  export let open;

  let examName = "";
  let credits = "";

  let links = [];
  let todos = [];
  let documents = [];

  function formatItems(items, type) {
    return items.map((item) => {
      return {
        ...item,
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
      })
      .then((data: { id: number }) => {
        const { id } = data;

        links = formatItems(links, "link");

        todos = todos.map((t) => {
          return {
            name: t.name,
            value: t.value ? true : false,
            exam_id: id,
            type: "todo",
          };
        });

        console.log(links, todos);

        examService.metaSet([...links, ...todos]);
      });

    examService.getAll().then((data) => console.log(data));

    examName = "";
    open = false;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      open = false;
    }
  });
</script>

<div class="newExamForm" in:fly={{ y: -100 }} out:fly={{ y: -100 }}>
  <button class="close" on:click={() => (open = false)}></button>
  <div class="form">
    <div class="title">Nuovo Esame</div>
    <form on:submit|preventDefault={submitForm}>
      <div class="content">
        <div class="left">
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
                  Elimina
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
              class="newLink"
              on:click={(e) => {
                if (e.screenX != 0) links = newItem(e, links);
              }}
            >
              
            </button>
          </div>
        </div>
        <div class="right">
          <div class="documents">
            <div class="subtitle">Documenti</div>

            <button
              class="newDocument"
              on:click={(e) => (documents = newItem(e, documents))}
            >
              
            </button>
          </div>
          <div class="todo">
            <div class="subtitle">Da fare</div>
            {#each todos as todo, i}
              <div class="todoItem">
                <button
                  class="delete"
                  on:click={(e) => (todos = removeItem(e, i, todos))}
                  >Elimina</button
                >
                <button
                  on:click|preventDefault={() => (todo.value = !todo.value)}
                  class={`todoCheck ${todo.value ? "check" : ""}`}
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
              class="newTodo"
              on:click={(e) => (todos = newItem(e, todos))}
            >
              
            </button>
          </div>
        </div>
      </div>
      <div class="footer">
        <input type="submit" value="Aggiungi" />
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  @import "./newExamForm.scss";
</style>
