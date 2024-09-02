<template>
  <div class="column full-height" style="overflow-x: auto">
    <div class="col-2 q-pa-md">
      <q-card flat bordered>
        <q-item class="q-pa-md">
          <q-item-section class="col-1">
            <date-input :parent-date="fromDate" @update-date="updateFromDate" />
          </q-item-section>
          <q-item-section class="col-1">
            <date-input :parent-date="toDate" @update-date="updateToDate" />
          </q-item-section>
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="scope"
              :options="scopeOptions"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >전문분류 코드</q-tooltip
              >
            </q-select>
          </q-item-section>
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="catCode"
              :options="catCodeOptions"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >업무 구분 코드</q-tooltip
              >
            </q-select>
          </q-item-section>
          <q-item-section class="col-2">
            <q-select
              dense
              borderless
              square
              outlined
              v-model="kind"
              :options="kindOptions"
            >
              <q-tooltip
                class="bg-light-blue-10 text-caption"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="slide-right"
                transition-hide="slide-right"
                >검색 구분</q-tooltip
              >
            </q-select>
          </q-item-section>
          <q-item-section class="col-2">
            <q-input
              outlined
              dense
              square
              v-model="searchForm.keyword"
              placeholder="검색어"
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
        table-header-class="bg-grey-9"
        :rows="documentStore.getDocumentList || []"
        :columns="DOCUMENT_LIST_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="index"
        hide-pagination
        style="width: 100%; height: 100%"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props" @click="clickRow(props.row.docId)">
            <div v-if="props.col.name === 'index'">
              {{ props.rowIndex + 1 }}
            </div>
            <div v-else-if="props.col.name === 'appId'">
              {{ props.row.appId }}
            </div>
            <div v-else-if="props.col.name === 'docId'">
              {{ props.row.docId }}
            </div>
            <div v-else-if="props.col.name === 'scope'">
              {{ scopeCodes[props.row.scope] }}
            </div>
            <div v-else-if="props.col.name === 'catCode'">
              {{ catCodes[props.row.catCode] }}
            </div>
            <div v-else-if="props.col.name === 'state'">
              {{ stateCodes[props.row.state] }}
            </div>
            <div v-else-if="props.col.name === 'useFlag'">
              {{ useFlagCodes[props.row.useFlag] }}
            </div>
            <div v-else-if="props.col.name === 'store'">
              {{ props.row.store }}
            </div>
            <div v-else-if="props.col.name === 'case_no'">
              {{ props.row.case_no }}
            </div>
            <div v-else-if="props.col.name === 'case_ref_no'">
              {{ props.row.case_ref_no }}
            </div>
            <div v-else-if="props.col.name === 'insCode'">
              {{ props.row.insCode }}
            </div>
            <div v-else-if="props.col.name === 'ownerId'">
              {{ props.row.ownerId }}
            </div>
            <div v-else-if="props.col.name === 'info'">
              {{ props.row.info }}
            </div>
            <div v-else-if="props.col.name === 'createdAt'">
              {{ date.formatDate(props.row.createdAt, 'YYYY-MM-DD') }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { date } from 'quasar';
import DateInput from './DateInput.vue';

import {
  scopeOptions,
  catCodeOptions,
  kindOptions,
  DOCUMENT_LIST_COLUMN,
  useFlagCodes,
  stateCodes,
  scopeCodes,
  catCodes,
} from 'src/shared/domain/document';
import { SelectOptions } from 'src/shared/model';
import { useDocumentStore } from 'src/stores/document-store';

const documentStore = useDocumentStore();

const pagination = ref({
  rowsPerPage: 0,
});

const scope = ref<SelectOptions>({ label: '전체', value: '' });
const catCode = ref<SelectOptions>({ label: '전체', value: '' });
const kind = ref<SelectOptions>({ label: '전체', value: '' });

const fromDate = ref<string>(date.formatDate('2024-07-01', 'YYYY-MM-DD'));
const toDate = ref<string>(date.formatDate(new Date(), 'YYYY-MM-DD'));
const searchForm = ref({
  scope: '',
  catCode: '',
  kind: '',
  keyword: '',
  limit: 30,
  cursor: '',
});

onMounted(() => {
  callApiList();
});

watch([scope, catCode, kind], () => {
  searchForm.value.scope = scope.value.value;
  searchForm.value.catCode = catCode.value.value;
  searchForm.value.kind = kind.value.value;

  callApiList();
});

watch([fromDate, toDate], () => {
  callApiList();
});

const updateFromDate = (val: string) => {
  fromDate.value = val;
};
const updateToDate = (val: string) => {
  toDate.value = val;
};

const callApiList = () => {
  documentStore.searchDocumentList({
    ...searchForm.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
  });
};

const clickRow = (docId: string) => {
  documentStore.setDocId(docId);
};
</script>
