<template>
  <div class="dashboard-container">
    <headnav active-index="emp"></headnav>
    <div class="page-container">
      <lay-out></lay-out>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import layOut from '@/components/black/layOut'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, layOut }
}
</script>
<style>
</style>
