<template>
	<div id="headnav" class="mheader" :class="{'whiteheader': whiteheader}">
		<div class="headerwrap">
			<template v-if="!logoShow">
				<div class="menuleft">
					<h1 class="head-logo">
						<img :src="hlogo" alt="">
					</h1>
					<v-history></v-history>
				</div>
			</template>
			<div class="menuleft">
				<!-- <template v-if="whiteheader">
				  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
				</template>
				<template v-else>
				  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#2a2c2f" text-color="#fff" active-text-color="#2274e6">
				</template> -->
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
			      <el-menu-item index="index"><router-link to="/">{{$t('navlist[0].name')}}</router-link></el-menu-item>
			  	  <el-submenu index="emp" :popper-class="popperClass">
				    <template slot="title">{{$t('navlist[1].name')}}</template>
					<template v-for="(citem,ckey) in $t('navlist[1].children')">
						<template v-if="ckey < 3">
							<el-menu-item :index="citem.dirname"><router-link :to="citem.link">{{citem.name}}</router-link></el-menu-item>
						</template>
						<template v-else>
							<template v-if="whiteListShow && ckey == 3">
								<el-menu-item :index="citem.dirname"><router-link :to="citem.link">{{citem.name}}</router-link></el-menu-item>
							</template>
							<template v-if="whiteListShow && ckey == 4">
								<el-menu-item :index="citem.dirname"><router-link :to="citem.link">{{citem.name}}</router-link></el-menu-item>
							</template>
						</template>
						
					</template>
				  </el-submenu>
				  <el-menu-item index="notice"><router-link to="/notice">{{$t('navlist[2].name')}}</router-link></el-menu-item>
				  <el-submenu index="setting" :popper-class="popperClass">
				    <template slot="title">{{$t('navlist[3].name')}}</template>
					<template v-for="citem in $t('navlist[3].children')">
						<el-menu-item :index="citem.dirname"><router-link :to="citem.link">{{citem.name}}</router-link></el-menu-item>
					</template>
				  </el-submenu>
				  <el-menu-item index="meeting" v-show="meetshow"><router-link to="/meeting">{{$t('navlist[4].name')}}</router-link></el-menu-item>
			    </el-menu>
		    </div>
		    <template v-if="!accountMessClose">
		    	<div class="menuright">
		    	  <a :href="$t('homepage.link')" class="gohomepage" v-show="homepageShow">{{$t('homepage.name')}}</a>
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
					  	<el-dropdown-item ><router-link to="/account">{{$t('downlist[0]')}}</router-link></el-dropdown-item>
					  	<el-dropdown-item ><a href="javascript:void(0);" @click="doFuncOut" target="_self">{{$t('downlist[2]')}}</a></el-dropdown-item>			  	
					  </el-dropdown-menu>
				  </el-dropdown>
		      </div>
		    </template>
	    </div>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import vHistory from '@/components/history/vHistory'
import { getCache } from '@/utils/auth'
export default {
	name: 'headnav',
    props: ['activeIndex'],
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist'),
        username: this.getCache('company'),
        hlogo: require('@/assets/img/hlogo.png'),
        homepageShow: process.env.homepage,
        meetshow: process.env.conference || false,
        whiteListShow: process.env.whiteListShow || false,
        logoShow: process.env.logoClose || false,
        accountMessClose: process.env.accountMessClose || false,
        whiteheader: process.env.whiteHeaderClass || false
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
    components: {LangSelect,vHistory},
    methods: {
    	getCache: getCache,
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
    }
  }
</script>