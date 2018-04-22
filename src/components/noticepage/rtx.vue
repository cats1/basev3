<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.rtx.title')" :n-desc="$t('notice.rtx.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
      <p class="tiplink">{{$t('notice.rtx.tip')}}</p>	
	</div>
</template>
<script>
import oneNotice from '@/components/notice/oneNotice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: ['switchoff'],
  components: { oneNotice },
  data () {
  	return {
  	  switchOn: false,
      imgSrc: require('@/assets/img/rtxv1.png'),
      rtxIp: '',
      rtxPort: ''
  	}
  },
  methods: {
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        rtxIp: this.rtxIp,
        rtxPort:this.rtxPort
      }
      this.$store.dispatch('updateRtxConf', newForm).then(res => {
        let { status } = res
        if (status !== 0) {
          //this.switchOn = newForm.ddnotify === 1 ? false : true
        }
      })
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateSetting()
    }
  },
  created () {
    if(getCache('rtxip') && getCache('rtxport')) {
      this.switchOn = true
    }
  }
}
</script>