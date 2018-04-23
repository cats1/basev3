<template>
	<el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      	<el-row>
  		<div class="title-container">
	       <h3 class="title">{{$t('login.title')}}</h3>
	       <!-- <lang-select class="set-language"></lang-select> -->
	    </div>
	    <el-form-item prop="email">
	        <span class="svg-container svg-container_login">
	          <svg-icon icon-class="user" />
	        </span>
	       <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="email" />
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
	     <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('login.logIn')}}</el-button>
       <el-button type="text" style="width:100%;" @click.native.prevent="goForgot">{{$t('login.forgot.title')}}</el-button>
       <or-line :value="$t('login.or')"></or-line>
       <el-button type="text" style="width:100%;" @click.native.prevent="goSignUp">{{$t('login.signup')}}</el-button>
	     </el-row>
      </el-form>
</template>
<script>
import { isvalidEmail, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
import OrLine from '@/components/or/OrLine'
export default {
  name: 'MangerLogin',
  components: { ImgCode, OrLine },
  data () {
  	const validateEmail = (rule, value, callback) => {
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
        email: 'jsnusun@163.com',
        password: '123456',
        digest: '',
        vcode: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail}],
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
    goForgot () {
      window.location.href = 'forgot.html'
    },
    goSignUp () {
      window.location.href = 'signup.html'
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
          	console.log(res)
          	if (res.status == 0) {
          		this.loading = true
              let newForm = {
                email: this.loginForm.email,
                password: lftPwdRule(this.loginForm.password,3,5),
                digest: this.loginForm.digest
              }
          		this.$store.dispatch('managerLogin', newForm).then((resp) => {
                  this.loading = false
                  console.log(this.$store)
                  window.location.href = 'index.html'
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