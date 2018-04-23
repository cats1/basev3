<template>
  <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-row>
      <div class="title-container">
         <h3 class="title">{{$t('empLogin.title')}}</h3>
         <!-- <lang-select class="set-language"></lang-select> -->
      </div>
      <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
         <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on" placeholder="phone" />
      </el-form-item>
      <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
         <el-input name="password" :type="passwordType" v-model="loginForm.empPwd" autoComplete="on" placeholder="password" />
         <span class="show-pwd">
            <svg-icon icon-class="eye" />
         </span>
       </el-form-item>
       <template v-show="comShow">
         <el-form-item>       
            <el-select v-model="loginForm.userid" clearable placeholder="请选择公司">
              <el-option
                v-for="item in comlist"
                :key="item.userid"
                :label="item.company"
                :value="item.userid">
              </el-option>
            </el-select>      
         </el-form-item>
       </template>
       <el-form-item prop="vcode">
        <el-col :span="12">
          <el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
        </el-col>
        <el-col :span="12" class="codewrap">
          <img-code @clickit="setCode"></img-code>
        </el-col>
       </el-form-item>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('empLogin.logIn')}}</el-button>
       </el-row>
      </el-form>
</template>
<script>
import { isvalidatPhone, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
export default {
  name: 'CompanyLogin',
  components: { ImgCode },
  data () {
    const isvalidSuperAccount = (rule, value, callback) => {
      if (!isvalidatPhone(value)) {
        callback(new Error(this.$t('validphone.tip1')))
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
        userid: '',
        phone: '18851650702',
        empPwd: '1234567',
        digest: '',
        vcode: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: isvalidSuperAccount }],
        empPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
        vcode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      vcode: '',
      comShow: false,
      comlist: []
    }
  },
  methods: {
    setCode (result) {
      this.loginForm.digest = result.digest
    },
    doLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.userid === '') {
            let checkEmp = {
              phone: this.loginForm.phone
            }
            this.$store.dispatch('checkEmpInfo',checkEmp).then((res) => {
              let { status, result } = res
              this.comlist = result
            }) 
          } else {
            let codeData = {
              'email': '',
              'phone': this.loginForm.phone,
              'digest': this.loginForm.digest,
              'vcode': this.loginForm.vcode
            }
            this.$store.dispatch('isCodeTrue',codeData).then((res) => {
              if (res.status == 0) {
                this.loading = true
                let newForm = {
                  userid: this.loginForm.userid,
                  phone: this.loginForm.phone,
                  empPwd: lftPwdRule(this.loginForm.empPwd,3,5),
                  digest: this.loginForm.digest
                }
                this.$store.dispatch('empLogin', newForm).then((resp) => {
                    this.loading = false
                    window.location.href = 'emporder.html'
                }).catch(() => {
                  this.loading = false
                })
              }
            })
          } 
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>