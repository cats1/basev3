<template>
  <div id="app">
    <reg-nav></reg-nav>
  	<div class="login-container signup-container">      
      <div class="form-container">
        <sign-one></sign-one>
      </div>           
  	</div>
  </div>
</template>
<script>
import regNav from '@/components/headnav/regnav'
import { signOne } from './components'
export default {
  components: { signOne,regNav },
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
