<template>
  <div class="clearfix block">
    <h3 class="marginbom20">停车信息及周边交通</h3>
  	<vue-quill-editor :content="content"></vue-quill-editor>
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
  	return {}
  },
  mounted () {
    console.log(this.content)
  }
}
</script>