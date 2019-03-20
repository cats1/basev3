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
      <template v-else-if="loginType === 3 && empLoginShow">
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
        <template v-else-if="loginType === 3 && empLoginShow">
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
import {getBaseStageLink,getBaseEmpPointLink,getParameter,changeURLArg} from '@/utils/common'
export default {
  components: { ImgCode, MangerLogin, SuperLogin, CompanyLogin, EmpLogin, StageLogin, LoginSelect,loginNav },
  name: 'App',
  data () {
    return {
      loginType: 0,
      empLoginShow: process.env.empLogin || false,
      empPointLogin: process.env.empPointLogin || false,
      empPointEpson: process.env.empPointEpson || false
    }
  },
  watch: {
  	loginType (val) {}
  },
  created () {
    this.loginType = parseInt(getParameter('v')) || 0
  },
  methods: {
    changeLogin (type) {
      
      if (type === 4) {
        if (process.env.stageLink) {
          //window.location.href = getBaseStageLink()
          window.open(getBaseStageLink())
        } else {
          this.loginType = type
          if (this.empPointEpson) {
            window.location.href = changeURLArg(window.location.href,'v',this.loginType)
          }
        }
      } else {
        if (this.empPointLogin) {
          window.location.href = getBaseEmpPointLink()
        } else {
          this.loginType = type
          if (this.empPointEpson) {
            window.location.href = changeURLArg(window.location.href,'v',this.loginType)
          }
        }        
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
