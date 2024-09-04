<template>
  <div class="column full-height">
    <div class="col-12">
      <q-card v-if="userStore.getActive" flat bordered>
        <q-item class="q-pa-md">
          <div class="user-detail-grid">
            <div class="user-detail-title">이메일</div>
            <div class="user-detail-content">{{ form.email }}</div>
            <div class="user-detail-title">이름</div>
            <div class="user-detail-content">{{ form.fullName }}</div>
            <div class="user-detail-title">서비스</div>
            <div class="user-detail-content">
              <q-select
                dense
                borderless
                square
                outlined
                v-model="store"
                :options="storeOptions"
              >
              </q-select>
            </div>
            <div class="user-detail-title">기관코드</div>
            <div class="user-detail-content">{{ form.insCode }}</div>
            <div class="user-detail-title">권한</div>
            <div class="user-detail-content">
              <q-select
                dense
                borderless
                square
                outlined
                v-model="role"
                :options="roleOptions"
              >
              </q-select>
            </div>
            <div class="user-detail-title">사용상태</div>
            <div class="user-detail-content">
              <q-select
                dense
                borderless
                square
                outlined
                v-model="useFlag"
                :options="useFlagOptions"
              >
              </q-select>
            </div>
          </div>
        </q-item>
        <q-item class="q-pa-md q-gutter-md row">
          <div v-if="form.accountExpired === true" class="col">
            <q-btn
              class="full-width"
              label="장기 미접속 해제"
              color="seconary"
              rounded
              @click="clickCleanExpired"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              label="변경"
              color="primary"
              rounded
              @click="clickUpdateButton"
            >
            </q-btn>
          </div>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { useUserStore } from 'src/stores/user-store';
import { storeOptions, roleOptions } from 'src/shared';

const userStore = useUserStore();

const useFlagOptions = [
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
];

const form = ref({
  email: '',
  fullName: '',
  insCode: '',
  store: '',
  role: '',
  useFlag: '',
  accountExpired: false,
  lastLogonTime: '',
  createdAt: '',
  updatedAt: '',
});

const store = ref({
  label: '관리자',
  value: '',
});
const role = ref({
  label: '관리자',
  value: 'ROLE_ADMIN',
});
const useFlag = ref({
  label: '사용',
  value: 'Y',
});

onMounted(() => {
  form.value = userStore.getUserDetail;
});

watch(
  () => userStore.getUserDetail,
  () => {
    store.value = storeOptions.filter(
      (x) => x.value === userStore.getUserDetail.store
    )[0];
    role.value = roleOptions.filter(
      (x) => x.value === userStore.getUserDetail.role
    )[0];
    useFlag.value = useFlagOptions.filter(
      (x) => x.value === userStore.getUserDetail.useFlag
    )[0];
    form.value = userStore.getUserDetail;
  }
);

watch([store, role, useFlag], () => {
  form.value.store = store.value.value;
  form.value.role = role.value.value;
  form.value.useFlag = useFlag.value.value;
});

const clickUpdateButton = () => {
  userStore.updateUserDetail({
    email: form.value.email,
    fullName: form.value.fullName,
    insCode: form.value.insCode,
    store: form.value.store,
    role: form.value.role,
    useFlag: form.value.useFlag,
  });
};

const clickCleanExpired = () => {
  userStore.cleanExpired(form.value.email);
};
</script>

<style scoped lang="scss">
.user-detail-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.user-detail-title {
  grid-column: span 1;
  border: 1px solid rgba(255, 255, 255, 0.28);
  text-align: center;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-detail-content {
  grid-column: span 2;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-left: none;
  text-align: center;
  padding: 12px;
}
</style>
