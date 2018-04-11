<template>
	<el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      	<el-row>
  		<div class="title-container">
	       <h3 class="title">{{$t('login.forgot.page.title')}}</h3>
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
	     	<el-col :span="12" class="codewrap">
	     		<img-code @clickit="setCode"></img-code>
	     	</el-col>
	     </el-form-item>
	     <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="doLogin">{{$t('login.logIn')}}</el-button>
       <el-button type="text" style="width:100%;" :loading="loading" @click.native.prevent="goForgot">{{$t('login.forgot.title')}}</el-button>
       <or-line :value="$t('login.or')"></or-line>
       <el-button type="text" style="width:100%;" :loading="loading" @click.native.prevent="goSignUp">{{$t('login.signup')}}</el-button>
	     </el-row>
    </el-form>
</template>
<script>
export default {
  name: 'ManagerForgot',
  data () {
    return {}
  }
}
</script>