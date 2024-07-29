<template>
  <Line :data="props.chartData" :options="props.options" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import "chartjs-adapter-date-fns";
import type {
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const props = defineProps<{
  chartData: ChartJSData<"line">;
  options?: ChartJSOptions<"line">;
}>();
</script>
