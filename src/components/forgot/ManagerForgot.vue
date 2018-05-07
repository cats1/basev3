<template>
	<el-form class="login-form noboxshadow" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-row v-if="!success">
	  		<div class="title-container">
           <img :src="icon" alt="">
		       <h3 class="title">{{$t('login.forgot.page.title')}}</h3>
		       <p class="desc">{{$t('login.forgot.page.desc')}}</p>
		    </div>
		    <el-form-item prop="email">
		       <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="email" />
		    </el-form-item>
		     <el-form-item prop="vcode">
		     	<el-col :span="12">
		     		<el-input name="code" type="text" v-model="loginForm.vcode" autoComplete="on" placeholder="code" />
		     	</el-col>
		     	<el-col :span="12" class="codewrap">
		     		<img-code :get-show="getCode" @clickit="setCode"></img-code>
		     	</el-col>
		     </el-form-item>
		     <el-button type="success" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="sendEmail">{{$t('login.forgot.page.btn')}}</el-button>
	     </el-row>
	     <el-row v-else>
	     	<div class="title-container">
		       <img :src="successIcon" alt="">
		       <p class="title lh60">{{$t('validEmail.success')}}</p>
		    </div>
	     </el-row>
    </el-form>
</template>
<script>
import { validateEmail } from '@/utils/validate'
import { lftPwdRule, lftDePwdRule } from '@/utils/common'
import ImgCode from '@/components/loginpage/ImgCode'
export default {
  name: 'ManagerForgot',
  components: { ImgCode },
  data () {
  	const validatemail = (rule, value, callback) => {
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
        email: '',
        digest: '',
        vcode: ''
      },
      icon: require('@/assets/img/favicon.png'),
      successIcon: require('@/assets/img/success.png'),
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validatemail}]
      },
      loading: false,
      passwordType: 'password',
      success: false,
      getCode: false
    }
  },
  methods: {
  	setCode (result) {
      this.loginForm.digest = result.digest
  	},
  	sendEmail () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let codeData = {
          	'email': this.loginForm.email,
          	'phone': '',
          	'digest': this.loginForm.digest,
          	'vcode': this.loginForm.vcode
          }
          this.$store.dispatch('isCodeTrue',codeData).then((res) => {
          	if (res.status == 0) {
          		this.loading = true
          		let newForm = {
          			email: this.loginForm.email,
          			digest: this.loginForm.digest
          		}
          		this.$store.dispatch('RetrievePassword', newForm).then((resp) => {
                  this.loading = false
                  let { status } = resp
                  if (status === 0) {
                    this.success = true
                    setTimeout(function(){
                      window.location.href = 'signin.html'
                    },2000)
                  }
	          	}).catch(() => {
	              this.loading = false
	            })
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
  	}
  }
}
</script>