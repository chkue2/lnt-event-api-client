<script setup lang="ts">
import { QPopupProxy } from 'quasar';
import { ref } from 'vue';

interface Props {
  parentDate: string;
}
const props = defineProps<Props>();

const selectedDate = ref<string>(props.parentDate);
const dateInputProxy = ref<QPopupProxy | null>(null);

const emit = defineEmits<{
  (e: 'updateDate', date: string): void;
}>();

/**
 *  methods
 */

const updateDate = () => {
  if (dateInputProxy.value) dateInputProxy.value.hide();
  emit('updateDate', selectedDate.value);
};

//
</script>

<template>
  <q-input
    v-model="selectedDate"
    :label="void 0"
    dense
    borderless
    mask="####-##-##"
    input-class="cursor-pointer q-ml-sm"
    @update:model-value="updateDate"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer"> </q-icon>
    </template>
    <q-popup-proxy
      ref="dateInputProxy"
      transition-show="scale"
      transition-hide="scale"
      :breakpoint="0"
    >
      <q-date
        v-model="selectedDate"
        mask="YYYY-MM-DD"
        minimal
        @update:model-value="updateDate"
        no-unset
      >
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="닫기" color="primary" flat />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-input>
</template>
