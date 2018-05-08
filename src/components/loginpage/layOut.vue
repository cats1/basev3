<template>
  <div >
    <login-nav></login-nav>
    <div class="title-container">
      <template v-if="loginType === 0">
        <h3 class="title">{{this.$t('loginselect[0]')}}</h3>
      </template>
      <template v-else-if="loginType === 1">
        <h3 class="title">{{this.$t('loginselect[1]')}}</h3>
      </template>
      <template v-else-if="loginType === 2">
        <h3 class="title">{{this.$t('loginselect[2]')}}</h3>
      </template>
      <template v-else-if="loginType === 3">
        <h3 class="title">{{this.$t('loginselect[3]')}}</h3>
      </template>
      <template v-else-if="loginType === 4">
        <h3 class="title">{{this.$t('loginselect[4]')}}</h3>
      </template>
	  </div>
    <div class="login-container">      
      <div class="form-container">
        <login-select :ltype="loginType" @sendkit="changeLogin"></login-select>
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
      loginType: 0
    }
  },
  watch: {
  	loginType (val) {}
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
