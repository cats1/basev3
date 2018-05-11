<template>
	<el-form class="login-form noboxshadow" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-row v-if="!success">
          <div class="title-container">
           <img :src="icon" alt="">
           <h3 class="title">{{$t('resetPwd')}}</h3>
           <p class="desc">{{$t('inputNewPwd')}}</p>
          </div>
          <el-form-item prop="empPwd">
            <el-input name="password" type="password" v-model="loginForm.empPwd" autoComplete="on" placeholder="password" />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input name="password" type="password" v-model="loginForm.repassword" autoComplete="on" placeholder="password" />
          </el-form-item>
          <!-- <el-form-item prop="vcode">
            <el-col :span="12">
              <el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
            </el-col>
            <el-col :span="12" class="codewrap">
              <img-code :get-show="getCode" @clickit="setCode"></img-code>
            </el-col>
          </el-form-item> -->
          <el-button type="success" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="checkConfirm">{{$t('submitNewPwd')}}</el-button>
	     </el-row>
	     <el-row v-else>
	     	<div class="title-container">
		       <img :src="successIcon" alt="">
		       <p class="title lh60">{{$t('login.forgot.page.desc2')}}</p>
		    </div>
	     </el-row>
    </el-form>
</template>
<script>
import { smsCode } from '@/components/SendCode'
import { isvalidatPhone,validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule, getQueryStringByName } from '@/utils/common'
import ImgCode from '@/components/loginpage/ImgCode'
export default {
  name: 'ManagerForgot',
  components: { ImgCode,smsCode },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('formCheck.validPassword.tip3')));
      } else {
        if (this.loginForm.repassword !== '') {
          this.$refs.loginForm.validateField('repassword');
        }
        callback();
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('formCheck.validPassword.tip6')));
      } else if (value !== this.loginForm.empPwd) {
        callback(new Error(this.$t('formCheck.validPassword.tip5')));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        email: '',
        digest: '',
        vcode: '',
        repassword: '',
        empPwd: ''
      },
      icon: require('@/assets/img/favicon.png'),
      successIcon: require('@/assets/img/success.png'),
      loginRules: {
        empPwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
      },
      loading: false,
      step: 0,
      passwordType: 'password',
      success: false,
      getCode: false
    }
  },
  created () {
    let email = getQueryStringByName('email')
    let digest = getQueryStringByName('digest')
    if (email && digest) {
      this.loginForm.email = email
      this.loginForm.digest = digest
    }
  },
  methods: {
    getSmsCode (code) {
      this.loginForm.verifyCode = code
    },
  	setCode (result) {
      this.loginForm.digest = result.digest
  	},
    checkConfirm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let codeData = {
            'email': this.loginForm.email,
            'new_pwd': this.loginForm.empPwd,
            'digest': this.loginForm.digest
          }
          this.$store.dispatch('ModifyPassword',codeData).then((res) => {
            if (res.status == 0) {
              this.loading = false
              this.success = true
              setTimeout(function(){
                window.location.href = 'signin.html'
              },2000)
            } else if (res.status === 119) {
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
    },
  }
}
</script>