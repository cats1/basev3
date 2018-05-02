<template>
	<div class="marginbom20">
    <notice-show >
      <div slot="header" class="clearfix">
        <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.invite.title')" :n-desc="$t('notice.invite.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
        <el-collapse-transition>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <one-notice :is-box="false" :is-no-padding="false" n-icon="" :n-title="$t('notice.invite.empTitle')" :n-desc="$t('notice.invite.empDesc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
            <face-and-bus class="paddinglr30" style="padding-left:100px" v-show="isShow" :isshow="isShow"></face-and-bus>
          </div>
        </el-collapse-transition>
      </div>
    </notice-show>	
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import faceAndBus from '@/components/moban/faceAndBus'
export default {
  components: { oneNotice, noticeShow, faceAndBus },
  data () {
  	return {
      imgSrc: require('@/assets/img/webchatv1.png'),
      isShow: false,
      switchOn: numberToBoolean(getCache('tempEditSwitch'))
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    },
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        tempEditSwitch: this.switchOn
      }
      this.$store.dispatch('updateTempEditSwitch', newForm)
    }
  }
}
</script>