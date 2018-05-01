<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <key-lay></key-lay>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import keyLay from '@/components/key/keyLay'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, keyLay}
}
</script>
<style>
</style>