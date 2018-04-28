<template>
	<div>
		<el-upload
		  class="avatar-uploader"
		  action="1"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
		  <img v-else :src="defaulPhoto" class="el-icon-plus avatar-uploader-icon" alt="">
		</el-upload>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {uploadCommon} from '@/utils/upload'
export default {
	props: ['photourl'],
    data() {
      return {
        imageUrl: this.photourl || '',
        defaulPhoto: require('@/assets/img/photo.png')
      }
    },
    watch: {
      photourl (val,old) {
      	this.imageUrl = val
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        let _self = this
        uploadCommon(file,function(result){
        	_self.imageUrl = result.url
        	_self.$emit('sendkit',result.url)
        	let nform = {
        	  photoUrl: result.url
        	}
        	_self.$store.dispatch('Compressface',nform)
        })
      }
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 110px;
    height: 110px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    height: auto;
    margin-top:20px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>