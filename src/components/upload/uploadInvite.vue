<template>
	<div class="uploadcomwrap">
		<el-upload
		  class="upload-demo"
		  action="123"
		  :before-upload="beforeUpload">
		  <el-button type="success">{{$t('btn.uploadExcel')}}</el-button>
		</el-upload>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {UploadApponintment} from '@/utils/upload'
export default {
   name: 'uploadPicBtn',
   props: ['ctype'],
   data() {
      return {}
    },
    methods: {
      beforeUpload (file) {
      	let _self = this
        UploadApponintment(file,function(result){
          _self.$message({
            message: '文件上传成功',
            type: 'success'
          })
        	_self.$emit('sendkit',result)
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.uploadcomwrap{
  display:inline-block;
}
</style>