<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.vpaper.title')" :n-desc="$t('notice.vpaper.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <set-code-time></set-code-time>
          </div>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import setCodeTime from '@/components/codeTime/setCodeTime'
export default {
  components: { noticeShow, oneNotice, setCodeTime },
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