<template>
	<div id="headnav" class="mheader eheader">
		<div class="headerwrap">
			<div class="menuleft">
				<h1 class="head-logo">
					<img :src="hlogo" alt="">
				</h1>
				<v-history></v-history>
			</div>
		    <div class="menuright">
		    	<lang-select class="international right-menu-item"></lang-select>
		    	<el-dropdown>
				  <span class="el-dropdown-link">
				    <span class="useravater">
				    	<template v-if="logo&&logo!==''&&logo!=='null'">
				    		<img :src="logo"/>
				    	</template>
				    	<template v-else>
				    		<i class="fa  fa-user-circle"></i>
				    	</template></span><span class="username">{{username}}</span>
				    <i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item ><a href="jsvascript:void(0);" @click="doFuncPwd()">{{$t('downlist[1]')}}</a></el-dropdown-item>
				  	<el-dropdown-item ><a href="jsvascript:void(0);" @click="doFuncOut()">{{$t('downlist[2]')}}</a></el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
		    </div>
	    </div>
	    <change-pwd :ptype="1" :is-show="winShow" @closekit="getClose"></change-pwd>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import vHistory from '@/components/history/vHistory'
import { getCache } from '@/utils/auth'
import { lftDePwdRule } from '@/utils/common'
import changePwd from './changePwd'
export default {
  components: { LangSelect, vHistory, changePwd },
  data () {
  	return {
  	  username: getCache('company'),
  	  hlogo: require('@/assets/img/hlogo.png'),
  	  winShow: false
  	}
  },
  computed: {
    logo () {
      return getCache('logo')
    }
  },
  methods: {
    	getCache: getCache,
    	init () {
    	  /*let pwd = lftDePwdRule(getCache('password'))
    	  if (pwd === '888888') {
    	  	this.winShow = true
    	  }*/
    	},
    	doFuncPwd () {
    	  this.winShow = true
    	},
    	getClose () {
    	  this.winShow = false
    	},
    	doFuncOut () {
	      	this.$confirm(this.$t('outTip.title'),this.$t('outTip.desc'), {
			        confirmButtonText: this.$t('outTip.conform'),
			        cancelButtonText: this.$t('outTip.cancel'),
			        type: 'warning',
			        center: true
			    }).then(() => {
			        this.$store.dispatch('signOut').then(res => {
			        	window.location.href = 'signin.html'
			        })			        
			    }).catch(() => { })
        }
  },
  mounted () {
    this.init()
  }
}
</script>