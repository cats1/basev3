<template>
	<div id="headnav" class="mheader">
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
				  <template v-for="(item,index) in $t('navlist')">
				  	<template v-if="item.children.length === 0">
				  		<el-menu-item :index="item.dirname"><a :href="item.link" target="_self">{{item.name}}</a></el-menu-item>
				  	</template>
				  	<template v-else>
				  		<el-submenu :index="item.dirname">
						    <template slot="title">{{item.name}}</template>
						    <template v-for="citem in item.children">
						    	<el-menu-item :index="citem.dirname"><a :href="citem.link" target="_self">{{citem.name}}</a></el-menu-item>
						    </template>
						</el-submenu>
				  	</template>		  	
				  </template>
				</el-menu>
		    </div>
		    <div class="menuright">
		    	<a :href="$t('homepage.link')" class="gohomepage">{{$t('homepage.name')}}</a>
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
				  	<template v-for="item in $t('downlist')">
				  		<template v-if="item.link !== null">
					  		<el-dropdown-item ><a :href="item.link" target="_self">{{item.name}}</a></el-dropdown-item>
					  	</template>
					  	<template v-else>
					  		<el-dropdown-item ><a href="jsvascript:void(0);" @click="doFunc(item.link,item.dirname)" target="_self">{{item.name}}</a></el-dropdown-item>
					  	</template>
				  	</template>				  	
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
    props: ['activeIndex'],
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist'),
        username: this.getCache('company'),
        hlogo: require('@/assets/img/hlogo.png')
      }
    },
    computed: {
      logo () {
      	return getCache('logo')
      }
    },
    components: {LangSelect,vHistory},
    methods: {
    	getCache: getCache,
    	doFunc (link,dirname) {
	      	if (dirname === 'signout') {
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
  }
</script>