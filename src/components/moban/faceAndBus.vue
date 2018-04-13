<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane label="面试模板" name="first">
		    	<interview ></interview>
		    </el-tab-pane>
		    <el-tab-pane label="商务模板" name="second">
		    	<business ></business>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import interview from './interview'
import business from './interview'
export default {
  components: { interview, business },
  data () {
  	return {
  	  activeName: 'first'
  	}
  }
}
</script>