<template>
  <div class="dashboard-container">
    <supernav ></supernav>
    <div class="page-container">
      <page-center></page-center>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import supernav from '@/components/headnav/supernav'
import PageCenter from '@/components/pagecontainer/PageCenter'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { supernav, footbom, PageCenter }
}
</script>
<style>
</style>
