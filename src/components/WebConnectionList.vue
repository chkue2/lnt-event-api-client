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
              v-model="searchForm.path"
              placeholder="URL"
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
        :rows="webConnectionStore.getConnectionList || []"
        :columns="CONNECTION_LIST_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="index"
        hide-pagination
        style="width: 100%; height: 100%"
        @virtual-scroll="onScroll"
      >
        <template v-slot:body-cell="props">
          <q-td
            :props="props"
            @click="() => webConnectionStore.setSelectedEmail(props.row.userId)"
          >
            <div v-if="props.col.name === 'index'">
              {{ props.rowIndex + 1 }}
            </div>
            <div v-else-if="props.col.name === 'auth'">
              {{ props.row.auth }}
            </div>
            <div v-else-if="props.col.name === 'path'">
              {{ props.row.path }}
            </div>
            <div v-else-if="props.col.name === 'userId'">
              {{ props.row.userId }}
            </div>
            <div v-else-if="props.col.name === 'store'">
              {{ props.row.store }}
            </div>
            <div v-else-if="props.col.name === 'insCode'">
              {{ props.row.insCode }}
            </div>
            <div v-else-if="props.col.name === 'ip'">
              {{ props.row.ip }}
            </div>
            <div v-else>
              {{ props.row.createdAt }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lagn="ts">
import { ref, onMounted, watch } from 'vue';
import { useWebConnectionStore } from 'src/stores/web-connection-store';
import { CONNECTION_LIST_COLUMN } from 'src/shared/domain/connection';
import { storeOptions } from 'src/shared';

const webConnectionStore = useWebConnectionStore();

const store = ref({
  label: '관리자',
  value: '',
});

const searchForm = ref({
  store: '',
  insCode: '',
  path: '',
  keyword: '',
  limit: 30,
  cursor: '',
});

const pagination = ref({
  rowsPerPage: 0,
});

onMounted(() => {
  callApiList();
});

watch(store, () => {
  searchForm.value.store = store.value.value;
  callApiList();
});

const callApiList = () => {
  webConnectionStore.searchConnectionList(searchForm.value);
};

const onScroll = (detail) => {
  if (detail.index === detail.to) {
    const search = webConnectionStore.getConnectionListSearch;
    if (search) {
      webConnectionStore.searchConnectionListAdd(search);
    }
  }
};
</script>
