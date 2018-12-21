<template>
	<div class="marginbom20">
    <one-notice :n-icon="imgSrc" :n-title="$t('notice.order.title')" :n-desc="$t('notice.order.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('permissionSwitch')),
      imgSrc: require('@/assets/img/order.png')
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
    }
  }
}
</script>