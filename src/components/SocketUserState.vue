<template>
  <div class="column full-height">
    <div class="col-2 q-pa-md">
      <q-card flat bordered>
        <q-item class="q-pa-md">
          <q-item-section class="col-4">
            <q-input
              outlined
              dense
              square
              v-model="searchForm.insCode"
              placeholder="기관코드"
              @keyup.enter="callApi"
            >
              <template v-slot:append>
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="callApi"
                ></q-icon>
              </template>
            </q-input>
          </q-item-section>
          <q-item-section class="col-4">
            <q-select
              dense
              v-model="storeType"
              :options="storeTypeOptions"
              square
              outlined
              @update:model-value="changeSearchData"
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
          <q-item-section class="col-4">
            <q-select
              dense
              v-model="userType"
              :options="userTypeOptions"
              class="q-pr-sm"
              square
              outlined
              @update:model-value="changeSearchData"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >접속자구분</q-tooltip
              >
            </q-select>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-10">
      <q-table
        dark
        flat
        bordered
        table-header-class="bg-grey-9"
        :rows="socketUserStore.getSocketUsers || []"
        :columns="SOCKET_USER_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        hide-pagination
        style="width: 100%; height: 100%"
      >
        <template v-slot:body-cell-order="props">
          <q-td :props="props">
            {{ props.rowIndex + 1 }}
          </q-td>
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name === 'userId'">
              {{ props.row.userId }}
            </div>
            <div v-else-if="props.col.name === 'store'">
              {{ props.row.store }}
            </div>
            <div v-else-if="props.col.name === 'insCode'">
              {{ props.row.insCode }}
            </div>
            <div v-else-if="props.col.name === 'userType'">
              {{ props.row.userType }}
            </div>
            <div v-else-if="props.col.name === 'connected'">
              <i v-if="props.row.connected" class="connected on"></i>
              <i v-else class="connected off"></i>
            </div>
            <div v-else>
              {{ date.formatDate(props.row.createdAt, 'YYYY-MM-DD') }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  SOCKET_USER_COLUMN,
  SearchSocketUserState,
} from 'src/shared/domain/socket';
import { SelectOptions } from 'src/shared/model';

import { useSocketUserStore } from 'src/stores/socket-user-store';
import { date } from 'quasar';

const socketUserStore = useSocketUserStore();

const storeTypeOptions: SelectOptions[] = [
  { label: '전체', value: '' },
  { label: '법무인', value: 'KN' },
];

const userTypeOptions: SelectOptions[] = [
  { label: '전체', value: '' },
  { label: '사용자', value: 'APP' },
  { label: 'RPA', value: 'RPA' },
];

const storeType = ref<SelectOptions>({ label: '전체', value: '' });

const userType = ref<SelectOptions>({ label: '전체', value: '' });

const searchForm = ref<SearchSocketUserState>({
  store: '',
  insCode: '',
  userType: '',
  limit: 30,
  cursor: '',
});

const pagination = ref({
  rowsPerPage: 0,
});

onMounted(() => {
  callApi();
});

watch([storeType, userType], () => {
  callApi();
});

const callApi = () => {
  socketUserStore.searchSocketUsers(searchForm.value);
};

const changeSearchData = () => {
  searchForm.value.store = storeType.value.value;
  searchForm.value.userType = userType.value.value;
};
</script>

<style scoped lang="scss">
.connected {
  display: block;
  width: 10px;
  height: 10px;
  margin: 0 auto;
  border-radius: 50%;
  &.on {
    background-color: greenyellow;
  }
  &.off {
    background-color: red;
  }
}
</style>
