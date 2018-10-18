<template>
  <div class="dashboard-container">
    <!-- <template v-if="!isMobile"> -->
      <empnav></empnav>
    <!-- </template> -->
    <div :class="{'mobile-container': isMobile,'page-container': !isMobile}">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <template v-if="!isMobile">
      <template v-if="!footerEmpClose">
        <footbom></footbom>
      </template>
    </template>
  </div>
</template>
<script>
import empnav from '@/components/headnav/empnav'
import footbom from '@/components/footer/footbom'
import {mobile_device_detect} from '@/utils/common'
export default {
  name: 'App',
  data () {
    return {
      footerEmpClose: process.env.footerEmpClose || false,
      isMobile: false
    }
  },
  components: { empnav, footbom },
  created () {
    let _self = this
    this.isMobile = mobile_device_detect()
    window.onresize = function(){
      _self.isMobile = mobile_device_detect()
    }
  }
}
</script>
<style>
</style>
