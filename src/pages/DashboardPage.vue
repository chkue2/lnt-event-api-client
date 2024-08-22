<template>
  <card-theme
    ribbon-title="대시보드"
    view-type=""
    ribbon-width="300"
    title-icon="dashboard"
  >
    <template v-slot:title>
      <div class="row">
        <div class="q-pt-xs">
          <span class="text-grey-6"
            >전문 의뢰 통계 및 웹소켓 접속 현황입니다.</span
          >
        </div>
        <q-space />
      </div>
    </template>
    <template v-slot:main>
      <statistics-chart></statistics-chart>
    </template>
    <template v-slot:info>
      <socket-user-state></socket-user-state>
    </template>
  </card-theme>
</template>

<script setup lang="ts">
import CardTheme from 'src/components/CardTheme.vue';
import StatisticsChart from 'src/components/StatisticsChart.vue';
import SocketUserState from 'src/components/SocketUserState.vue';
</script>
