<script lang="ts" setup>
import { computed } from 'vue'
import type { Parity } from './numbers.js'
import { getNumbers } from './numbers.js'

const props = defineProps<{
  parity: Parity
}>()

const numbers = computed(() => {
  return getNumbers(props.parity)
})
</script>

<template>
  <ul>
    <li v-for="n of numbers" :key="n">
      {{ n }}
    </li>
  </ul>
</template>
