<template>
  <div class="dashboard-container">
    <companynav active-index="index"></companynav>
    <div class="page-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import companynav from '@/components/headnav/companynav'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { companynav, footbom },
  created () {
    console.log(this.$route.name)
  }
}
</script>
<style>
</style>
