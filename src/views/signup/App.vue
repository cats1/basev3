<template>
  <div id="app">
  	<div class="login-container signup-container">      
      <div class="form-container">
        <sign-one></sign-one>
      </div>           
  	</div>
  </div>
</template>

<script>
import { signOne } from './components'
export default {
  components: { signOne },
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
