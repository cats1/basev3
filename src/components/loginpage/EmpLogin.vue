<template>
  <el-form class="login-form" auto-complete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-row>
      <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <i class="fa fa-user"></i>
          </span>
         <el-input type="text" auto-complete="off" v-model="loginForm.phone" :placeholder="$t('login.username')" />
      </el-form-item>
      <el-form-item prop="password">
          <span class="svg-container">
            <i class="fa fa-lock fa-lg"></i>
          </span>
         <el-input :type="passwordType" autocomplete="off" v-model="loginForm.empPwd" :placeholder="$t('login.password')"></el-input>
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
       <transition name="el-fade-in-linear">
        <el-form-item v-show="comShow">       
            <el-select v-model="loginForm.userid" clearable :placeholder="$t('comSelectHolder')">
              <el-option
                v-for="item in comlist"
                :key="item.userid"
                :label="item.company"
                :value="item.userid">
              </el-option>
            </el-select>      
        </el-form-item>
      </transition>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="goLogin">{{$t('login.logIn')}}</el-button>
       <el-button type="text" style="width:100%;" @click.native.prevent="goForgot">{{$t('login.forgot.title')}}</el-button>
       <or-line :value="$t('login.or')"></or-line>
       <el-button type="text" style="width:100%;" @click.native.prevent="goActive">{{$t('login.active')}}</el-button>
       </el-row>
      </el-form>
</template>
<script>
import { isvalidatPhone, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
import OrLine from '@/components/or/OrLine'
export default {
  name: 'CompanyLogin',
  components: { ImgCode, OrLine },
  data () {
    const isvalidSuperAccount = (rule, value, callback) => {
      var reg = new RegExp(/^\\$/);
      if (!value) {
        callback(new Error(this.$t('imgcode.tip1')))
      } else if (value.indexOf('\\') <= 0) {
        callback(new Error(this.$t('tipEmp')))
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
        phone: '',
        empPwd: '',
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
      comShow: true,
      comlist: [],
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
    goForgot () {
      window.location.href = 'forgot.html?type=1'
    },
    goActive () {
      window.location.href = 'active.html'
    },
    setCode (result) {
      this.loginForm.digest = result.digest
    },
    goLogin () {
      if (this.comShow) {
        this.doLogin()
      } else {
        this.doEmpLogin()
      }
    },
    doEmpLogin () {
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
                let newForm = {
                  //userid: this.loginForm.userid,
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
              } else if (res.status === 119) {
                this.getCode = true
                this.loginForm.vcode = ''
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
              this.comShow = true
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
              } else if (res.status === 119) {
                this.getCode = true
                this.loginForm.vcode = ''
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