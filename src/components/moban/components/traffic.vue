<template>
  <div class="clearfix block">
    <h3 class="marginbom20">停车信息及周边交通</h3>
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
      this.$emit('gettraffic',val)
    }
  },
  mounted () {}
}
</script>