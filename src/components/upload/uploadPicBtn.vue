<template>
	<div>
		<el-upload
		  class="upload-demo"
		  action="123"
		  :before-upload="beforeUpload"
		  list-type="picture">
		  <el-button type="success">{{$t('btn.picBtn')}}</el-button>
		</el-upload>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {uploadCommon} from '@/utils/upload'
export default {
   name: 'uploadPicBtn',
   props: ['ctype'],
   data() {
      return {
        fileList2: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      beforeUpload (file) {
      	let _self = this
        uploadCommon(file,function(result){
        	console.log(result.url)
        	_self.$emit('sendkit',result.url)
        })
      }
    }
}
</script>