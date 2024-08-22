<script setup lang="ts"></script>

<template>
  <div class="row justify-center" style="height: 90vh">
    <div class="col-12 col-md-7 flex justify-center content-center">
      <div class="row" style="height: 80%">
        <div class="col-12 flex justify-center" style="height: 60px">
          <h4>로앤텍 이벤트 API</h4>
        </div>
        <div class="col-12 flex justify-center">
          <img
            src="../assets/workplace.jpg"
            class="responsive q-pa-lg"
            style="height: 80%; margin-top: 20px"
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5 flex content-center justify-center home-right">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.secretary {
  position: fixed;
  height: 45%;
  left: 50px;
  bottom: 20vh;
  vertical-align: middle;
}
.home-right {
  padding-bottom: 20px;
  vertical-align: middle;
}
</style>
