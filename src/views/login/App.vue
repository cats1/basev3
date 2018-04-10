<template>
  <div id="app">
  	<div class="login-container">
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
	     		<el-input name="code" type="text" v-model="vcode" autoComplete="on" placeholder="code" />
	     	</el-col>
	     	<el-col :span="12">
	     		<img-code @clickit="setCode"></img-code>
	     	</el-col>
	     </el-form-item>
	     <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('login.logIn')}}</el-button>
	     </el-row>
      </el-form>
  	</div>
  </div>
</template>

<script>
import { validateEmail, isvalidUsername } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import { ImgCode } from './components'
export default {
  components: { ImgCode },
  name: 'App',
  data () {
  	const validateEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }
  	const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('The vcode can not be blank'))
      } else {
        callback()
      }
    }
  	return {
  	  loginForm: {
        email: 'test@qq.com',
        password: '1234567',
        digest: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
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
          	'email': this.loginForm.email,
          	'phone': '',
          	'digest': this.loginForm.digest,
          	'vcode': this.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
          	console.log(res)
          	if (res.status == 0) {
          		this.loading = true
          		let newForm = this.loginForm
          		newForm.password = lftPwdRule(this.loginForm.password,3,5)
          		console.log(lftDePwdRule(newForm.password))
          		this.$store.dispatch('managerLogin', this.loginForm).then((resp) => {
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
<style>
</style>
