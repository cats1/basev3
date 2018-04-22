<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.sms.title')" :n-desc="$t('notice.sms.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
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
  	  switchOn: numberToBoolean(getCache('smsNotify')),
      imgSrc: require('@/assets/img/webchatv1.png')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        smsNotify: this.switchOn
      }
      this.$store.dispatch('updateSMSConf', newForm).then(res => {
        let { status, reason } = res
        if (status === 0) {
          this.$message({
            message: '短信开关修改成功',
            type: 'success'
          })
          setCache('smsNotify',this.switchOn)
        } else {
          this.$message({
            message: status + ':' + reason,
            type: 'error'
          })
        }
      })
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