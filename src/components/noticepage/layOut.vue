<template>
  <div class="dashboard-container">
      <el-row class="margintop20 marginbom20">
        <h2>{{$t('notice.tip.title')}}</h2>
        <p>{{$t('notice.tip.desc')}}</p>
      </el-row>
      <weixin class="bgwhite"></weixin>
      <email class="bgwhite"></email>
      <sms-notice class="bgwhite"></sms-notice>
      <yuyin class="bgwhite"></yuyin>
      <dd-notice :link-is-show="false"></dd-notice>
      <rtx :link-is-show="false"></rtx>
  </div>
</template>
<script>
import {weixin,email,smsNotice,yuyin,ddNotice,rtx} from '@/components/noticepage'
import {getCache} from '@/utils/auth'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { weixin, email, smsNotice, yuyin, ddNotice, rtx }
}
</script>
<style>
</style>
