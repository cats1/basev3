<template>
	<el-form class="login-form noboxshadow" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-row v-if="!success">
        <template v-if="step === 0">
          <div class="title-container">
           <img :src="icon" alt="">
           <h3 class="title">{{$t('login.active')}}</h3>
          </div>
          <el-form-item prop="phone">            
            <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on" placeholder="phone" />
          </el-form-item>
          <el-form-item prop="vcode">
            <el-col :span="12">
              <el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
            </el-col>
            <el-col :span="12" class="codewrap">
              <img-code :get-show="getCode" @clickit="setCode"></img-code>
            </el-col>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="sendEmail">{{$t('btn.confirmBtn')}}</el-button>
        </template>
        <template v-else>
          <div class="title-container">
            <img :src="icon" alt="">
            <h3 class="title">{{$t('login.active')}}</h3>
          </div>
          <p class="margintop20 marginbom20">{{$t('form.phone.text')}}：{{loginForm.phone}}</p>
          <el-form-item prop="smscode">
            <sms-code :phone="loginForm.phone" @comit="getSmsCode"></sms-code>
          </el-form-item>
          <el-form-item prop="empPwd">
            <el-input name="password" type="password" v-model="loginForm.empPwd" autoComplete="on" placeholder="password" />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input name="password" type="password" v-model="loginForm.repassword" autoComplete="on" placeholder="password" />
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading1" @click.native.prevent="checkConfirm">{{$t('btn.confirmBtn')}}</el-button>
        </template>
	     </el-row>
	     <el-row v-else>
	     	<div class="title-container">
		       <img :src="successIcon" alt="">
		       <p class="title lh60">{{$t('login.forgot.page.desc4')}}</p>
		    </div>
	     </el-row>
    </el-form>
</template>
<script>
import { smsCode } from '@/components/SendCode'
import { isvalidatPhone,validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from '@/components/loginpage/ImgCode'
export default {
  name: 'ManagerForgot',
  components: { ImgCode,smsCode },
  data () {
  	const validatePhone = (rule, value, callback) => {
      if (this.internalPhoneShow) {
        if (!value) {
          callback(new Error(this.$t('formCheck.validphone.tip2')))
        } else {
          callback()
        }
      } else {
        if (!value) {
          callback(new Error(this.$t('formCheck.validphone.tip2')))
        } else if (!isvalidatPhone(value)) {
          callback(new Error(this.$t('formCheck.validphone.tip1')))
        } else {
          callback()
        }
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('imgcode.tip1')))
      } else {
        callback()
      }
    }
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
        phone: '',
        digest: '',
        vcode: '',
        repassword: '',
        empPwd: '',
        verifyCode: ''
      },
      icon: require('@/assets/img/favicon.png'),
      successIcon: require('@/assets/img/success.png'),
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone}],
        vcode: [{ required: true, trigger: 'blur', validator: validateCode }],
        empPwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
      },
      loading: false,
      loading1: false,
      step: 0,
      passwordType: 'password',
      success: false,
      getCode: false,
      internalPhoneShow: process.env.internalPhoneShow || false
    }
  },
  methods: {
    getSmsCode (code) {
      this.loginForm.verifyCode = code
    },
  	setCode (result) {
      this.loginForm.digest = result.digest
  	},
  	sendEmail () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let codeData = {
          	'email': '',
          	'phone': this.loginForm.phone,
          	'digest': this.loginForm.digest,
          	'vcode': this.loginForm.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
          	if (res.status == 0) {
          		this.loading = true
              this.step = 1

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
    checkConfirm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let codeData = {
            'phone': this.loginForm.phone,
            'empPwd': this.loginForm.empPwd,
            'verifyCode': this.loginForm.verifyCode
          }
          this.$store.dispatch('webActivateAccount',codeData).then((res) => {
            if (res.status == 0) {
              this.loading = true
              this.step = 0
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
          return false
        }
      })
    },
  }
}
</script>