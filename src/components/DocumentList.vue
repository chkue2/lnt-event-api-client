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
        virtual-scroll
        table-header-class="bg-grey-9"
        :rows="documentStore.getDocumentList || []"
        :columns="DOCUMENT_LIST_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="index"
        hide-pagination
        style="width: 100%; height: 100%"
        @virtual-scroll="onScroll"
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
            <div v-else-if="props.col.name === 'detailButton'">
              <q-btn
                color="black glossy text-amber q-ml-sm"
                icon="search"
                dense
                round
                size="12px"
                @click="clickDetailButton($event, props.row.docId)"
              ></q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="detailModal">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6"></div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <q-table
              flat
              bordered
              title="이력상세"
              :rows="DOCUMENT_DETAIL_ROWS"
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
          </q-card-section>
        </q-card>
      </q-dialog>
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
  DOCUMENT_DETAIL_ROWS,
  useFlagCodes,
  stateCodes,
  scopeCodes,
  catCodes,
  detailCodes,
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

const fromDate = ref<string>('2024-08-01');
const toDate = ref<string>(date.formatDate(new Date(), 'YYYY-MM-DD'));
const searchForm = ref({
  scope: '',
  catCode: '',
  kind: '',
  keyword: '',
  limit: 30,
  cursor: '',
});

const detailModal = ref<boolean>(false);
const documentDetail = ref<any>({});

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

const onScroll = (detail: {
  index: number;
  from: number;
  to: number;
  direction: string;
}) => {
  if (detail.index === detail.to) {
    const search = documentStore.getDocumentListSearch;
    if (search) {
      documentStore.searchDocumentListAdd(search);
    }
  }
};

const clickRow = (docId: string) => {
  documentStore.setDocId(docId);
};

const clickDetailButton = (e: Event, docId: string) => {
  e.preventDefault();
  e.stopPropagation();
  documentDetail.value = documentStore.getDocumentList?.filter(
    (x) => x.docId === docId
  )[0];
  DOCUMENT_DETAIL_ROWS.map((x) => {
    if (x.name === '앱관리번호') x.value = documentDetail.value.appId;
    else if (x.name === '전문관리번호') x.value = documentDetail.value.docId;
    else if (x.name === '송신') x.value = documentDetail.value.fromDevice;
    else if (x.name === '수신') x.value = documentDetail.value.toDevice;
    else if (x.name === '전문분류')
      x.value = scopeCodes[documentDetail.value.scope];
    else if (x.name === '업무구분')
      x.value = catCodes[documentDetail.value.catCode];
    else if (x.name === '상세구분코드')
      x.value = detailCodes[documentDetail.value.detailCode];
    else if (x.name === '처리상태')
      x.value = stateCodes[documentDetail.value.state];
    else if (x.name === '메시지') x.value = documentDetail.value.resultMsg;
    else if (x.name === '사용상태')
      x.value = useFlagCodes[documentDetail.value.useFlag];
    else if (x.name === '서비스') x.value = documentDetail.value.store;
    else if (x.name === '관리번호') x.value = documentDetail.value.case_no;
    else if (x.name === '은행관리번호')
      x.value = documentDetail.value.case_ref_no;
    else if (x.name === '기관코드') x.value = documentDetail.value.insCode;
    else if (x.name === '자격자') x.value = documentDetail.value.legalStaff;
    else if (x.name === '요청자') x.value = documentDetail.value.ownerId;
    else if (x.name === '처리RPA') x.value = documentDetail.value.workRpa;
    else if (x.name === '처리시작') x.value = documentDetail.value.startTime;
    else if (x.name === '처리완료') x.value = documentDetail.value.endTime;
    else if (x.name === '요청일시') x.value = documentDetail.value.timeStamp;
    else if (x.name === '등록일시') x.value = documentDetail.value.createdAt;
    else if (x.name === '수정일시') x.value = documentDetail.value.updatedAt;
  });
  detailModal.value = true;
};
</script>
