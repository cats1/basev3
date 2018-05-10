<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.dd.title')" :n-desc="$t('notice.dd.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
      <p class="tiplink"><a href="emplist.html#/exportset">{{$t('notice.dd.tip')}}</a></p>	
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
  	  switchOn: numberToBoolean(getCache('ddnotify')),
      imgSrc: require('@/assets/img/ddv1.png'),
      ddautosync: getCache('ddautosync'),
      ddcorpid: getCache('ddcorpid'),
      ddcorpsecret: getCache('ddcorpsecret'),
      ddagentid: getCache('ddagentid')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        ddnotify: this.switchOn,
        ddautosync:this.ddautosync,
        ddcorpid: this.ddcorpid,
        ddcorpsecret: this.ddcorpsecret,
        ddagentid: this.ddagentid
      }
      this.$store.dispatch('updateDDNotify', newForm).then(res => {
        let { status } = res
        if (status !== 0) {
          this.switchOn = newForm.ddnotify === 1 ? false : true
        }
      })
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.updateWeixin()
    }
  }
}
</script>