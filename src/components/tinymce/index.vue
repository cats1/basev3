<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId" ></textarea>
    <div class="editor-custom-btn-container">
      <editorImage v-show="imgShow" color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import tinymceScss from '@/styles/tinymce.scss'
import plugins from './plugins'
import toolbar from './toolbar'
import $ from 'jquery'
export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    toolbarShow: {
      type: Boolean,
      default: true
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    menubarShow: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    imgShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date()
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      var lang = ''
      let locale = this.$i18n.locale
      if (locale === 'en') {
        lang = 'en_GB'
      } else if (locale === 'zh') {
        lang = 'zh_CN'
      } else {
        lang = 'en_GB'
      }
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        language: lang,
        body_class: 'panel-body',
        visual_anchor_class: 'my-custom-class',
        //content_css : tinymceScss,
        object_resizing: true,
        toolbar: this.toolbarShow ? (this.toolbar.length > 0 ? this.toolbar : toolbar) : false,
        menubar: this.menubarShow ? this.menubar : false,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        resize: true,
        statusbar: false,
        max_height: 500,
        //inline: true,
        branding: false,//该选项允许您禁用“Powered by TinyMCE”品牌。
        elementpath: false,//该选项允许您禁用编辑器底部状态栏内的元素路径。
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getBody().innerHTML)//editor.getContent())

          })
        }
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(url) {
      window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${url}" >`)
      /*const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })*/
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  width:80%;
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.editor-upload-btn {
  display: inline-block;
}
.panel-body{
      overflow-y: auto!important;
    }
</style>
