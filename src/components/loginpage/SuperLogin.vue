<template>
	<el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
    <el-row>
	    <el-form-item prop="username">
	        <span class="svg-container svg-container_login">
	          <i class="fa fa-user"></i>
	        </span>
	       <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
	    </el-form-item>
	    <el-form-item prop="password">
	        <span class="svg-container">
	          <i class="fa fa-lock fa-lg"></i>
	        </span>
	       <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="password" />
	       <span class="show-pwd" >
            <i class="fa fa-eye" v-if="passwordType === ''" @click="showPwd"></i>
            <i class="fa fa-eye-slash" v-else @click="showPwd"></i>
         </span>
	     </el-form-item>
	     <el-form-item prop="vcode">
	     	<el-col :span="12">
	     		<el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
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
import { isvalidSAccount, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
export default {
  name: 'SuperLogin',
  components: { ImgCode },
  data () {
  	const isvalidSuperAccount = (rule, value, callback) => {
      if (!isvalidSAccount(value)) {
        callback(new Error(this.$t('validName.tip')))
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
        username: '',
        password: '',
        digest: '',
        vcode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: isvalidSuperAccount }],
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
          	'email': this.loginForm.username,
          	'phone': '',
          	'digest': this.loginForm.digest,
          	'vcode': this.loginForm.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
          	if (res.status == 0) {
          		this.loading = true
          		let newForm = {
                username: this.loginForm.username,
                password: lftPwdRule(this.loginForm.password,3,5),
                digest: this.loginForm.digest
              }
          		this.$store.dispatch('superAccountLogin', newForm).then((resp) => {
                  this.loading = false
                  window.location.href = 'super.html'
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