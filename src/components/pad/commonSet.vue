<template>
  <div >
    <h-title>{{$t('pad.usualSet')}}</h-title>
    <com-logo class="bgwhite"></com-logo>
    <v-sign class="bgwhite"></v-sign>
    <card-paper class="bgwhite"></card-paper>
    <safe class="bgwhite"></safe>
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