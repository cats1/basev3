<template>
  <div >
    <h-title>{{$t('pad.padSet')}}</h-title>
    <once-again class="bgwhite"></once-again>
    <sign-out-switch class="bgwhite"></sign-out-switch>
    <team-set class="bgwhite"></team-set>
    <slide-pic class="bgwhite"></slide-pic>
    <com-color class="bgwhite"></com-color>
    <inner-photo class="bgwhite"></inner-photo>
    <face-in class="bgwhite"></face-in>
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