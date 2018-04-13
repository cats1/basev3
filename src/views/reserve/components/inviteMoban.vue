<template>
	<div class="marginbom20">
    <notice-show >
      <div slot="header" class="clearfix">
        <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.invite.title')" :n-desc="$t('notice.invite.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
        <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
          <el-row class="margintop20 marginbom20">
            <h2>提醒通知</h2>
            <p>点击右侧开关，设置员工接收通知方式</p>
          </el-row>
          <face-and-bus></face-and-bus>
        </div>
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
      isShow: false
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
      document.getElementById('mapface').style.display = 'block'
    }
  }
}
</script>