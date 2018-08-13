<template>
	<div class="marginbom20">
    <one-notice class="bgwhite" :n-icon="imgSrc" :n-title="$t('notice.black.title')" :n-desc="$t('notice.black.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('blackListSwitch')),
      imgSrc: require('@/assets/img/black.png')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        blackListSwitch: this.switchOn
      }
      this.$store.dispatch('updateblackListSwitch', newForm)
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