<template>
	<el-form class="login-form noboxshadow" autoComplete="on" :model="form" :rules="formRules" ref="signupForm" label-position="left">
    <el-row>
      <div class="title-container">
         <h3 class="title">{{$t('signup.title')}}</h3>
         <p class="desc">{{$t('signup.desc')}}</p>
      </div>
      <el-form-item prop="email">
        <el-input name="email" type="text" v-model="form.email" autoComplete="on" :placeholder="$t('validEmail.tip2')" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input name="name" type="text" v-model="form.name" autoComplete="on" :placeholder="$t('yourName')"/>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input name="phone" type="text" v-model="form.phone" autoComplete="on" :placeholder="$t('yourPhone')" />
      </el-form-item>
      <el-form-item prop="smscode">
        <sms-code :phone="form.phone" @comit="getSmsCode"></sms-code>
      </el-form-item>
      <el-form-item prop="company">
        <el-input name="company" type="text" v-model="form.company" autoComplete="on" :placeholder="$t('yourCompany')" />
      </el-form-item>
      <el-form-item prop="password">
        <template v-if='checkPassword'>
          <check-password :p-value="form.password" @sendv="getNewpwd"></check-password>
        </template>
        <template v-else>
          <el-input name="password" type="password" v-model="form.password" autoComplete="on" :placeholder="$t('passText')" />
        </template> 
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input name="repassword" type="password" v-model="form.repassword" autoComplete="on" :placeholder="$t('comfirmPassText')" />
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click="doRegister">{{$t('signup.button')}}</el-button>
       <or-line :value="$t('login.or')"></or-line>
       <el-button type="text" style="width:100%;" :loading="loading" @click.native.prevent="goLogin">{{$t('login.logIn')}}</el-button>
  	</el-row>
  </el-form>
</template>
<script>
import { smsCode } from '@/components/SendCode'
import { isvalidEmail, isvalidatPhone, validatePSD } from '@/utils/validate'
import OrLine from '@/components/or/OrLine'
export default {
  components: { smsCode, OrLine },
  data () {
    const validateEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error(this.$t('validEmail.tip1')))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('formCheck.validName.tip1')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('formCheck.validphone.tip2')))
      } else if (!isvalidatPhone(value)) {
        callback(new Error(this.$t('formCheck.validphone.tip1')))
      } else {
        callback()
      }
    }
    const validateCompany = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('formCheck.validName.tip1')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('formCheck.validPassword.tip3')))
      } else if (value.length < 6) {
        callback(new Error(this.$t('formCheck.validPassword.tip2')))
      } else if (!validatePSD(value)) {
        callback(new Error(this.$t('formCheck.validPassword.tip1')))
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
      form: {
        email: '',
        name: '',
        phone: '',
        company: '',
        password: '',
        repassword: '',
        smscode: ''
      },
      formRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail}],
        name: [{ required: true, trigger: 'blur', validator: validateName}],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone}],
        company: [{ required: true, trigger: 'blur', validator: validateCompany}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        smscode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      pwdStrong: 0,
      checkPassword: process.env.checkPassword || false
    }
  },
  methods: {
    getNewpwd (val,num) {
      this.form.password = val
      this.pwdStrong = num
    },
    goLogin () {
      window.location.href = 'signin.html'
    },
    getSmsCode (code) {
      this.form.smscode = code
    },
    doRegister () {      
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          if (this.checkPassword) {
            if (this.pwdStrong == 1) {
              this.$message({
                showClose: true,
                message: '密码强度太弱',
                type: 'warning'
              })
              return false
            }
          }
          let newForm = {
            email: this.form.email,
            name: this.form.name,
            phone: this.form.phone,
            company: this.form.company,
            password: this.form.password,
            smscode: this.form.smscode
          }
          this.$store.dispatch('Register', newForm).then(res => {
            let {status} = res
            if (status === 0) {
              this.$router.push({'path': 'guide'})
              //window.location.href = 'guide.html'
            }
          })
        }
      })
    }
  }
}
</script>