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
				    <span class="useravater">p</span><span class="username">lana</span><i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				  	<template v-for="item in downlist">
				  		<el-dropdown-item><a :href="item.link">{{item.name}}</a></el-dropdown-item>
				  	</template>
				  </el-dropdown-menu>
				</el-dropdown>
		    </div>
	    </div>
	</div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
export default {
	name: 'headnav',
    props: ['activeIndex'],
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist')
      }
    },
    components: {LangSelect},
    methods: {},
    mounted(){}
  }
</script>