<template>
  <div class="dashboard-container">
    <order class="bgwhite" style="margin-top:20px;"></order>
    <invite-moban class="bgwhite"></invite-moban>
    <stage-time class="bgwhite"></stage-time>
    <stage-signout class="bgwhite"></stage-signout>    
    <work-time class="bgwhite"></work-time>
    <visit-time class="bgwhite"></visit-time>
    <code-time class="bgwhite"></code-time>
    <code-sign class="bgwhite"></code-sign>
    <approve-set class="bgwhite"></approve-set>
    <set-calendar class="bgwhite"></set-calendar>
  </div>
</template>
<script>
import {order,codeTime,inviteMoban,codeSign,stageSignout,stageTime,approveSet,setCalendar} from './components'
import {workTime,visitTime} from '@/components/pad/components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { order, codeTime, codeSign, stageSignout, stageTime, inviteMoban,approveSet,setCalendar,workTime,visitTime}
}
</script>
<style>
</style>
