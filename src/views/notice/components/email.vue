<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>		
	</div>
</template>
<script>
import oneNotice from '@/components/notice/oneNotice'
import {getCache,setCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: ['switchoff'],
  components: { oneNotice },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('msgNotify')),
      imgSrc: require('@/assets/img/mailv1.png')
  	}
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        msgNotify: this.switchOn
      }
      this.$store.dispatch('UpdateWxConf', newForm).then(res => {
        let { status, reason } = res
        if (status === 0) {
          this.$message({
            message: '微信开关修改成功',
            type: 'success'
          })
          setCache('msgNotify',this.switchOn)
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