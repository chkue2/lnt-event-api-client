<template>
  <card-theme
    ribbon-title="접속 이력"
    view-type=""
    ribbon-width="300"
    title-icon="lan"
  >
    <template v-slot:title>
      <div class="row">
        <div class="q-pt-xs">
          <span class="text-grey-6">사용자의 웹접속 이력입니다.</span>
        </div>
        <q-space />
      </div>
    </template>
    <template v-slot:main>
      <web-connection-list></web-connection-list>
    </template>
    <template v-slot:info>
      <web-connection-user></web-connection-user>
    </template>
  </card-theme>
</template>

<script setup lang="ts">
import CardTheme from 'src/components/CardTheme.vue';
import WebConnectionList from 'src/components/WebConnectionList.vue';
import WebConnectionUser from 'src/components/WebConnectionUser.vue';
</script>
