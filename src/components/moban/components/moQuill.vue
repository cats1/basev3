<template>
  <div class="clearfix block">
  	<vue-quill-editor :content="dcontent" @getcon="getcon"></vue-quill-editor>
  </div>
</template>
<script>
import vueQuillEditor from '@/components/quill/quillEditor'
export default {
  props: {
  	content: {
  	  type: String,
  	  default: ''
  	}
  },
  components: { vueQuillEditor },
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