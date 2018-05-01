<template>
  <div class="dashboard-container">
    <supernav active-index="index"></supernav>
    <page-center></page-center>
    <footbom></footbom>
  </div>
</template>
<script>
import supernav from '../../components/headnav/supernav'
import PageCenter from '../../components/pagecontainer/PageCenter'
import footbom from '../../components/footer/footbom'
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
