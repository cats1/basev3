<template>
  <div class="">
    <black-notice></black-notice>
    <black-body></black-body>
  </div>
</template>
<script>
import {blackNotice,blackBody} from '@/components/black'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { blackNotice,blackBody}
}
</script>
<style>
</style>
