<template>
	<div id="headnav" class="mheader lheader">
		<div class="headerwrap">
		    <div class="menuright">
		    	<lang-select class="international right-menu-item"></lang-select>
		    	<a href="signin.html" class="topnav" :class="{'active': active === 'login'}">{{$t('login.logIn')}}</a>
		    	<a href="signup.html" class="topnav" :class="{'active': active === 'reg'}">{{$t('signup.title')}}</a>
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
      	active: 'login'
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