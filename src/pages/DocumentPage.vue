<template>
  <card-theme
    ribbon-title="전문 이력"
    view-type=""
    ribbon-width="300"
    title-icon="summarize"
  >
    <template v-slot:title>
      <div class="row">
        <div class="q-pt-xs">
          <span class="text-grey-6"
            >이벤트 API에 수신된 요청 전문 이력입니다.</span
          >
        </div>
        <q-space />
      </div>
    </template>
    <template v-slot:main>
      <document-list></document-list>
    </template>
    <template v-slot:info>
      <document-details></document-details>
    </template>
  </card-theme>
</template>

<script setup lang="ts">
import CardTheme from 'src/components/CardTheme.vue';
import DocumentList from 'src/components/DocumentList.vue';
import DocumentDetails from 'src/components/DocumentDetails.vue';
</script>
