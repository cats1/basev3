<template>
  <div >
    <h-title>{{$t('pad.padSet')}}</h-title>
    <once-again></once-again>
    <sign-out-switch></sign-out-switch>
    <team-set></team-set>
    <slide-pic></slide-pic>
    <com-color></com-color>
    <inner-photo></inner-photo>
    <face-in></face-in>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import hTitle from '@/components/headnav/hTitle'
import {onceAgain,signOutSwitch,faceIn,comColor,innerPhoto,slidePic,teamSet} from './components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { hTitle,onceAgain,signOutSwitch,innerPhoto,faceIn,comColor,slidePic,teamSet }
}
</script>
<style>
</style>