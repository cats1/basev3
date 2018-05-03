<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.facein.title')" :n-desc="$t('notice.facein.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('faceScaner')),
      imgSrc: require('@/assets/img/facein.png')
  	}
  },
  methods: {
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        faceScaner: this.switchOn
      }
      this.$store.dispatch('updateFaceScaner', newForm)
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    }
  }
}
</script>