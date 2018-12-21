<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId" ></textarea>
    <div class="editor-custom-btn-container">
      <editorImage v-show="toolbarShow" color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
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
      tinymceId: this.id || 'vue-tinymce-' + new Date()
    }
  },
  computed: {
    language () {
      return this.$store.state.app.language
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    },
    language (val) {
      this.destroyTinymce()
      this.initTinymce()
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
      let locale = this.language
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
        plugins: [
          "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
        ],
        toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
        toolbar: this.toolbarShow,
        menubar: false,
        toolbar_items_size: 'small',
        style_formats: [{
          title: 'Self header',
          block: 'h1',
          styles: {
            color: '#40b4c4',
            'font-size': '1.2em',
            'text-align': 'center',
            background: 'url(https://www.coolvisit.com/assets/img/v1/bg/bg1.png) center center no-repeat'
          }
        }/*, {
          title: 'Example 1',
          inline: 'span',
          classes: 'example1'
        }, {
          title: 'Example 2',
          inline: 'span',
          classes: 'example2'
        }, {
          title: 'Table styles'
        }, {
          title: 'Table row 1',
          selector: 'tr',
          classes: 'tablerow1'
        }*/],
        templates: [{
          title: 'Test template 1',
          content: 'Test 1'
        }, {
          title: 'Test template 2',
          content: 'Test 2'
        }],
        branding: false,
        elementpath: false,
        statusbar: false,
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
