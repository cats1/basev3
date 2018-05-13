<template>
  <div class="dashboard-container">
    <order class="bgwhite" style="margin-top:20px;"></order>
    <invite-moban class="bgwhite"></invite-moban>
    <stage-time class="bgwhite"></stage-time>
    <code-time class="bgwhite"></code-time>
    <code-sign class="bgwhite"></code-sign>
    <approve-set class="bgwhite"></approve-set>
  </div>
</template>
<script>
import {order,codeTime,inviteMoban,codeSign,stageTime,approveSet} from './components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { order, codeTime, codeSign, stageTime, inviteMoban,approveSet}
}
</script>
<style>
</style>
