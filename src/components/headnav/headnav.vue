<template>
	<div id="headnav" class="mheader">
		<div class="headerwrap">
			<div class="menuleft">
				<el-menu :default-active="activeIndex" theme="dark" class="el-menu-demo" mode="horizontal" background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#409EFF">
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
export default {
	name: 'headnav',
    props: ['activeIndex'],
    data() {
      return {
        navlist: this.$t('navlist'),
        downlist: this.$t('downlist')
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
    	console.log(this.navlist)
    }
  }
</script>