<template>
	<div id="headnav" class="mheader">
		<div class="headerwrap">
			<div class="menuleft"></div>
		    <div class="menuright">
		    	<lang-select class="international right-menu-item"></lang-select>
		    	<el-dropdown>
				  <span class="el-dropdown-link">
				    <span class="useravater">p</span><span class="username">lana</span><i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				  	<template v-for="item in downlist">
				  		<template v-if="item.link !== null">
				  			<el-dropdown-item ><a :href="item.link">{{item.name}}</a></el-dropdown-item>
				  		</template>
				  		<template v-else>
				  			<el-dropdown-item ><a href="jsvascript:void(0);" @click="dotest(item.link,item.dirname)">{{item.name}}</a></el-dropdown-item>
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
export default {
	name: 'companynav',
    props: ['activeIndex'],
    data() {
      return {
        downlist: this.$t('superdown')
      }
    },
    components: {LangSelect},
    methods: {
      dotest (link,dirname) {
      	console.log(link)
      	console.log(dirname)
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