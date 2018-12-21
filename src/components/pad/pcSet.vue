<template>
  <div >
    <h-title>{{$t('pcSetting')}}</h-title>
    <template v-if="doorGate">
      <door-set class="bgwhite"></door-set>
    </template>
    <template v-if="pcSetWorkTime">
      <work-time class="bgwhite"></work-time>
    </template>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import hTitle from '@/components/headnav/hTitle'
import {doorSet,workTime} from './components'
export default {
  name: 'App',
  data () {
    return {
      doorGate: process.env.doorGate || false,
      pcSetWorkTime: process.env.pcSetWorkTime || false
    }
  },
  components: { hTitle,doorSet,workTime }
}
</script>
<style>
</style>