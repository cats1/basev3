<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane label="面试模板" name="face" @tab-click="activeName === 'face'">
		    	<interview mtype="面试" mapid="facemap" :isshow="isshow"></interview>
		    </el-tab-pane>
		    <el-tab-pane label="商务模板" name="bus" @tab-click="activeName === 'bus'">
		    	<interview mtype="商务" mapid="busmap" :isshow="isshow"></interview>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import interview from './interview'
export default {
  props: ['isshow'],
  components: { interview },
  data () {
  	return {
  	  activeName: 'face'
  	}
  }
}
</script>