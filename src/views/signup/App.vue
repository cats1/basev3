<template>
  <div id="app">
  	<div class="login-container signup-container">      
      <div class="form-container">
        <default-signup></default-signup>
      </div>           
  	</div>
  </div>
</template>

<script>
import { defaultSignup } from './components'
export default {
  components: { defaultSignup },
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
