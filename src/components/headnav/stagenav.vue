<template>
	<div id="headnav" class="mheader eheader">
		<div class="headerwrap">
			<div class="menuleft">
				<h1 class="head-logo">
					<img :src="hlogo" alt="">
				</h1>
				<v-history></v-history>
			</div>
			<div class="menuleft">			
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#2274e6">
				  <el-menu-item index="index"><router-link to="/">{{$t('navlist[0].name')}}</router-link></el-menu-item>
				</el-menu>
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
				  	<el-dropdown-item ><a href="jsvascript:void(0);" @click="doFuncOut">{{$t('downlist[1.name]')}}</a></el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
		    </div>
	    </div>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import vHistory from '@/components/history/vHistory'
import { getCache } from '@/utils/auth'
export default {
	name: 'headnav',
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist'),
        username: this.getCache('username'),
        activeIndex: this.$route.name,
        hlogo: require('@/assets/img/hlogo.png')
      }
    },
    computed: {
      logo () {
      	return getCache('logo')
      }
    },
    components: { LangSelect, vHistory },
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
    },
    created () {
    	console.log(this.$route.name)
    }
  }
</script>