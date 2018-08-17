<template>
  <div>
  	<el-button type="success" @click="doPhoto">拍照</el-button>
  	<el-dialog
	  title="拍照"
	  :visible.sync="dialogVisible"
	  width="800px"
	  :before-close="handleClose" style="z-index:2002" append-to-body>
	  <take-photo @sendphoto="getPhoto"></take-photo>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="doConfirm">确 定</el-button>
	  </span>
	</el-dialog>
  </div>
</template>
<script>
import takePhoto from './takePhoto'
import {getBasePhpLink} from '@/utils/common'
import $ from 'jquery'
export default {
  components: {takePhoto},
  data () {
  	return {
  	  dialogVisible: false,
  	  photoUrl: ''
  	}
  },
  methods: {
  	doPhoto () {
  	  this.dialogVisible = true
  	},
    getPhoto (url) {
      this.photoUrl = url
    },
    checkUser (url) {
    	let nform = {
            photo: url
          }
        let _self = this
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
                    _self.$emit('updateurl',url)
      				_self.dialogVisible = false
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
    },
    doConfirm () {
      if (this.photoUrl !== '') {
      	this.checkUser(this.photoUrl)
      } else {
      	this.$message({
      	  showClose: true,
      	  message: this.$t('form.photo.tip'),
      	  type: 'error'
      	})
      }
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>