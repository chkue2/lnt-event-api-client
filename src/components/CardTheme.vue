<script setup lang="ts">
interface Props {
  ribbonWidth: string;
  ribbonTitle: string;
  titleIcon: string;
  viewType: string;
}
defineProps<Props>();
</script>

<template>
  <q-card flat bordered style="height: 82vh">
    <div class="doc-card-title q-mt-sm" :style="`width:${ribbonWidth}px`">
      {{ ribbonTitle }}
    </div>
    <q-item>
      <q-item-section avatar>
        <q-avatar :icon="titleIcon"> </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <slot name="title"></slot>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal style="height: calc(100% - 110px)">
      <q-card-section :class="viewType !== 'full' ? 'col-8' : 'col-12'">
        <slot name="main"></slot>
      </q-card-section>

      <q-card-section v-if="viewType !== 'full'" class="col-4 q-pa-md">
        <slot name="info"></slot>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style>
.doc-card-title {
  margin-left: -12px;
  padding: 10px 8px 6px 28px;
  position: relative;
  background: #475d66;
  color: #cbcbcb;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.8px;
}
.doc-card-title:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-width: 9px 0 0 11px;
  border-top-color: #324147;
}
</style>
