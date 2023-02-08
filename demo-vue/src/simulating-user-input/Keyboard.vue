<script lang="ts" setup>
import { ref, computed } from "vue";

const username = ref("");
const greeting = computed(() => `Hello, ${username.value}!`);

function submit() {
  window.fetch("/sign_up", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
    }),
  });
}
</script>

<template>
  <div class="m-4 text-xl">
    <p class="my-2">{{ greeting }}</p>
    <form @submit.prevent="submit">
      <input
        v-model="username"
        id="username"
        class="border p-1"
        name="username"
      />
    </form>
  </div>
</template>
