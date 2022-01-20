<script lang="ts" setup>
  import { onBeforeUnmount, defineProps, nextTick } from 'vue'

  import { Toolbar, Editor, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
  import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
  import '@wangeditor/editor/dist/css/style.css'

  const props = defineProps({
    content: {
      type: String,
      default: ''
    },
    contentHeight: {
      type: Number,
      default: 500
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    }
  })

  const editorId = `w-e-${Math.random().toString().slice(-5)}`
  const mode = 'default'
  const toolbarConfig = {}
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: props.placeholder,
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: any) {
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          // insertFn(url, alt, href)
          console.log(file, insertFn)
        }
      }
    }
  }

  const existEditor = (cb: (editor: IDomEditor) => void) => {
    const editor = getEditor(editorId)
    if (editor) {
      cb(editor)
    }
  }

  const onEditorFocus = (editor: IDomEditor) => {
    nextTick(() => {
      editor.insertText(props.content)
    })
  }

  onBeforeUnmount(() => {
    existEditor((editor) => {
      editor.destroy()
      removeEditor(editorId)
    })
  })
</script>

<template>
  <div>
    <Toolbar :editor-id="editorId" :mode="mode" :default-config="toolbarConfig" />
    <Editor :editor-id="editorId" :default-config="editorConfig" :mode="mode" :style="{ height: contentHeight + 'px' }" @on-focus="onEditorFocus" />
  </div>
</template>

<style lang="less">
  // @import '@wangeditor/editor/dist/css/style.css';
</style>
