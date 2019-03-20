<template>
  <el-form class="login-form" auto-complete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
    <el-row>
      <template v-if="empPointEpson">
          <el-form-item prop="username">
              <span class="svg-container svg-container_login">
                <i class="fa fa-user"></i>
              </span>
             <el-input type="text" auto-complete="off" v-model="loginForm.phone" :placeholder="$t('login.username')" />
          </el-form-item>
          <template v-if="autoLogin">
            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="goEpsonLogin">{{$t('login.logIn')}}</el-button>
            <el-alert
              title="员工请在IE浏览器中登录，请启用ActiveX，具体配置步骤：工具>Internet选项>安全>Internet>自定义级别>ActiveX控件和插件>对没有标记为安全的ActiveX控件进行初始化和脚本运行>选择启用"
              type="error" :center="false" :closable="false" v-show="tips">
            </el-alert>
          </template>
          
      </template>
      <template v-else>
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
          <template v-if="stepTwo">
            <transition name="el-fade-in-linear">
              <el-form-item v-show="comShow">       
                <el-select v-model="loginForm.userid" clearable :placeholder="$t('comSelectHolder')">
                  <template v-if="comlist.length == 1">
                    <el-option
                      v-for="item in comlist"
                      :key="item.userid"
                      :label="item.empName"
                      :value="item.userid">
                    </el-option>
                  </template>
                  <template v-else>
                    <el-option
                      v-for="item in comlist"
                      :key="item.userid"
                      :label="item.company"
                      :value="item.userid">
                    </el-option>
                  </template>              
                </el-select>      
              </el-form-item>
            </transition>
          </template>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="goLogin">{{$t('login.logIn')}}</el-button>
          <template v-if="empPwdShow">
            <el-button type="text" style="width:100%;" @click.native.prevent="goForgot">{{$t('login.forgot.title')}}</el-button>
            <or-line :value="$t('login.or')"></or-line>
          </template>
          <template v-if="empActiveShow">
            <el-button type="text" style="width:100%;" @click.native.prevent="goActive">{{$t('login.active')}}</el-button>
          </template>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import { isvalidatPhone, validatePSD } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from './ImgCode'
import OrLine from '@/components/or/OrLine'
import { getCache } from '@/utils/auth'
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
      comShow: process.env.empComShow || false,
      comlist: [],
      stepTwo: false,
      getCode: false,
      empWorkNoCheck: process.env.empWorkNoCheck || false,
      empActiveShow: process.env.empActiveShow || false,
      empPwdShow: process.env.empPwdShow || false,
      empPointEpson: process.env.empPointEpson || false,
      empUserName: '',
      tips: false,
      autoLogin: true
    }
  },
  created () {
    if (this.empPointEpson) {
      this.loginForm.phone = ''
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.getComputerName()
      } else {
        this.tips = true
      }
    }
  },
  methods: {
    getComputerName () {
      try{
        let wshNetwork = new ActiveXObject("WScript.Network")
        this.loginForm.phone = wshNetwork.UserName
        this.autoLogin = false
        this.goEpsonLogin()
      } catch (e) {
        if (e.name == 'Error') {
          this.tips = true
        }
      }
    },
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
                    this.GetUserInfo()
                }).catch(() => {
                  this.loading = false
                })
              } else if (res.status === 119) {
                this.getCode = true
                this.loginForm.vcode = ''
              }
            })
        } else {
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
              if (result) {
                if (result.length == 1) {
                  this.loginForm.userid = result[0].userid
                  let codeData = {
                    'email': '',
                    'phone': this.loginForm.phone,
                    'digest': this.loginForm.digest,
                    'vcode': this.loginForm.vcode
                  }
                  if (this.empWorkNoCheck) {
                    codeData = {
                      'email': '',
                      'phone': this.loginForm.phone,
                      'digest': this.loginForm.digest,
                      'vcode': this.loginForm.vcode
                    }
                  }
                  this.isCodeTrue(codeData)
                } else {
                  this.comlist = result
                  this.stepTwo = true
                }
              }
            }) 
          } else {
            let codeData = {
              'email': '',
              'phone': this.loginForm.phone,
              'digest': this.loginForm.digest,
              'vcode': this.loginForm.vcode
            }
            if (this.empWorkNoCheck) {
              codeData = {
                'email': '',
                'phone': this.loginForm.phone,
                'digest': this.loginForm.digest,
                'vcode': this.loginForm.vcode
              }
            }
            this.isCodeTrue(codeData)
          } 
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isCodeTrue (nform) {
      this.$store.dispatch('isCodeTrue',nform).then((res) => {
        if (res.status == 0) {
          this.loading = true
          let newForm = {
            userid: this.loginForm.userid,
            phone: this.loginForm.phone,
            empPwd: lftPwdRule(this.loginForm.empPwd,3,5),
            digest: this.loginForm.digest
          }
          if (this.empWorkNoCheck) {
            newForm = {
              userid: this.loginForm.userid,
              phone: this.loginForm.phone,
              empNo: this.loginForm.phone,
              empPwd: lftPwdRule(this.loginForm.empPwd,3,5),
              digest: this.loginForm.digest
            }
          }
          this.empLogin(newForm)
        } else if (res.status === 119) {
          this.getCode = true
          this.loginForm.vcode = ''
        }
      })
    },
    empLogin (nform) {
      this.$store.dispatch('empLogin', nform).then((resp) => {
        this.loading = false
        this.GetUserInfo()
      }).catch(() => {
        this.loading = false
      })
    },
    GetUserInfo () {
      let gnform = {
        email: getCache('pemail'),
        userid: getCache('userid')
      }
      this.$store.dispatch('GetUserInfo',gnform).then(res => {
        let {status,result} = res
        if (status == 0) {
          window.location.href = 'emporder.html'
        }
      })
    },
    goEpsonLogin () {
      let nform = {
        digest: this.loginForm.phone
      }
      this.$store.dispatch('epsonLogin',nform).then(res => {
        let {status,result} = res
        if (status == 0) {
          window.location.href = 'emporder.html'
        }
      })
    }
  }
}
</script>