<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane :label="$t('moban.facemoban')" name="face" @tab-click="activeName === 'face'">
		    	<interview mtype="面试" mapid="facemap" :isshow="isshow" ></interview>
		    </el-tab-pane>
		    <el-tab-pane :label="$t('moban.busmoban')" name="bus" @tab-click="activeName === 'bus'">
		    	<interview mtype="商务" mapid="busmap" :isshow="isshow"></interview>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import interview from './interview'
import business from './interview'
export default {
  props: ['isshow'],
  components: { interview, business },
  data () {
  	return {
  	  activeName: 'face'
  	}
  }
}
</script>