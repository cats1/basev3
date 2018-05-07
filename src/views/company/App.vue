<template>
  <div >
    <lay-out></lay-out>
  </div>
</template>
<script>
import layOut from '@/components/company/layOut'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { layOut },
  created () {
    console.log(this.$route.name)
  }
}
</script>
<style>
</style>
