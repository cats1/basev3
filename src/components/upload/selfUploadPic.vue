<template>
	<form class="uploadformwrap" :id="formId">
		<input class="uploadinput" type="file" name="uploadpic" :ref="inputId" :id="inputId" @change="getFile"></input>
		<el-button style="width:100%;" :type="btype">{{$t('btn.picBtn')}}</el-button>
	</form>
</template>
<script>
import {getBaseUrl} from '@/utils/common'
import {uploadCommon} from '@/utils/upload'
export default {
  props: {
  	id: {
  	  type: String,
  	  default: 'upload-form'
  	},
  	imgsrc: {
  	  type: String,
  	  default: ''
  	},
  	index: {
  	  type: Number,
  	  default: 0
  	},
    eType: {
      type: String,
      default: 'default'
    },
    cwidth: null,
    cheight: null
  },
  data () {
  	return {
  	  src: this.imgsrc,
  	  formId: 'uploadform_' + this.id,
  	  inputId: 'uploadinput_' + this.id,
      btype: this.eType
  	}
  },
  methods: {
    getFile (file) {
      let files = this.$refs[this.inputId].files[0]
      let _self = this
      uploadCommon(files,function(result){
        _self.$refs[_self.inputId].value = ''
      	_self.$emit('geturl',result.url)
      })
    }
  }
}
</script>