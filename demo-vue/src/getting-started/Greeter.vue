<script lang="ts" setup>
const props = defineProps<{
  name?: string;
}>();
</script>

<template>
  <h1>Hello, {{ props.name ?? "World" }}</h1>
</template>