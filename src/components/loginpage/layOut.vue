<template>
  <div >
    <login-nav></login-nav>
    <div class="title-container">
	    <h3 class="title">{{title}}</h3>
	</div>
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
import { ImgCode, MangerLogin, SuperLogin, CompanyLogin, EmpLogin, StageLogin, LoginSelect } from '@/components/loginpage'
import loginNav from '@/components/headnav/loginnav'
export default {
  components: { ImgCode, MangerLogin, SuperLogin, CompanyLogin, EmpLogin, StageLogin, LoginSelect,loginNav },
  name: 'App',
  data () {
    return {
      loginType: 0,
      title: this.$t('loginselect[0]')
    }
  },
  watch: {
  	loginType (val) {
      let list = this.$t('loginselect')
      this.title = list[val]
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
