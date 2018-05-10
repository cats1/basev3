<template>
  <div class="dashboard-container">
    <order style="margin-top:20px;"></order>
    <invite-moban></invite-moban>
    <stage-time></stage-time>
    <code-time></code-time>
    <code-sign></code-sign>
    <approve-set></approve-set>
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
