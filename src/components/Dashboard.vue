<template>
  <div class="space-y-8 p-5">
    <h1 class="text-2xl font-bold mb-4 text-center">
      Website Metrics Dashboard
    </h1>
    <div class="mb-4 flex gap-2 mx-auto max-w-lg items-center">
      <DatePicker
        v-model="startDate"
        placeholder="Start Date"
        :enable-time-picker="false"
      />
      <DatePicker
        v-model="endDate"
        placeholder="End Date"
        :enable-time-picker="false"
      />
    </div>
    <KeyMetrics :metrics="keyMetrics" />
    <div class="flex flex-wrap gap-4">
      <div
        v-for="chart in charts"
        :key="chart.title"
        class="w-full md:w-1/2 lg:w-1/3 mx-auto h-80 mt-8"
      >
        <LineChart :chart-data="chart.data" :options="chart.options" />
      </div>
    </div>
    <MetricsTable :table-data="formattedTableData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import KeyMetrics from "./KeyMetrics.vue";
import LineChart from "./LineChart.vue";
import MetricsTable from "./MetricsTable.vue";
import data from "../sample.json";
import { format, parseISO, isBefore, isAfter } from "date-fns";

interface Metric {
  title: string;
  value: number;
}

interface ChartData {
  title: string;
  data: any;
  options: any;
}

interface TableData {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

const rawData = data.data as TableData[];

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

// Compute default start and end dates of the date picker
const defaultStartDate = computed(() => {
  const earliestDate = new Date(
    Math.min(...rawData.map((item) => new Date(item.timestamp).getTime()))
  );
  return earliestDate;
});

const defaultEndDate = computed(() => {
  const latestDate = new Date(
    Math.max(...rawData.map((item) => new Date(item.timestamp).getTime()))
  );
  return latestDate;
});

// Set default values for start and end dates
onMounted(() => {
  startDate.value = defaultStartDate.value;
  endDate.value = defaultEndDate.value;
});

// Filter the data based on the start and end dates
const filteredData = computed(() => {
  if (startDate.value && endDate.value) {
    return rawData.filter((item) => {
      const date = new Date(item.timestamp);
      return isAfter(date, startDate.value) && isBefore(date, endDate.value);
    });
  }
  return rawData;
});

// Format the data for display in the table
const formattedTableData = computed(() => {
  return filteredData.value.map((item) => {
    return {
      timestamp: format(parseISO(item.timestamp), "MMM dd, yyyy"),
      impressions: item.impressions.toLocaleString(),
      clicks: item.clicks.toLocaleString(),
      cost: item.cost.toFixed(2).toLocaleString(),
      conversions: item.conversions.toLocaleString(),
      costPerClick: (item.cost / item.clicks).toFixed(2).toLocaleString(),
      costPerConversion: (item.cost / item.conversions)
        .toFixed(2)
        .toLocaleString(),
    };
  });
});

// Calculate key metrics
const keyMetrics = computed(() => {
  const totalImpressions = filteredData.value.reduce(
    (sum, item) => sum + item.impressions,
    0
  );
  const totalClicks = filteredData.value.reduce(
    (sum, item) => sum + item.clicks,
    0
  );
  const totalCost = filteredData.value.reduce(
    (sum, item) => sum + item.cost,
    0
  );
  const totalConversions = filteredData.value.reduce(
    (sum, item) => sum + item.conversions,
    0
  );

  return [
    {
      title: "Total Impressions",
      value: totalImpressions.toLocaleString(),
    },
    {
      title: "Total Clicks",
      value: totalClicks.toLocaleString(),
    },
    {
      title: "Total Cost",
      value: totalCost.toLocaleString(),
    },
    {
      title: "Total Conversions",
      value: totalConversions.toLocaleString(),
    },
  ];
});

// Configure charts
const charts = computed(() => {
  const timestamps = filteredData.value.map((item) => item.timestamp);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM dd, yyyy",
          },
        },
      },
    },
  };

  return [
    {
      title: "Impressions",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Impressions",
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            data: filteredData.value.map((item) => item.impressions),
          },
        ],
      },
      options,
    },
    {
      title: "Cost",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Cost",
            backgroundColor: "rgba(255, 206, 86, 0.3)",
            data: filteredData.value.map((item) => item.cost),
          },
        ],
      },
      options,
    },
    {
      title: "Clicks",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Clicks",
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            data: filteredData.value.map((item) => item.clicks),
          },
        ],
      },
      options,
    },
    {
      title: "Conversions",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Conversions",
            backgroundColor: "rgba(75, 192, 192, 0.3)",
            data: filteredData.value.map((item) => item.conversions),
          },
        ],
      },
      options,
    },
  ];
});
</script>
