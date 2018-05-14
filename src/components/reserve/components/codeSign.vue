<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.codesign.title')" :n-desc="$t('notice.codesign.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('scaner')),
      imgSrc: require('@/assets/img/qrcode.png')
  	}
  },
  methods: {
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        scaner: this.switchOn
      }
      this.$store.dispatch('updateScanerSwitch', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    }
  }
}
</script>