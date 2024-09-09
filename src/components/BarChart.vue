<template>
  <bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartStore.getChartView"
  />
</template>

<script setup lagn="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from 'chart.js';

import { useChartStore } from 'src/stores/chart-store';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

ChartJS.defaults.borderColor = 'rgb(54, 54, 54)';
ChartJS.defaults.plugins.legend.display = false;

const chartStore = useChartStore();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
