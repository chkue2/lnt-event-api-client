<template>
  <div class="column full-height" style="overflow-x: auto">
    <div v-if="webConnectionStore.getActive" class="col-12 q-pa-md">
      <q-table
        flat
        bordered
        dark
        :rows="webConnectionStore.getConnectionUser ? connectionUserRows : []"
        :columns="[
          {
            name: 'name',
            label: '항목',
            align: 'center',
            field: 'name',
          },
          {
            name: 'value',
            label: '내용',
            align: 'center',
            field: 'value',
          },
        ]"
        row-key="name"
        hide-pagination
        :rows-per-page-options="[0]"
        :colmns-per-page-options="[0]"
        style="width: 100%; height: 100%"
      >
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';

import { CONNECTION_USER_ROWS } from 'src/shared/domain/connection';
import { useWebConnectionStore } from 'src/stores/web-connection-store';

const webConnectionStore = useWebConnectionStore();

const roles: {
  [key: string]: string;
} = {
  ROLE_ADMIN: '관리자',
  ROLE_USER: '사용자',
};

watch(
  () => webConnectionStore.getSelectedEmail,
  () => {
    webConnectionStore.searchConnectionUser();
  }
);

const connectionUserRows = computed(() => {
  const connectionUser = webConnectionStore.getConnectionUser;
  if (connectionUser) {
    CONNECTION_USER_ROWS.map((x) => {
      if (x.name === '이메일') x.value = connectionUser.email;
      else if (x.name === '이름') x.value = connectionUser.fullName;
      else if (x.name === '서비스')
        x.value = connectionUser.store === 'KN' ? '법무인' : '관리자';
      else if (x.name === '기관코드') x.value = connectionUser.insCode;
      else if (x.name === '권한') x.value = roles[connectionUser.role];
      else if (x.name === '장기 미접속 여부')
        x.value = connectionUser.accountExpired ? 'Y' : 'N';
      else if (x.name === '계정 미승인(정지) 여부')
        x.value = connectionUser.accountLocked ? 'Y' : 'N';
      else if (x.name === '비밀번호 변경 대상여부')
        x.value = connectionUser.credentialsExpried ? 'Y' : 'N';
      else if (x.name === '계정 탈퇴 여부')
        x.value = connectionUser.disabled ? 'Y' : 'N';
    });
  }
  return CONNECTION_USER_ROWS;
});
</script>
