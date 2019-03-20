<template>
	<div id="headnav" class="mheader eheader"  :class="{'whiteheader': whiteheader}">
		<div class="headerwrap">
			<template v-if="!isMobile">
				<template v-if="!logoShow">
					<div class="menuleft">
						<h1 class="head-logo">
							<img :src="hlogo" alt="">
						</h1>
						<v-history></v-history>
				    </div>
			    </template>
		    </template>
			<div class="menuleft">			
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
					<template v-if="inviteMoreShow">
						<el-menu-item index="order"><router-link to="/">来访预约</router-link></el-menu-item>
					</template>
					<template v-else>
						<el-menu-item index="order"><router-link to="/">{{$t('empnav[0].name')}}</router-link></el-menu-item>
					</template>
		            <el-menu-item index="list"><router-link to="/list">{{$t('empnav[1].name')}}</router-link></el-menu-item>
		            <el-menu-item index="empmeeting" v-show="meetshow"><router-link to="/empmeeting">{{$t('navlist[4].name')}}</router-link></el-menu-item>
				</el-menu>
		    </div>
		    <template v-if="!isMobile">
			    <template v-if="!accountMessClose">
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
			    </template>
		    </template>
	    </div>
	    <change-pwd :ptype="2" :is-show="winShow" @closekit="getClose"></change-pwd>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import vHistory from '@/components/history/vHistory'
import { getCache } from '@/utils/auth'
import changePwd from './changePwd'
import {mobile_device_detect} from '@/utils/common'
export default {
	name: 'headnav',
    data() {
      return {
        username: getCache('empName'),
	  	hlogo: require('@/assets/img/hlogo.png'),
	  	winShow: false,
	  	activeIndex: this.$route.name,
	  	meetshow: process.env.conference || false,
	  	logoShow: process.env.logoClose || false,
	  	whiteheader: process.env.whiteHeaderClass || false,
	  	accountMessClose: process.env.accountMessClose || false,
	  	isMobile: false,
	  	inviteMoreShow:process.env.inviteMoreShow || false
      }
    },
    computed: {
      logo () {
      	return getCache('logo')
      },
      popperClass () {
      	return this.whiteheader ? 'popper-class-demo' : ''
      },
      backgroundColor () {
      	return this.whiteheader ? '#fff' : '#2a2c2f'
      },
      textColor () {
      	return this.whiteheader ? '#909399':'#fff' 
      },
      activeTextColor () {
      	return this.whiteheader ? '#2274e6':'#2274e6'
      }
    },
    components: { LangSelect, vHistory, changePwd },
    methods: {
    	GetUserInfo () {
    		let info = {
					email: getCache('pemail') || getCache('email'),
					userid: getCache('userid')
				}
	      this.$store.dispatch('GetUserInfo',info).then(res => {
	      	let {status,result} = res
	      	if (status === 0) {
              //this.username = result.username
	      	}
	      })
	    },
    	init () {
    	  let pwd = lftDePwdRule(getCache('password'))
    	  if (pwd === '888888') {
    	  	this.winShow = true
    	  }
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
    created () {
      let _self = this
	  this.isMobile = mobile_device_detect()
	  window.onresize = function(){
	    _self.isMobile = mobile_device_detect()
	  }
      if (this.$route.name == 'order' || this.$route.name == 'dot') {
      	this.activeIndex = 'order'
      } else if (this.$route.name == 'list') {
      	this.activeIndex = 'list'
      } else {
      	this.activeIndex = 'empmeeting'
      }
      this.GetUserInfo()
    }
  }
</script>