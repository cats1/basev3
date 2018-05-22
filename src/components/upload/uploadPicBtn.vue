<template>
	<div>
    <self-upload-pic :cwidth="cwidth" :cheight="cheight" id="logoform" e-type="success" @geturl="getUrl"></self-upload-pic>
		<!-- <el-upload
		  class="upload-demo"
		  action="123"
		  :before-upload="beforeUpload"
		  list-type="picture">
		  <el-button type="success">{{$t('btn.picBtn')}}</el-button>
		</el-upload> -->
	</div>
</template>
<script>
import selfUploadPic from './selfUploadPic'
import {getCache} from '@/utils/auth'
import {uploadCommon} from '@/utils/upload'
export default {
   name: 'uploadPicBtn',
   props: ['ctype','cwidth','cheight'],
   components: {selfUploadPic},
   data() {
      return {
        fileList2: []
      }
    },
    methods: {
      getUrl (url) {
        this.$emit('sendkit',url)
      },
      beforeUpload (file) {
      	let _self = this
        uploadCommon(file,function(result){
        	_self.$emit('sendkit',result.url)
        })
      }
    }
}
</script>