<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.stagetime.title')" :n-desc="$t('notice.stagetime.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <set-stage-time></set-stage-time>
          </div>
        </div>        
      </notice-show>		
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import setStageTime from '@/components/codeTime/setStageTime'
export default {
  components: { noticeShow, oneNotice, setStageTime },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('permissionSwitch')),
      imgSrc: require('@/assets/img/webchatv1.png'),
      isShow: false
  	}
  },
  methods: {
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        permissionSwitch: this.switchOn
      }
      this.$store.dispatch('updatePermissionSwitch', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    },
    showDown () {
      this.isShow = !this.isShow
    }
  }
}
</script>