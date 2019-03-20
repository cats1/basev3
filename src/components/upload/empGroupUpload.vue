<template>
  <form class="uploadformwrap" :id="formId">
    <input class="uploadinput" type="file" name="uploadpic" :ref="inputId" :id="inputId" @change="getFile"></input>
    <el-button style="width:100%;" :type="btype"><i class="fa fa-cloud-upload"></i>{{$t('btn.uploadExcel')}}</el-button>
  </form>
</template>
<script>
import {getCache} from '@/utils/auth'
import {NewUploadAB,UploadAB} from '@/utils/upload'
export default {
   name: 'empGroupUpload',
   props: {
    id: {
      type: String,
      default: 'upload-form'
    },
    imgsrc: {
      type: String,
      default: ''
    },
    ctype: {
      type: Number,
      default: 0
    },
    eType: {
      type: String,
      default: 'default'
    }
   },
   data() {
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
        if (parseInt(getCache('subAccount')) === 1) {
          UploadAB(files,function(result){
            _self.$refs[_self.inputId].value = ''
            _self.$message({
              message: _self.$t('uploadFileSuccess'),
              type: 'success'
            })
            _self.$emit('sendkit',result)
          })
        } else {
          NewUploadAB(files,function(result){
            _self.$refs[_self.inputId].value = ''
            _self.$message({
              message: _self.$t('uploadFileSuccess'),
              type: 'success'
            })
            _self.$emit('sendkit',result)
          })
        }
        
      }
    }
}
</script>
<style lang="scss" scoped>
.uploadcomwrap{
  display:inline-block;
}
</style>