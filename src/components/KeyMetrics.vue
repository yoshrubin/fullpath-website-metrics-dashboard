<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-xl">
    <div
      class="text-center border-2 border-gray-200 rounded-lg p-4"
      v-for="metric in props.metrics"
      :key="metric.title"
    >
      <h3 class="text-lg font-semibold">{{ metric.title }}</h3>
      <p class="text-xl">{{ metric.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Metric } from "../types";

const props = defineProps<{
  metrics: Metric[];
}>();
</script>
