<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.stageouttime.title')" :n-desc="$t('notice.stageouttime.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <set-stage-out-time></set-stage-out-time>
          </div>
        </div>        
      </notice-show>		
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import setStageOutTime from '@/components/codeTime/setStageOutTime'
export default {
  components: { noticeShow, oneNotice, setStageOutTime },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('permissionSwitch')),
      imgSrc: require('@/assets/img/stime.png'),
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