<template>
  <div class="clearfix block">
  	<quill-editor-self :content="dcontent" @getcon="getcon"></quill-editor-self>
  </div>
</template>
<script>
import quillEditorSelf from '@/components/quill/quillEditorSelf'
export default {
  props: {
  	content: {
  	  type: String,
  	  default: ''
  	}
  },
  components: { quillEditorSelf },
  data () {
  	return {
      dcontent: this.content
    }
  },
  watch: {
    content (val) {
      this.dcontent = val
    }
  },
  methods: {
    getcon (val) {
      this.$emit('getcon',val)
    }
  }
}
</script>