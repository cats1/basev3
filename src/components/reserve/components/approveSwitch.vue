<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('approve.atitle')" :n-desc="$t('approve.adesc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('processSwitch')),
      imgSrc: require('@/assets/img/webchatv1.png')
  	}
  },
  methods: {
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        processSwitch: this.switchOn
      }
      this.$store.dispatch('updateProcessSwitch', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    }
  }
}
</script>