<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <el-radio-group v-model="radio2">
              <el-radio :label="0">默认配置 （默认配置将由系统exchange账号发送通知）</el-radio>
              <el-radio :label="1">smtp</el-radio>
              <el-radio :label="2">Exchange</el-radio>
            </el-radio-group>
          </div>
        </div>        
    </notice-show>
      		
	</div>
</template>
<script>
import {oneNotice,noticeShow} from '@/components/notice'
import {getCache,setCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: ['switchoff'],
  components: { oneNotice,noticeShow },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('msgNotify')),
      imgSrc: require('@/assets/img/mailv1.png'),
      radio2: 0,
      isShow: false
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