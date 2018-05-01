<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <lay-out></lay-out>
    </div>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import layOut from '@/components/reserve/layOut.vue'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, layOut}
}
</script>
<style>
</style>
