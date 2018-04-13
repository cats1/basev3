<template>
  <div class="clearfix block">
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
  }
}
</script>