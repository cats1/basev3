<template>
  <div class="dashboard-container">
    <empnav ></empnav>
    <div class="page-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import empnav from '@/components/headnav/empnav'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { empnav, footbom }
}
</script>
<style>
</style>
