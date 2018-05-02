<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane :label="$t('moban.facemoban')" name="face" @tab-click="activeName === 'face'">
		    	<interview :mtype="0" :is-init="initShow" mapid="facemap" :isshow="initShow"></interview>
		    </el-tab-pane>
		    <el-tab-pane :label="$t('moban.busmoban')" name="bus" @tab-click="activeName === 'bus'">
		    	<business :mtype="1" :is-init="!initShow" mapid="busmap" :isshow="!initShow"></business>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import interview from './interview'
import business from './business'
export default {
  props: ['isshow'],
  components: { interview,business },
  data () {
  	return {
  	  activeName: 'face',
  	  initShow: true
  	}
  },
  watch: {
  	activeName (val) {
  	  if(val === 'face') {
  	  	this.initShow = true
  	  } else if(val === 'bus') {
  	  	this.initShow = false
  	  }
  	}
  }
}
</script>