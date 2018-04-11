<template>
	<el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      	<el-row>
  		<div class="title-container">
	       <h3 class="title">{{$t('login.forgot.page.title')}}</h3>
	       <p class="desc">{{$t('login.forgot.page.desc')}}</p>
	       <!-- <lang-select class="set-language"></lang-select> -->
	    </div>
	    <el-form-item prop="email">
	        <span class="svg-container svg-container_login">
	          <svg-icon icon-class="user" />
	        </span>
	       <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="email" />
	    </el-form-item>
	     <el-form-item prop="vcode">
	     	<el-col :span="12">
	     		<el-input name="code" type="text" v-model="vcode" autoComplete="on" placeholder="code" />
	     	</el-col>
	     	<el-col :span="12" class="codewrap">
	     		<img-code @clickit="setCode"></img-code>
	     	</el-col>
	     </el-form-item>
	     <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('login.logIn')}}</el-button>
	     </el-row>
    </el-form>
</template>
<script>
import { validateEmail, isvalidUsername } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from '@/views/login/components/ImgCode'
export default {
  name: 'ManagerForgot',
  components: { ImgCode },
  data () {
  	const validateEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter the correct email'))
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
        digest: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail}]
      },
      loading: false,
      passwordType: 'password',
      vcode: ''
    }
  },
  methods: {
  	setCode (result) {
      this.loginForm.digest = result.digest
  	}
  }
}
</script>