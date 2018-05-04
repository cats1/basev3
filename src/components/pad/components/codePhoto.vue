<template>
	<el-dialog
	  :title="$t('notice.vpaper.codeWinTitle')"
	  :visible.sync="dialogVisible"
	  width="40%" @close="bClose">
	  <el-tabs v-model="activeName" type="card" >
	    <el-tab-pane :label="$t('notice.vpaper.insertLink')" name="link">
	    	<el-input v-model="link" placeholder="请输入二维码链接" @change="getCodeUrl"></el-input>
	    	<el-button class="margintop20" type="primary" @click="saveCode">{{$t('btn.saveBtn')}}</el-button>
	    </el-tab-pane>
	    <el-tab-pane :label="$t('notice.vpaper.uploadPic')" name="upload">
	    	<show-photo class="marginlr20" :ptype="2" :img-src="logoSrc" @deletekit="changeDele"></show-photo>            
            <upload-pic-btn class="margintop20" :imgtype="0" @sendkit="updateQRcode"></upload-pic-btn>
            <p class="margintop20">{{$t('picTips.logotip')}}</p>
	    </el-tab-pane>
	  </el-tabs>
	</el-dialog>
</template>
<script>
import {getCache} from '@/utils/auth'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
import {showPhoto} from '@/components/photo'
export default {
	props: ['isShow'],
	components: { showPhoto,uploadPicBtn },
    data() {
      return {
        dialogVisible: this.isShow,
        activeName: 'link',
        link: '',
        logoSrc: '',
        qrcodeType: parseInt(getCache('qrcodeType'))
      }
    },
    watch: {
      isShow (val) {
      	this.dialogVisible = val
      }
    },
    mounted () {
      this.initSrc()
    },
    methods: {
      bClose () {
      	if (parseInt(getCache('qrcodeSwitch')) === 1) {
      	  this.$emit('upcode',true)
      	} else {
      	  this.$emit('upcode',false)
      	}
      },
      initSrc () {
      	if (this.qrcodeType === 1) {
      	  this.logoSrc = getCache('qrcode')
      	} else {
      	  this.link = getCache('qrcode')
      	}
      },
      changeDele (url){
	    this.logoSrc = ''
	  },
	  getCodeUrl (val) {
        this.link = val
	  },
	  saveCode () {
	  	this.qrcodeType = 2
        this.updateQRcode(this.link)
	  },
      updateQRcode (url) {
	    let nform = {
	  	  	userid: getCache('userid'),
	        qrcode: url,
	        qrcodeSwitch: 1,
	        qrcodeType: parseInt(this.qrcodeType)
	  	  }
	    this.$store.dispatch('updateQRcode',nform).then(res => {
	      let {status} = res
	      if (status === 0) {
	      	this.logoSrc = url
	        this.$message({
	          type: 'success',
	          message: '更新成功'
	        })
	        this.$emit('upcode',true)
	      }
	    })
      }
    }
}
</script>