<template>
  <div class="overflow-x-auto">
    <!-- TODO: Add sorting functionality and pagination -->
    <table class="min-w-full bg-white border">
      <thead class="bg-gray-200">
        <tr>
          <th class="py-2 px-4 border-b">Timestamp</th>
          <th class="py-2 px-4 border-b">Impressions</th>
          <th class="py-2 px-4 border-b">Cost</th>
          <th class="py-2 px-4 border-b">Clicks</th>
          <th class="py-2 px-4 border-b">Conversions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in props.tableData"
          :key="data.timestamp"
          class="hover:bg-gray-100 text-center"
        >
          <td class="py-2 px-4 border-b">{{ data.timestamp }}</td>
          <td class="py-2 px-4 border-b">{{ data.impressions }}</td>
          <td class="py-2 px-4 border-b">{{ data.cost }}</td>
          <td class="py-2 px-4 border-b">{{ data.clicks }}</td>
          <td class="py-2 px-4 border-b">{{ data.conversions }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TableData } from "../types";

const props = defineProps<{
  tableData: TableData[];
}>();
</script>
