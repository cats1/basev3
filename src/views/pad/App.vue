<template>
  <div class="dashboard-container">
    <headnav active-index="notice"></headnav>
    <div class="page-container">
      <common-set></common-set>
      <pad-set></pad-set>
      <pc-set></pc-set>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import {getCache} from '@/utils/auth'
import { commonSet, padSet, pcSet } from '@/components/pad'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, commonSet, padSet, pcSet }
}
</script>
<style>
</style>
