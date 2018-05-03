<template>
  <div >
    <h-title>{{$t('pad.usualSet')}}</h-title>
    <com-logo></com-logo>
    <v-sign></v-sign>
    <card-paper></card-paper>
    <safe></safe>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import hTitle from '@/components/headnav/hTitle'
import {safe,vSign,cardPaper,comLogo} from './components'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { hTitle,safe,vSign,cardPaper,comLogo }
}
</script>
<style>
</style>