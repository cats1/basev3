<template>
  <div class="dashboard-container">
      <el-row class="margintop20 marginbom20">
        <h2>{{$t('notice.tip.title')}}</h2>
        <p>{{$t('notice.tip.desc')}}</p>
      </el-row>
      <weixin ></weixin>
      <email ></email>
      <sms-notice></sms-notice>
      <yuyin></yuyin>
      <dd-notice></dd-notice>
      <rtx></rtx>
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
