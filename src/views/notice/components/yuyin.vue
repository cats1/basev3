<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.yuyin.title')" :n-desc="$t('notice.yuyin.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
	</div>
</template>
<script>
import oneNotice from '@/components/notice/oneNotice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { oneNotice },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('ivrNotify')),
      imgSrc: require('@/assets/img/telephone.png')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        ivrNotify: this.switchOn
      }
      this.$store.dispatch('ivrNotifyConf', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateWeixin()
    }
  }
}
</script>