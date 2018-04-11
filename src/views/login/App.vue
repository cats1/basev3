<template>
  <div id="app">
  	<div class="login-container">      
      <div class="form-container">
        <login-select :ltype="loginType" @clickit="changeLogin"></login-select>
        <template v-if="loginType === 0">
          <manger-login></manger-login>
        </template>
        <template v-else-if="loginType === 1">
          <super-login></super-login>
        </template>
        <template v-else-if="loginType === 2">
          <company-login></company-login>
        </template>
        <template v-else-if="loginType === 3">
          <emp-login></emp-login>
        </template>
        <template v-else>
          <stage-login></stage-login>
        </template>
      </div>           
  	</div>
  </div>
</template>

<script>
import { ImgCode, MangerLogin, SuperLogin, CompanyLogin, EmpLogin, StageLogin, LoginSelect } from './components'
export default {
  components: { ImgCode, MangerLogin, SuperLogin, CompanyLogin, EmpLogin, StageLogin, LoginSelect },
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
