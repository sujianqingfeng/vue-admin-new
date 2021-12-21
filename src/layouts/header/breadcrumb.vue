<script setup lang="ts">
  import { RouteLocationMatched, useRouter } from 'vue-router'
  import { useBreadcrumb } from './hooks/useBreadcrumb'
  const { breadcrumbs } = useBreadcrumb()

  const router = useRouter()
  function onClick(route: RouteLocationMatched, paths: string[], e: Event) {
    e.preventDefault()
    const url = '/' + paths.join('/')
    if (url !== route.path) {
      router.push(url)
    }
  }
</script>
<template>
  <a-breadcrumb :routes="breadcrumbs">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.title }}
      </span>
      <router-link v-else to="" @click="onClick(route, paths, $event)"> {{ route.title }} </router-link>
    </template>
  </a-breadcrumb>
</template>
