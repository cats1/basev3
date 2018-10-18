<template>
  <div class="dashboard-container">
      <el-row class="margintop20 marginbom20">
        <h2>{{$t('notice.tip.title')}}</h2>
        <p>{{$t('notice.tip.desc')}}</p>
      </el-row>
      <weixin class="bgwhite"></weixin>
      <email class="bgwhite"></email>
      <template v-if="smsDetailShow">
        <sms-notice-show class="bgwhite"></sms-notice-show>
      </template>
      <template v-else>
        <sms-notice class="bgwhite"></sms-notice>
      </template>      
      <yuyin class="bgwhite"></yuyin>
      <dd-notice :link-is-show="true"></dd-notice>
      <rtx :link-is-show="true"></rtx>
  </div>
</template>
<script>
import {weixin,email,smsNotice,smsNoticeShow,yuyin,ddNotice,rtx} from '@/components/noticepage'
import {getCache} from '@/utils/auth'
export default {
  name: 'App',
  data () {
    return {
      smsDetailShow: process.env.smsDetailShow || false
    }
  },
  components: { weixin, email, smsNotice, smsNoticeShow, yuyin, ddNotice, rtx }
}
</script>
<style>
</style>
