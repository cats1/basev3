<template>
	<div id="div" style="display: none;">
  <textarea :id="tinymceId"></textarea>
  <!-- <editorImage v-show="imgShow" color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage> -->
</div>
</template>
<script>
import editorImage from './components/editorImage'
import $ from 'jquery'
import plugins from './plugins'
import toolbar from './toolbar'
import { valueToString, replaceQuotation,replaceRemoveQuotation } from '@/utils/common'
export default {
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
  data () {
  	return {
  	  hasChange: false,
      hasInit: false,
      content: '',
      tinymceId: this.id || 'vue-tinymce-' + +new Date()
  	}
  },
  watch: {
  	value(val) {
      console.log(val)
      $('#' + this.tinymceId).val(val)
  		this.init()
      /*if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }*/
    }
  },
  mounted () {
  	this.init()
  },
  methods: {
  	init () {
      $("#div").show();
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
        plugins: [
          "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
        ],
        toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
        menubar: false,
        toolbar_items_size: 'small',
        style_formats: [{
          title: 'Bold text',
          inline: 'b'
        }, {
          title: 'Red text',
          inline: 'span',
          styles: {
            color: '#ff0000'
          }
        }, {
          title: 'Red header',
          block: 'h1',
          styles: {
            color: '#ff0000'
          }
        }, {
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
        }],
        templates: [{
          title: 'Test template 1',
          content: 'Test 1'
        }, {
          title: 'Test template 2',
          content: 'Test 2'
        }],
        branding: false,
        elementpath: false,
        setup: function(editor) {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          //_this.hasInit = true
        },
        init_instance_callback: function (editor) {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          //editor.setContent('444')
          _this.hasInit = true
          //editor.setContent(_this.value)
          /*window.setTimeout(function() {
            $("#div").show();
           }, 1000);*/
          editor.on('NodeChange Change KeyUp SetContent', () => {
            _this.hasChange = true
            _this.$emit('input', editor.getBody().innerHTML)//editor.getContent())

          })
        }
      })
  	},
    imageSuccessCBK(url) {
      window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${url}" >`)
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
  }
}
</script>