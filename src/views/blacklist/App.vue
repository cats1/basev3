<template>
  <div class="dashboard-container">
    <headnav active-index="notice"></headnav>
    <div class="page-container">
      <black-notice></black-notice>
      <black-body></black-body>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '../../components/headnav/headnav'
import footbom from '../../components/footer/footbom'
import {getCache} from '@/utils/auth'
import {blackNotice,blackBody} from '@/components/black'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, blackNotice,blackBody}
}
</script>
<style>
</style>
