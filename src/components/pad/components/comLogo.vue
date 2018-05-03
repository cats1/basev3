<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.clogo.title')" :n-desc="$t('notice.clogo.desc')" ></one-notice>
          <div class="showbody marginlr20 paddingtb20 paddingl80 block" >
            <show-photo class="marginlr20" :img-src="logoSrc" @deletekit="changeDele"></show-photo>
            <p>{{$t('picTips.logotip')}}</p>
            <upload-pic-btn class="margintop20" :imgtype="0" @sendkit="getLogoSrc"></upload-pic-btn>
          </div>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
import {showPhoto} from '@/components/photo'
export default {
  components: { noticeShow, oneNotice,uploadPicBtn,showPhoto },
  data () {
  	return {
      imgSrc: require('@/assets/img/clogo.png'),
      logoSrc: getCache('logo')
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    changeDele (url){
      this.logoSrc = ''
      this.getLogoSrc('')
    },
    getLogoSrc (url) {
      let nForm = {
        userid: getCache('userid'),
        logoUrl: url,
      }
      this.$store.dispatch('UpdateLogo',nForm).then(res => {
        let {status} = res
        if (status === 0) {
          this.logoSrc = url
        }
      })
    }
  }
}
</script>