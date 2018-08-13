<template>
	<div>
    <form class="uploadformwrap" :id="formId">
      <input class="uploadinput" type="file" name="uploadpic" :ref="inputId" :id="inputId" @change="getFile"></input>
      <div class="avatar-uploader">
        <div tabindex="0" class="el-upload el-upload--text">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else :src="defaulPhoto" class="el-icon-plus avatar-uploader-icon" alt="">
        </div>
      </div>
    </form>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {uploadCommon} from '@/utils/upload'
import $ from 'jquery'
export default {
    props: {
      photourl: '',
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
      }
    },
    data() {
      return {
        imageUrl: this.photourl || '',
        defaulPhoto: require('@/assets/img/photo.png'),
        formId: 'uploadform_' + this.id,
        inputId: 'uploadinput_' + this.id,
        empWorkNoCheck: process.env.empWorkNoCheck,
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
      getFile (file) {
        let files = this.$refs[this.inputId].files[0]
        let _self = this
        uploadCommon(files,function(result){
          console.log(result)
          let nform = {
            photo:result.url
          }
          /*$.post("http://www.coolvisit.top/wechat/shjh/Youtu/detectfaceByUrl.php",{photo:result.url},function(data){
            console.log(data)
          });*/
          if (_self.empWorkNoCheck) {
            $.ajax({
              url: 'http://www.coolvisit.top/wechat/shjh/Youtu/detectfaceByUrl.php',
              contentType: 'application/json',
              data: JSON.stringify(nform),
              type: 'post',
              timeout: 10000,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              success: function (data, textStatus, jqXHR) {
                if (data.errorcode == 0 && data.errormsg == 'OK') {
                  if (data.face.length > 0) {
                    _self.imageUrl = result.url
                    _self.$emit('sendkit',result.url)
                    _self.$store.dispatch('Compressface',nform)
                  } else {
                    _self.$message({
                      showClose: true,
                      message: '请上传头像',
                      type: 'error'
                    })
                  }
                } else {
                  _self.$message({
                    showClose: true,
                    message: '人脸识别失败',
                    type: 'error'
                  })
                }
              }
            })
          } else {
            _self.imageUrl = result.url
            _self.$emit('sendkit',result.url)
            _self.$store.dispatch('Compressface',nform)
          }
          
          /*_self.imageUrl = result.url
          _self.$emit('sendkit',result.url)
          let nform = {
            photoUrl: result.url
          }
          _self.$store.dispatch('Compressface',nform)*/
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