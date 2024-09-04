<template>
  <q-card
    flat
    bordered
    :style="$q.screen.lt.sm ? { width: '80%' } : { width: '60%' }"
  >
    <q-card-section class="q-pb-none"> </q-card-section>
    <q-card-section class="q-pb-none">
      <div class="col text-h6 flex justify-center text-grey-5">계정등록</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="signupForm" @submit="onSubmit">
        <q-input
          v-model="model.email"
          label="이메일"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '이메일을 입력하세요.']"
        />
        <q-input
          v-model="model.fullName"
          label="이름"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '이름을 입력하세요.']"
        />
        <q-select
          v-model="model.store"
          :options="storeOptions"
          label="서비스"
          emit-value
          map-options
        />
        <q-input v-model="model.insCode" label="기관코드" />
        <q-input
          v-model="model.password"
          type="password"
          label="비밀번호"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '비밀번호를 입력하세요.',
          ]"
        />
        <q-input
          v-model="model.passwordConfirm"
          type="password"
          label="비밀번호 확인"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0 && model.password === val) ||
              '비밀번호를 다시 입력하세요.',
          ]"
        />
        <!-- <div v-if="store.isError" class="text-red text-center q-pa-none">
          {{ store.getMessage }}
        </div> -->

        <div class="q-pt-sm q-gutter-md row">
          <div class="col">
            <q-btn
              class="full-width"
              label="로그인"
              color="seconary"
              rounded
              @click="moveSignin"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              label="계정 등록"
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
import { ref } from 'vue';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';

import { SignupUser } from 'src/shared/domain/author';
import { useAuthorStore } from 'src/stores/auth-store';
import { storeOptions } from 'src/shared';

const router = useRouter();
const authStore = useAuthorStore();

const signupForm = ref(null);
const model = ref<SignupUser>({
  email: '',
  password: '',
  passwordConfirm: '',
  store: 'KN',
  insCode: '',
  fullName: '',
});
/**
 *  methods
 */
const onSubmit = () => {
  if (!signupForm.value) return;
  const form = signupForm.value as QForm;
  form.validate().then((success) => {
    if (success) {
      // signin
      authStore.signup(model.value, moveSignin);
    }
  });
};

const moveSignin = () => {
  router.push({ name: 'signin' });
};
</script>
