<template>
	<div>
		<el-row>
			<el-col :span="8">
				<data-left @getvlist="getList"></data-left>
			</el-col>
			<el-col :span="16">
				<data-right></data-right>
			</el-col>
		</el-row>
		<el-row>
			<data-bottom :vdata="vlist"></data-bottom>
		</el-row>
	</div>
</template>
<script>
import dataLeft from './dataLeft'
import dataRight from './dataRight'
import dataBottom from './dataBottom'
export default {
  components: {dataLeft,dataRight,dataBottom},
  data () {
  	return {
  	  vlist: []
  	}
  },
  methods: {
  	getList (val) {
      this.vlist = val
  	}
  }
}
</script>