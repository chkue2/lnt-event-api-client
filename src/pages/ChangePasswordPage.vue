<template>
  <q-card
    flat
    bordered
    :style="$q.screen.lt.sm ? { width: '80%' } : { width: '60%' }"
  >
    <q-card-section class="q-pb-none"> </q-card-section>
    <q-card-section class="q-pb-none">
      <div class="col text-h6 flex justify-center text-grey-5">
        비밀번호 변경
      </div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="signinForm" @submit="onSubmit">
        <q-input
          model-value=""
          type="password"
          label="비밀번호"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '비밀번호를 입력하세요.',
          ]"
        />
        <q-input
          model-value=""
          type="password"
          label="비밀번호 확인"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '비밀번호를 입력하세요.',
          ]"
        />
        <!-- <div v-if="store.isError" class="text-red text-center q-pa-none">
          {{ store.getMessage }}
        </div> -->

        <div class="q-pt-sm q-gutter-md row">
          <div class="col">
            <q-btn
              class="full-width"
              label="비밀번호 변경"
              color="primary"
              type="submit"
              rounded
            >
              <template v-slot:loading>
                <q-spinner-dots />
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 *  methods
 */
const onSubmit = () => {
  //
};

const moveSignin = () => {
  router.push({ name: 'signin' });
};
</script>
