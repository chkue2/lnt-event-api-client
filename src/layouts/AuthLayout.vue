<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const logout = () => {
  //
};
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 96vh">
      <q-header
        class="text-white"
        style="background-color: #29353a; border-radius: 3px 3px 3px 3px"
      >
        <q-toolbar>
          <q-avatar icon="home" />
          <span class="text-subtitle1 q-pt-xs"
            >로앤텍 이벤트 관리자 페이지입니다.
          </span>

          <q-space />
          <span class="text-subtitle2 q-pt-sm text-bold q-pr-md">
            ~~~님 좋은 하루 보내세요 !
          </span>
          <q-btn flat round dense icon="logout" @click="logout" />
        </q-toolbar>

        <q-toolbar inset>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el
              :class="route.name == 'dashboard' ? 'text-blue' : ''"
              label="대시보드"
              icon="dashboard"
              :to="{ name: 'dashboard' }"
            />
            <q-breadcrumbs-el
              :class="route.name == 'document' ? 'text-blue' : ''"
              label="전문이력"
              icon="summarize"
              :to="{ name: 'document' }"
            />
            <q-breadcrumbs-el
              :class="route.name == 'webconnection' ? 'text-blue' : ''"
              label="접속이력"
              icon="lan"
              :to="{ name: 'webconnection' }"
            />
            <q-breadcrumbs-el
              :class="route.name == 'user' ? 'text-blue' : ''"
              label="사용자현황"
              icon="group"
              :to="{ name: 'user' }"
            />
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style>
.doc-card-title {
  margin-left: -12px;
  padding: 4px 8px 4px 28px;
  position: relative;
  background: #475d66;
  color: #cbcbcb;
  font-size: 18px;
  letter-spacing: 0.7px;
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
