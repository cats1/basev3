<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.weixin.title')" :n-desc="$t('notice.weixin.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('msgNotify')),
      imgSrc: require('@/assets/img/webchatv1.png')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        msgNotify: this.switchOn
      }
      this.$store.dispatch('UpdateWxConf', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateWeixin()
    }
  },
  created () {},
  mounted () {}
}
</script>