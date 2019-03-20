<template>
  <div class="dashboard-container">
    <order class="bgwhite" style="margin-top:20px;"></order>
    <invite-moban class="bgwhite"></invite-moban>
    <stage-time class="bgwhite"></stage-time>
    <template v-if="!pcSetWorkTime">
      <stage-signout class="bgwhite"></stage-signout>    
      <work-time class="bgwhite"></work-time>
      <template v-if="visitTimeShow">
        <visit-time class="bgwhite"></visit-time>
      </template>      
    </template>
    <template v-if="stageOffTimeShow">
      <stage-signout class="bgwhite"></stage-signout>
    </template>
    <code-time class="bgwhite"></code-time>
    <code-sign class="bgwhite"></code-sign>
    <approve-set class="bgwhite"></approve-set>
    <template v-show="calendarShow">
      <set-calendar class="bgwhite"></set-calendar>
    </template>
  </div>
</template>
<script>
import {order,codeTime,inviteMoban,codeSign,stageSignout,stageTime,approveSet,setCalendar} from './components'
import {workTime,visitTime} from '@/components/pad/components'
export default {
  name: 'App',
  data () {
    return {
      pcSetWorkTime: process.env.pcSetWorkTime || false,
      calendarShow: process.env.calendarShow || false,
      stageOffTimeShow: process.env.stageOffTimeShow || false,
      visitTimeShow: process.env.visitTimeShow || false
    }
  },
  components: { order, codeTime, codeSign, stageSignout, stageTime, inviteMoban,approveSet,setCalendar,workTime,visitTime}
}
</script>
<style>
</style>
