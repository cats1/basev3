<template>
	<textarea :id="tinymceId">
	</textarea>
</template>
<script>
import plugins from './plugins'
import toolbar from './toolbar'
export default {
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
      content: this.value,
      tinymceId: this.id || 'vue-tinymce-' + +new Date()
  	}
  },
  watch: {
  	value(val) {
  		this.init()
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted () {
  	//this.init()
  },
  methods: {
  	init () {
  	  const _this = this
      window.tinymce.init({
      	selector: `#${this.tinymceId}`,
		height: 500,
		menubar: this.menubarShow ? this.menubar : false,//false
		plugins: plugins,
		group: false,
		toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
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
  	}
  }
}
</script>