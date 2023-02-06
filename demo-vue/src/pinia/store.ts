import { defineStore } from "pinia";
import { computed, reactive } from "vue";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const filterTypes = ["all", "completed", "outstanding"] as const

interface TodosState {
  todos: Todo[];
  filter: typeof filterTypes[number];
  nextId: 0;
}

export const useTodos = defineStore("todos", () => {
  const state = reactive<TodosState>({
    todos: [],
    filter: "all",
    nextId: 0,
  });

  const completedTodos = computed(() => {
    return state.todos.filter((todo) => todo.completed);
  });

  const incompleteTodos = computed(() => {
    return state.todos.filter((todo) => !todo.completed);
  });

  const filteredTodos = computed(() => {
    if (state.filter === "completed") {
      return completedTodos.value;
    } else if (state.filter === "outstanding") {
      return incompleteTodos.value;
    }
    return state.todos;
  });

  function addTodo(text: string) {
    state.todos.push({ text, id: state.nextId++, completed: false });
  }

  return {
    state,
    filteredTodos,
    completedTodos,
    incompleteTodos,
    addTodo,
  };
});
