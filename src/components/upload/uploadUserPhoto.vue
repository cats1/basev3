<template>
	<div class="formuploadwrap">
    <form class="uploadformwrap" :id="formId">
      <input class="uploadinput" type="file" name="uploadpic" :ref="inputId" :id="inputId" @change="getFile"></input>
      <div class="avatar-uploader">
        <div tabindex="0" class="el-upload el-upload--text">          
          <template v-if="imageUrl">
            <thumb :src="imageUrl" :width="110" :height="110"></thumb>
          </template>
          <template v-else>
            <img :src="defaulPhoto" class="el-icon-plus avatar-uploader-icon" alt="">
          </template>
        </div>
      </div>
    </form>
	</div>
</template>
<script>
import thumb from '@/components/thumb/thumb'
import {getCache} from '@/utils/auth'
import {getBaseLink,getBasePhpLink,getBaseUrl} from '@/utils/common'
import {uploadCommon,UploadBase64CommonChange} from '@/utils/upload'
import {dealImage,photoCompress,convertBase64UrlToBlob} from '@/utils/dealImg'
import $ from 'jquery'
export default {
    components: {thumb},
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
        imgSize: 0.8,
        dealImage: false
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
      doDealImage (url) {
        let _self = this
        // 调用函数处理图片 　　　　　　　　　　　　　　　　
        dealImage(url, {
        // 注意：在pc端可以用绝对路径或相对路径，移动端最好用绝对路径（因为用tphoto后的图片路径，我没有试成功（如果有人试成功了可以分享一下经验））
          width : 200
        }, function(base){
          UploadBase64CommonChange(base,function(data){
            _self.checkFace(data.url)
          })
          //直接将获取到的base64的字符串，放到一个image标签中就可看到测试后的压缩之后的样式图了
          //document.getElementById("transform").src = base;
          //console.log("压缩后：" + base.length / 1024 + " " + base)　　　　
        })
      },
      getFile (file) {
        let files = this.$refs[this.inputId].files[0]
        let _self = this
        if (files.size/1024/1024 > this.imgSize) { ////大于0.8M，进行压缩上传
          this.dealImage = true
          photoCompress(files,{quality: 0.2},function(base64Codes){
            UploadBase64CommonChange(base64Codes,function(result){
              _self.checkFace(result.url)
            })
          })
        } else { ////小于等于0.8M 原图上传
          uploadCommon(files,function(result){      
            _self.checkFace(result.url)
          })
        }
        
      },
      checkFace (url) {
        let _self = this
        let nform = {
          photo: url
        }
          if (_self.empWorkNoCheck) {
            $.ajax({
              url: getBasePhpLink(),
              contentType: 'application/json',
              data: JSON.stringify(nform),
              type: 'post',
              timeout: 10000,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              success: function (data, textStatus, jqXHR) {
                let dataJson = JSON.parse(data)
                if (dataJson.errorcode == 0 && dataJson.errormsg == 'OK') {
                  if (dataJson.face.length > 0) {
                    _self.imageUrl = url
                    _self.$emit('sendkit',url)
                  } else {
                    _self.$message({
                      showClose: true,
                      message: _slef.$t('form.photo.tip'),
                      type: 'error'
                    })
                  }
                } else {
                  _self.$message({
                    showClose: true,
                    message: _slef.$t('faceError'),
                    type: 'error'
                  })
                }
              }
            })
          } else {
            _self.imageUrl = url
            _self.$emit('sendkit',url)
          }
      }
    }
}
</script>
<style>
.formuploadwrap{
  width:112px;
  height: 112px;
  overflow: hidden;
  margin: 0 auto;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    /*overflow: hidden;*/
    width: 112px;
    height: 112px;
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