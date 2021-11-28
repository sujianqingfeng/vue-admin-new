<script setup lang="ts">
  import { reactive } from 'vue'
  import { fetchLoginApi } from '@/services'
  import { useRouter } from 'vue-router'

  const user = reactive({
    account: '',
    password: ''
  })

  function onLogin() {
    fetchLoginApi(user).then(afterLogin)
  }

  const router = useRouter()

  function afterLogin() {
    router.push('/')
  }
</script>

<template>
  <div class="login-container">
    <a-input v-model="user.account"></a-input>
    <a-input v-model="user.password"></a-input>

    <a-button type="primary" @click="onLogin">登录</a-button>
  </div>
</template>
