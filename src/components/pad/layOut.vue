<template>
  <div>
  	<common-set></common-set>
    <pad-set></pad-set>
    <!-- <pc-set></pc-set> -->
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import { commonSet, padSet, pcSet } from '@/components/pad'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { commonSet, padSet, pcSet }
}
</script>
<style>
</style>