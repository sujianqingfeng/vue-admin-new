<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import type { FormInstance } from 'ant-design-vue'
  import { useUserLogin } from '@/hooks/data/user'

  const formRef = ref<FormInstance>()

  const user = reactive({
    account: 'admin',
    password: 'admin'
  })

  const { fetchUserLogin } = useUserLogin()

  const router = useRouter()
  async function onLogin() {
    await formRef.value?.validate()
    await fetchUserLogin(user)
    router.push('/')
  }
</script>

<template>
  <div class="login-container">
    <div class="main-container">
      <a-row :gutter="[16, 0]">
        <a-col span="12"> image </a-col>
        <a-col span="12">
          <div class="logo">logo</div>

          <a-form ref="formRef" :model="user">
            <a-form-item name="account" :rules="[{ required: true, message: '请输入账号！' }]">
              <a-input v-model:value="user.account" placeholder="请输入账号"></a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
              <a-input-password v-model:value="user.password" placeholder="请输入密码"></a-input-password>
            </a-form-item>
          </a-form>

          <a-button type="primary" @click="onLogin">登录</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .main-container {
      width: 800px;

      .ant-input {
        margin-top: @padding-md;
      }

      .ant-btn {
        margin-top: @padding-md;
      }
    }
  }
</style>
