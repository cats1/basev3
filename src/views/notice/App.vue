<template>
  <div class="dashboard-container">
    <headnav active-index="notice"></headnav>
    <div class="page-container">
      <el-row class="margintop20 marginbom20">
        <h2>提醒通知</h2>
        <p>点击右侧开关，设置员工接收通知方式</p>
      </el-row>
      <weixin ></weixin>
      <email ></email>
      <sms-notice></sms-notice>
      <yuyin></yuyin>
      <dd-notice></dd-notice>
      <rtx></rtx>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '../../components/headnav/headnav'
import footbom from '../../components/footer/footbom'
import {weixin,email,smsNotice,yuyin,ddNotice,rtx} from '@/components/noticepage'
import {getCache} from '@/utils/auth'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, weixin, email, smsNotice, yuyin, ddNotice, rtx }
}
</script>
<style>
</style>
