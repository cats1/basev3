<template>
  <div class="dashboard-container">
    <stagenav active-index="index"></stagenav>
    <div class="page-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import stagenav from '@/components/headnav/stagenav'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { stagenav, footbom }
}
</script>
<style>
</style>
