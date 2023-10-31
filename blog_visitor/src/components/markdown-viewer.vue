<template>
  <div class="wrapper">
    <div :id="id" />
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import '@toast-ui/editor/dist/i18n/zh-cn.js';
 
// import Editor from 'tui-editor' 有markdown预览窗口问题
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"; // 新版


export default {
  name: 'MarkdownViewer',
  props: {
    id: {
      type: String,
      required: false,
      default() {
        return 'viewer'
      }
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(newValue, preValue) {
      this.setValue(newValue)
    },
    language(val) {
      this.destroyViewer()
      this.initViewer()
    },
    height(newValue) {
      this.editor.height(newValue)
    }
  },
  mounted() {
    this.initViewer()
  },
  destroyed() {
    this.destroyViewer()
  },
  methods: {
    initViewer() {
      this.editor = new Viewer({
        el: document.getElementById(this.id),
        viewer: true,
        height: this.height,
        initialValue: this.value
      })
    },
    destroyViewer() {
      if (!this.editor) return
      this.editor.remove()
    },
    setValue(newValue) {
      this.editor.preview.setHTML(newValue)
    }
  }
}
</script>
<style scoped>
.wrapper {
  color: #999;
}
</style>

