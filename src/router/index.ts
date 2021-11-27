import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import config from '@/config'
import asyncRouters from './async/config.async'
import routers from './config'

function getRouters(async: boolean): RouteRecordRaw[] {
  return async ? asyncRouters : routers
}

export default createRouter({
  history: createWebHistory(),
  routes: getRouters(config.asyncRouter)
})
