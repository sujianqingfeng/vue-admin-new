<script lang="ts" setup>
  import { useLog } from '@/hooks/utils/log'
  import { h, SetupContext } from 'vue'

  const { info } = useLog()

  const AComponent = (props: any, ctx: SetupContext) => {
    return h(
      'div',
      {
        onClick: () => {
          info('A组件点击')
          ctx.emit('a')
        }
      },
      'A组件'
    )
  }

  const BComponent = (props: any, ctx: SetupContext) => {
    return h(
      'div',
      {
        onClick: () => {
          info('B组件点击')
          ctx.emit('b')
        }
      },
      'B组件'
    )
  }

  const list = [
    {
      events: {
        a: () => {
          info('out a click')
        }
      },
      component: AComponent
    },
    {
      events: {
        b: () => {
          info('out b click')
        }
      },
      component: BComponent
    }
  ]
</script>

<template>
  <template v-for="(item, index) in list" :key="index">
    <component :is="item.component" v-on="item.events"></component>
  </template>
</template>
