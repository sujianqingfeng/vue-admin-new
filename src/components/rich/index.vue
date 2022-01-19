<script lang="ts" setup>
  import { computed, onBeforeUnmount, defineProps, PropType } from 'vue'

  import { Toolbar, Editor, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
  import '@wangeditor/editor/dist/css/style.css'

  const props = defineProps({
    content: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    contentHeight: {
      type: Number,
      default: 500
    }
  })

  const editorId = `w-e-${Math.random().toString().slice(-5)}`
  const mode = 'default'
  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容...' }

  const getDefaultContent = computed(() => props.content)

  onBeforeUnmount(() => {
    const editor = getEditor(editorId)
    if (editor == null) return

    editor.destroy()
    removeEditor(editorId)
  })
</script>

<template>
  <div>
    <Toolbar :editor-id="editorId" :mode="mode" :default-config="toolbarConfig" />
    <Editor :editor-id="editorId" :default-config="editorConfig" :default-content="getDefaultContent" :mode="mode" />
  </div>
</template>

<style lang="less">
  // @import '@wangeditor/editor/dist/css/style.css';
</style>
