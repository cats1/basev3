<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <lay-out></lay-out>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
import {getCache} from '@/utils/auth'
import { layOut } from '@/components/pad'
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
