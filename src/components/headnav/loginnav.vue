<template>
	<div id="headnav" class="mheader lheader">
		<div class="headerwrap">
		    <div class="menuright">
		    	<lang-select class="international right-menu-item"></lang-select>
		    	<a href="signin.html" class="topnav" :class="{'active': active === 'login'}" v-show="loginShow">{{$t('login.logIn')}}</a>
		    	<a href="signup.html" class="topnav" :class="{'active': active === 'reg'}" v-show="signupShow">{{$t('signup.title')}}</a>
		    </div>
	    </div>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import { getCache } from '@/utils/auth'
export default {
	name: 'headnav',
    data() {
      return {
      	active: 'login',
        loginShow: process.env.loginShow,
        signupShow: process.env.signupShow
      }
    },
    components: {LangSelect},
    created () {
      if (this.$route) {
      	this.active = 'reg'
      }
    }
  }
</script>