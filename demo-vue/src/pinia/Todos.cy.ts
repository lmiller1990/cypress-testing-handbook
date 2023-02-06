import Todos from "./Todos.vue";
import { useTodos } from "./store";

describe("Todos", () => {
  beforeEach(() => {
    const todosStore = useTodos();

    todosStore.addTodo("👨‍💻 Write code");
    todosStore.addTodo("🕵️ Add some tests");
    todosStore.addTodo("📄 Don't forget documentation!");
    todosStore.addTodo("🚢 Ship!");
  });

  it.only("renders a list of todos", () => {
    cy.mountWithPinia(Todos);

    const todosStore = useTodos();
    expect(todosStore.state.filter).to.eql("all");
    expect(todosStore.filteredTodos).to.have.length(4);

    for (const todo of todosStore.filteredTodos) {
      cy.get("label").contains(todo.text);
    }
  });

  it("completes todos", () => {
    cy.mountWithPinia(Todos);

    const todosStore = useTodos();
    expect(todosStore.state.filter).to.eql("all");
    expect(todosStore.filteredTodos).to.have.length(4);

    cy.get("label")
      .contains("Write code")
      .click()
      .then(() => {
        expect(todosStore.completedTodos).to.have.length(1);
        expect(todosStore.completedTodos[0].text).to.contain("Write code");
      });
  });

  it("filters todos", () => {
    cy.mountWithPinia(Todos);

    cy.get("label")
      .contains("Write code")
      .click()
      .get('[data-cy="todo"]')
      .should("have.length", 4);

    cy.get("label")
      .contains("completed")
      .click()
      .get('[data-cy="todo"]')
      .should("have.length", 1);

    cy.get("label")
      .contains("outstanding")
      .click()
      .get('[data-cy="todo"]')
      .should("have.length", 3);
  });
});
