<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <h3>{{$t('notice.email.ptitle')}}</h3>
            <el-radio-group v-model="radio2">
              <el-radio class="block" :label="0">{{$t('notice.email.defaults')}} ({{$t('notice.email.ddesc')}})</el-radio>
              <el-radio class="block" :label="1">smtp</el-radio>
              <el-radio class="block" :label="2">Exchange</el-radio>
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
            message: this.$t('notice.email.tips'),
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
      this.isShow = value
      this.switchOn = booleanToNumber(value)
      this.updateWeixin()
    }
  },
  created () {},
  mounted () {}
}
</script>