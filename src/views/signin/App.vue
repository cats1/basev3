<template>
  <div id="app">
    <lay-out></lay-out>
  </div>
</template>
<script>
import 'babel-polyfill'
import { layOut } from '@/components/loginpage'
export default {
  components: { layOut },
  name: 'App',
  data () {
  	return {
      loginType: 0
    }
  },
  methods: {
    changeLogin (type) {
      this.loginType = type
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
