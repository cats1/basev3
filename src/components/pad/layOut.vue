<template>
  <div>
  	<common-set></common-set>
    <pad-set></pad-set>
    <template v-if="pcSet">
      <pc-set></pc-set>
    </template>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import { commonSet, padSet, pcSet } from '@/components/pad'
export default {
  name: 'App',
  data () {
    return {
      pcSet: process.env.pcSet || false
    }
  },
  components: { commonSet, padSet, pcSet }
}
</script>
<style>
</style>