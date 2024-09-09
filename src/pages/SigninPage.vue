<template>
  <q-card
    flat
    bordered
    :style="$q.screen.lt.sm ? { width: '80%' } : { width: '60%' }"
  >
    <q-card-section class="q-pb-none"> </q-card-section>
    <q-card-section class="q-pb-none">
      <div class="col text-h6 flex justify-center text-grey-5">로그인</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="signinForm" @submit="onSubmit">
        <q-input
          v-model="model.email"
          label="이메일"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '이메일을 입력하세요.']"
        />
        <q-input
          v-model="model.password"
          type="password"
          label="비밀번호"
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
              label="계정등록"
              color="seconary"
              rounded
              @click="moveSignup"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              label="로그인"
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

import { SigninUser } from 'src/shared/domain/author';
import { useAuthorStore } from 'src/stores/auth-store';

const router = useRouter();
const authStore = useAuthorStore();

const signinForm = ref(null);

const model = ref<SigninUser>({
  email: '',
  password: '',
});

/**
 *  methods
 */
const onSubmit = () => {
  if (!signinForm.value) return;
  const form = signinForm.value as QForm;
  form.validate().then((success) => {
    if (success) {
      authStore.login(model.value);
    }
  });
};

const moveSignup = () => {
  router.push({ name: 'signup' });
};
</script>
