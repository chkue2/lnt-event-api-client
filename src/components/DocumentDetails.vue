<template>
  <div class="column full-height" style="overflow-x: auto">
    <div class="col-12 q-pa-md">
      <q-table
        dark
        flat
        bordered
        virtual-scroll
        table-header-class="bg-grey-9"
        :rows="documentStore.getDocumentDetail || []"
        :columns="DOCUMENT_DETAIL_COLUMN"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        hide-pagination
        style="width: 100%; height: 100%"
        @virtual-scroll="onScroll"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name === 'index'">
              {{ props.rowIndex + 1 }}
            </div>
            <div v-else-if="props.col.name === 'fromDevice'">
              {{ props.row.fromDevice }}
            </div>
            <div v-else-if="props.col.name === 'toDevice'">
              {{ props.row.toDevice }}
            </div>
            <div v-else-if="props.col.name === 'scope'">
              {{ scopeCodes[props.row.scope] }}
            </div>
            <div v-else-if="props.col.name === 'timeStamp'">
              {{ date.formatDate(props.row.timeStamp, 'YYYY-MM-DD') }}
            </div>
            <div v-else-if="props.col.name === 'createdAt'">
              {{ date.formatDate(props.row.createdAt, 'YYYY-MM-DD') }}
            </div>
            <div v-else-if="props.col.name === 'saveAt'">
              {{ date.formatDate(props.row.saveAt, 'YYYY-MM-DD') }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { date } from 'quasar';

import { useDocumentStore } from 'src/stores/document-store';
import { DOCUMENT_DETAIL_COLUMN, scopeCodes } from 'src/shared/domain/document';

const documentStore = useDocumentStore();

const pagination = ref({
  rowsPerPage: 0,
});

const searchForm = ref({
  limit: 30,
  cursor: '',
});

watch(
  () => documentStore.selectedDocId,
  () => {
    callApi();
  }
);

const callApi = () => {
  documentStore.searchDocumentDetail(searchForm.value);
};

const onScroll = (detail: {
  index: number;
  from: number;
  to: number;
  direction: string;
}) => {
  if (detail.index === detail.to) {
    const search = documentStore.getDocumentDetailSearch;
    if (search) {
      documentStore.searchDocumentDetailAdd(search);
    }
  }
};
</script>
