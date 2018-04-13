<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <order style="margin-top:20px;"></order>
      <invite-moban></invite-moban>
      <stage-time></stage-time>
      <code-time></code-time>
      <code-sign></code-sign>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '../../components/headnav/headnav'
import footbom from '../../components/footer/footbom'
import {order,codeTime,inviteMoban,codeSign,stageTime} from './components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, order, codeTime, codeSign, stageTime, inviteMoban}
}
</script>
<style>
</style>
