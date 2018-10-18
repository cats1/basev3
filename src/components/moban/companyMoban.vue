<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane label="面试模板" name="face" @tab-click="activeName === 'face'">
		    	<interview mtype="面试" mapid="facemap" :isshow="faceShow"></interview>
		    </el-tab-pane>
		    <el-tab-pane label="商务模板" name="bus" @tab-click="activeName === 'bus'">
		    	<business mtype="商务" mapid="busmap" :isshow="!faceShow"></business>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import interview from './interview'
import business from './interview'
export default {
  props: ['isshow'],
  components: { interview,business },
  data () {
  	return {
  	  activeName: 'face',
  	  faceShow: false
  	}
  },
  watch: {
  	activeName (val) {
  	  if (val == 'face') {
  	  	this.faceShow = true
  	  } else {
  	  	this.faceShow = false
  	  }
  	},
  	isshow (val) {
  	  if (this.activeName == 'face') {
  	  	this.faceShow = true
  	  }
  	}
  }
}
</script>