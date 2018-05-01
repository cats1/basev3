<template>
  <div class="quillwrap">
    <quill-editor v-model="dContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange">
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
        <span class="ql-formats">
          <select class="ql-font">
            <option selected="selected"></option>
            <option value="serif"></option>
            <option value="SimSun"></option>
            <option value="KaiTi"></option>
            <option value="FangSong"></option>
            <option value="Arial"></option>
            <option value="Microsoft-YaHei"></option>
            <option value="SimHei"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
     <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
          </select>
        </span>
        <span class="ql-formats">
                <select class="ql-align">
                <option selected="selected"></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
        </span>
        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
        <span class="ql-formats">
          <button type="button" class="ql-clean"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-link"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-video"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-image"></button>
        </span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
        <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>
        <!-- <span class="ql-formats"> <button type="button" class="ql-bg" value="" @click="doSetHead">hhhh</button></span> -->
        
      </div>
    </quill-editor>
  </div>
</template>
<script>
import * as Quill from 'quill'
const fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif']    
const Font = Quill.import('formats/font')    
Font.whitelist = fonts //将字体加入到白名单   
Quill.register(Font, true)
import {replaceRemoveQuotation} from '@/utils/common'
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
  	  editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      }
  	}
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    content (val) {
      console.log(replaceRemoveQuotation(val))
      this.dContent = replaceRemoveQuotation(val)
    }
  },
  methods: {
  	onEditorBlur () {},
  	onEditorFocus () {},
    onEditorChange () {
      this.$emit('getcon',this.dContent)
    },
    doSetHead (val) {
      let index = this.editor.getSelection().index
      let length = this.editor.getSelection().length
      let content = this.editor.getText(index,length)
      console.log(this.editor.getText(index,length))
      //this.editor.setText('fff',this.editor.getSelection())
      this.editor.deleteText(index,length)
      let html = '<p><strong>'+content+'</strong></p>'
      this.editor.insertEmbed(index,html)
    }
  }
}
</script>
<style lang="scss" scoped>
.quillwrap{
  padding-bottom:80px;
}
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