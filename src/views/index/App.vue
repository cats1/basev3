<template>
  <div class="dashboard-container">
    <headnav active-index="index"></headnav>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '../../components/headnav/headnav'
import footbom from '../../components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom }
}
</script>
<style>
</style>
