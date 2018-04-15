<template>
  <div >
    <h-title>PC设置</h-title>
    <door-set></door-set>
    <work-time></work-time>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import hTitle from '@/components/headnav/hTitle'
import {doorSet,workTime} from './components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { hTitle,doorSet,workTime }
}
</script>
<style>
</style>