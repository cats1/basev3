<template>
  <div class="dashboard-container">
   <headnav :active-index="activeIndex"></headnav>
    <div class="page-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {
      activeIndex: 'index'
    }
  },
  components: { headnav, footbom },
  created () {
    console.log(this.$route)
  },
  mounted () {
    console.log(this.$route.name)
  }
}
</script>
<style>
</style>
