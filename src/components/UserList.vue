<template>
  <div class="column full-height" style="overflow-x: auto">
    <div class="col-2 q-pa-md">
      <q-card flat bordered>
        <q-item class="q-pa-md">
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="store"
              :options="storeOptions"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >서비스</q-tooltip
              >
            </q-select>
          </q-item-section>
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="useFlag"
              :options="userFlagOptions"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >사용상태</q-tooltip
              >
            </q-select>
          </q-item-section>
          <q-item-section class="col-3">
            <q-input
              outlined
              dense
              square
              v-model="searchForm.insCode"
              placeholder="기관코드"
              @keyup.enter="callApiList"
            >
              <template v-slot:append>
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="callApiList"
                ></q-icon>
              </template>
            </q-input>
          </q-item-section>
          <q-item-section class="col-3">
            <q-input
              outlined
              dense
              square
              v-model="searchForm.keyword"
              placeholder="이메일"
              @keyup.enter="callApiList"
            >
              <template v-slot:append>
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="callApiList"
                ></q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-10 q-pa-md">
      <q-table
        dark
        flat
        bordered
        virtual-scroll
        table-header-class="bg-grey-9"
        :rows="userStore.getUserList || []"
        :columns="USER_LIST_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="index"
        hide-pagination
        style="width: 100%; height: 100%"
        @virtual-scroll="onScroll"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props" @click="clickUserRow(props.row.email)">
            <div v-if="props.col.name === 'index'">
              {{ props.rowIndex + 1 }}
            </div>
            <div v-else-if="props.col.name === 'email'">
              {{ props.row.email }}
            </div>
            <div v-else-if="props.col.name === 'fullName'">
              {{ props.row.fullName }}
            </div>
            <div v-else-if="props.col.name === 'store'">
              {{ props.row.store === 'KN' ? '법무인' : '관리자' }}
            </div>
            <div v-else-if="props.col.name === 'insCode'">
              {{ props.row.insCode }}
            </div>
            <div v-else-if="props.col.name === 'role'">
              {{ roles[props.row.role] }}
            </div>
            <div v-else-if="props.col.name === 'useFlag'">
              {{ props.row.useFlag === 'Y' ? '사용' : '미사용' }}
            </div>
            <div v-else-if="props.col.name === 'accountExpired'">
              {{ props.row.accountExpired ? 'Y' : 'N' }}
            </div>
            <div v-else-if="props.col.name === 'lastLogonTime'">
              {{ props.row.lastLogonTime }}
            </div>
            <div v-else-if="props.col.name === 'createdAt'">
              {{ props.row.createdAt }}
            </div>
            <div v-else>
              {{ props.row.updatedAt }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import { USER_LIST_COLUMN } from 'src/shared/domain/user';
import { useUserStore } from 'src/stores/user-store';
import { storeOptions, userFlagOptions } from 'src/shared';
import { roles } from 'src/shared';

const userStore = useUserStore();

const pagination = ref({
  rowsPerPage: 0,
});

const store = ref({
  label: '관리자',
  value: '',
});
const useFlag = ref({ label: '전체', value: '' });

const searchForm = ref({
  store: '',
  insCode: '',
  useFlag: '',
  keyword: '',
  limit: 30,
  cursor: '',
});

onMounted(() => {
  callApiList();
});

watch([store, useFlag], () => {
  searchForm.value.store = store.value.value;
  searchForm.value.useFlag = useFlag.value.value;
  callApiList();
});

const callApiList = () => {
  userStore.searchUserList(searchForm.value);
};

const onScroll = (detail) => {
  if (detail.index === detail.to) {
    const search = userStore.getUserListSearch;
    if (search) {
      userStore.searchUserListAdd(search);
    }
  }
};

const clickUserRow = (email: string) => {
  userStore.searchUserDetail(email);
};
</script>
