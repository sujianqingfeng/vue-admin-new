<script lang="ts" setup>
  import { UserOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-dropdown placement="bottomRight">
    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></a-avatar>

    <template #overlay>
      <a-menu>
        <a-menu-item>
          <UserOutlined />
          退出
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
