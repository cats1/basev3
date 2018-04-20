<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<data-left @getvlist="getList"></data-left>
			</el-col>
			<el-col :span="16">
				<data-right :ldata="vlist"></data-right>
			</el-col>
		</el-row>
		<el-row>
			<data-bottom :vdata="vlist" :vtype="vtype" :nform="nform"></data-bottom>
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
  	  vlist: [],
  	  dataArray: [],
  	  vtype: 0,
  	  nform: {}
  	}
  },
  methods: {
  	getList (val,type,nform) {
      this.vlist = val
      console.log(type)
      this.vtype = type
      this.nform = nform
  	}
  }
}
</script>