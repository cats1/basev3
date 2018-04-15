<template>
  <div>
    <quill-editor v-model="dContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange">

    </quill-editor>
  </div>
</template>
<script>
export default {
  props: {
  	content: {
  	  type: String,
  	  default: ''
  	}
  },
  data () {
  	return {
  	  dContent: this.content,
  	  editorOption: {}
  	}
  },
  methods: {
  	onEditorBlur () {},
  	onEditorFocus () {},
    onEditorChange () {
      console.log(this.dContent)
      this.$emit('getcon',this.dContent)
    }
  }
}
</script>
<style lang="scss" scoped>
.quill-editor {
 height: 345px;
 .ql-container {
 height: 280px;
 }
}
 
.limit {
 height: 30px;
 border: 1px solid #ccc;
 line-height: 30px;
 text-align: right;
 
 span {
 color: #ee2a7b;
 }
}
 
.ql-snow .ql-editor img {
 max-width: 380px;
}
 
.ql-editor .ql-video {
 max-width: 380px;
}
</style>