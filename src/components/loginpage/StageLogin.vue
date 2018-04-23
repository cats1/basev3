<template>
  <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-row>
      <div class="title-container">
         <h3 class="title">{{$t('stageLogin.title')}}</h3>
         <!-- <lang-select class="set-language"></lang-select> -->
      </div>
      <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
         <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="account" />
      </el-form-item>
      <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
         <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="password" />
         <span class="show-pwd">
            <svg-icon icon-class="eye" />
         </span>
       </el-form-item>
       <el-form-item prop="vcode">
        <el-col :span="12">
          <el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
        </el-col>
        <el-col :span="12" class="codewrap">
          <img-code @clickit="setCode"></img-code>
        </el-col>
       </el-form-item>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('stageLogin.logIn')}}</el-button>
       </el-row>
      </el-form>
</template>
<script>
import { isvalidEmail, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
export default {
  name: 'CompanyLogin',
  components: { ImgCode },
  data () {
    const isvalidSuperAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('validStage.tip1')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t('validPassword.tip2')))
      } else if (!validatePSD(value)) {
        callback(new Error(this.$t('validPassword.tip1')))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('imgcode.tip1')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '3333',
        password: '123456',
        digest: '',
        vcode: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: isvalidSuperAccount }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        vcode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      vcode: ''
    }
  },
  methods: {
    setCode (result) {
      this.loginForm.digest = result.digest
    },
    doLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let codeData = {
            'email': this.loginForm.account,
            'phone': '',
            'digest': this.loginForm.digest,
            'vcode': this.loginForm.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
            if (res.status == 0) {
              this.loading = true
              let newForm = {
                account: this.loginForm.account,
                password: lftPwdRule(this.loginForm.password,3,5),
                digest: this.loginForm.digest
              }
              this.$store.dispatch('LoginManager', newForm).then((resp) => {
                  this.loading = false
                  window.location.href = 'stage.html'
              }).catch(() => {
                this.loading = false
              })
            }
          })          
          return false        
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>