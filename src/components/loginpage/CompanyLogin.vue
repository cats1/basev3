<template>
  <el-form class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-row>
      <el-form-item prop="email">
          <span class="svg-container svg-container_login">
            <i class="fa fa-user"></i>
          </span>
         <el-input name="email" type="text" v-model="loginForm.email" auto-complete="on" :placeholder="$t('form.email.text')" />
      </el-form-item>
      <el-form-item prop="password">
          <span class="svg-container">
            <i class="fa fa-lock fa-lg"></i>
          </span>
          <el-input :type="passwordType" autocomplete="off" v-model="loginForm.password" :placeholder="$t('login.password')"></el-input>
         <span class="show-pwd" >
            <i class="fa fa-eye" v-if="passwordType === ''" @click="showPwd"></i>
            <i class="fa fa-eye-slash" v-else @click="showPwd"></i>
         </span>
       </el-form-item>
       <el-form-item prop="vcode">
        <el-col :span="12">
          <el-input name="code" type="text" v-model="loginForm.vcode" auto-complete="on" :placeholder="$t('smsCode')" />
        </el-col>
        <el-col :span="12" class="codewrap">
          <img-code :get-show="getCode" @clickit="setCode"></img-code>
        </el-col>
       </el-form-item>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('login.logIn')}}</el-button>
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
      if (!isvalidEmail(value)) {
        callback(new Error(this.$t('validEmail.tip1')))
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
        email: '',
        password: '',
        digest: '',
        vcode: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: isvalidSuperAccount }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        vcode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      vcode: '',
      getCode: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    setCode (result) {
      this.loginForm.digest = result.digest
    },
    doLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let codeData = {
            'email': this.loginForm.email,
            'phone': '',
            'digest': this.loginForm.digest,
            'vcode': this.loginForm.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
            if (res.status == 0) {
              this.loading = true
              let newForm = {
                email: this.loginForm.email,
                password: lftPwdRule(this.loginForm.password,3,5),
                digest: this.loginForm.digest
              }
              this.$store.dispatch('subAccountLogin', newForm).then((resp) => {
                  this.loading = false
                  //window.location.href = 'company.html'
              }).catch(() => {
                this.loading = false
              })
            }  else if (res.status === 119) {
              this.getCode = true
              this.loginForm.vcode = ''
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