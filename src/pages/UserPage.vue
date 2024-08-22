<template>
  <card-theme
    ribbon-title="사용자 현황"
    view-type=""
    ribbon-width="300"
    title-icon="group"
  >
    <template v-slot:title>
      <div class="row">
        <div class="q-pt-xs">
          <span class="text-grey-6">웹 사용자 현황입니다.</span>
        </div>
        <q-space />
      </div>
    </template>
    <template v-slot:main>
      <user-list></user-list>
    </template>
    <template v-slot:info>
      <user-details></user-details>
    </template>
  </card-theme>
</template>

<script setup lang="ts">
import CardTheme from 'src/components/CardTheme.vue';
import UserList from 'src/components/UserList.vue';
import UserDetails from 'src/components/UserDetails.vue';
</script>
