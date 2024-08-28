<template>
  <div class="column full-height">
    <div class="col-2 q-pa-md">
      <q-card flat bordered>
        <q-item class="q-pa-md">
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="dateType"
              :options="dateTypeOptions"
            />
          </q-item-section>
          <q-item-section class="col-2">
            <date-input :parent-date="searchDate" @update-date="updateDate" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-10">
      <q-card-section style="height: 100%">
        <bar-chart></bar-chart>
      </q-card-section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { date } from 'quasar';

import BarChart from 'src/components/BarChart.vue';
import DateInput from 'src/components/DateInput.vue';
import { CHART_DATE_WEEK, dateTypeOptions } from 'src/shared/domain/chart';

import { useChartStore } from 'src/stores/chart-store';

const chartStore = useChartStore();

const dateType = ref({
  label: '주',
  value: CHART_DATE_WEEK,
});
const searchDate = ref(date.formatDate(new Date(), 'YYYY-MM-DD'));

onMounted(() => {
  callApi();
});

watch([dateType, searchDate], () => {
  callApi();
});

const callApi = () => {
  chartStore.searchChart({
    searchDateType: dateType.value.value,
    searchToDate: searchDate.value,
  });
};

const updateDate = (val: string) => {
  searchDate.value = val;
};
</script>
