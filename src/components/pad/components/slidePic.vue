<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.pics.title')" :n-desc="$t('notice.pics.desc')" ></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop">
            <upload-pic-group ctype="1"></upload-pic-group>
          </div>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import { uploadPicGroup} from '@/components/upload'
export default {
  components: { noticeShow, oneNotice, uploadPicGroup },
  data () {
  	return {
      imgSrc: require('@/assets/img/webchatv1.png'),
      isShow: false
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    }
  }
}
</script>