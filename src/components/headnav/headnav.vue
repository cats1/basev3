<template>
	<div id="headnav" class="mheader">
		<div class="headerwrap">
			<div class="menuleft">				
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#ffd04b">
				  <template v-for="(item,index) in navlist">
				  	<template v-if="item.children.length === 0">
				  		<el-menu-item :index="item.dirname"><a :href="item.link" target="_blank">{{item.name}}</a></el-menu-item>
				  	</template>
				  	<template v-else>
				  		<el-submenu :index="item.dirname">
						    <template slot="title">{{item.name}}</template>
						    <template v-for="citem in item.children">
						    	<el-menu-item :index="citem.dirname"><a :href="citem.link" target="_blank">{{citem.name}}</a></el-menu-item>
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
				    <span class="useravater">p</span><span class="username">{{username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				  	<template v-for="item in downlist">
				  		<template v-if="item.link !== null">
					  		<el-dropdown-item ><a :href="item.link">{{item.name}}</a></el-dropdown-item>
					  	</template>
					  	<template v-else>
					  		<el-dropdown-item ><a href="jsvascript:void(0);" @click="doFunc(item.link,item.dirname)">{{item.name}}</a></el-dropdown-item>
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
import { getCache } from '@/utils/auth'
export default {
	name: 'headnav',
    props: ['activeIndex'],
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist'),
        username: this.getCache('username')
      }
    },
    components: {LangSelect},
    methods: {
    	getCache: getCache,
    	doFunc (link,dirname) {
	      	if (dirname === 'signout') {
	      		this.$confirm('确认退出吗?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning',
			        center: true
			    }).then(() => {
			        this.$store.dispatch('signOut').then(res => {
			        	window.location.href = 'login.html'
			        })
			        
			    }).catch(() => { })
	          
	      	}
        }
    },
    mounted(){}
  }
</script>