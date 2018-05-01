<template>
  <div class="dashboard-container">
    <headnav active-index="emp"></headnav>
    <account-show></account-show>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import accountShow from '@/components/account/accountShow'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, accountShow }
}
</script>
<style>
</style>
