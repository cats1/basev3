<template>
	<el-row :gutter="20">
        <el-col :span="4">
            <el-menu
		      :default-active="defaultIndex"
		      class="el-menu-vertical-demo boxshadow block"
		       >
		        <h3 class="paddingtb20 paddinglr20">{{$t('key.htitle')}}</h3>
			    <el-submenu index="equip">
			        <template slot="title">
			          <span>{{$t('key.title')}}</span>
			        </template>
			        <router-link :to="{name: 'group'}"><el-menu-item index="group">{{$t('key.ctitle')}}</el-menu-item></router-link>
			        <router-link to="/list"><el-menu-item index="list">{{$t('key.ctitle1')}}</el-menu-item></router-link>
			    </el-submenu>
			    <el-submenu index="record">
			        <template slot="title">
			          <span>{{$t('key.title1')}}</span>
			        </template>
			        <router-link to="/record"><el-menu-item index="record">{{$t('key.ctitle2')}}</el-menu-item></router-link>
			    </el-submenu>
		  </el-menu>
        </el-col>
        <el-col :span="20">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
</template>
<script>
import { siderBarItem, siderBarMenu } from '@/components/siderBar'
export default {
  name: 'App',
  data () {
    return {
      defaultIndex: ''
    }
  },
  components: { siderBarItem, siderBarMenu },
  created () {
  	console.log(this.$route.name)
  	this.defaultIndex = this.$route.name
  }
}
</script>
<style>
</style>