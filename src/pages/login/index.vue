<script setup lang="ts">
  import { reactive } from 'vue'

  const user = reactive({
    account: '',
    password: ''
  })

  function onLogin() {}
</script>

<template>
  <div class="login-container">
    <a-input v-model="user.account"></a-input>
    <a-input v-model="user.password"></a-input>

    <a-button type="primary" @click="onLogin">登录</a-button>
  </div>
</template>
