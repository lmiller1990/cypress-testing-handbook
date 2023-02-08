<script lang="ts" setup>
import { useTodos, filterTypes } from "./store";

const todosStore = useTodos();
</script>

<template>
  <div class="m-4">
    <ul>
      <li v-for="filter of filterTypes" :key="filter">
        <input
          type="radio"
          v-model="todosStore.state.filter"
          :value="filter"
          :id="filter"
          class="mr-2"
        />
        <label :for="filter">
          {{ filter }}
        </label>
      </li>
    </ul>

    <div class="w-full border border-b my-2" />

    <ul>
      <li v-for="todo of todosStore.filteredTodos" :key="todo.id">
        <input
          data-cy="todo"
          type="checkbox"
          v-model="todo.completed"
          :id="`todo-${todo.id}`"
          class="mr-2"
        />
        <label :for="`todo-${todo.id}`">
          {{ todo.text }}
        </label>
      </li>
    </ul>
  </div>
</template>
