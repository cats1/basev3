<template>
  <div >
    <h-title>{{$t('pcSetting')}}</h-title>
    <door-set class="bgwhite"></door-set>
    <work-time class="bgwhite"></work-time>
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