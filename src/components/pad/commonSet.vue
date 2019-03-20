<template>
  <div >
    <h-title>{{$t('pad.usualSet')}}</h-title>
    <com-logo class="bgwhite"></com-logo>
    <v-sign class="bgwhite"></v-sign>
    <card-paper class="bgwhite"></card-paper>
    <template v-if="vTypeShow">
      <visit-type class="bgwhite"></visit-type>
    </template>
    <template v-if="tagShow">
      <tag-visit class="bgwhite"></tag-visit>
    </template>
    <safe class="bgwhite"></safe>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import hTitle from '@/components/headnav/hTitle'
import {safe,vSign,cardPaper,comLogo,visitType,tagVisit} from './components'
export default {
  name: 'App',
  data () {
    return {
      vTypeShow: process.env.vTypeShow || false,
      tagShow: process.env.tagShow || false
    }
  },
  components: { hTitle,safe,vSign,cardPaper,comLogo,visitType,tagVisit }
}
</script>
<style>
</style>