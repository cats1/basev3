<template>
	<div class="boxshadow margintop20 paddinglr30 paddingtb20">
		<h3>共找到{{data.length}}条，关于""记录</h3>
		<el-table :data="vdata" border>
			<el-table-column
		        prop="vname"
		        label="拜访者"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="vphone"
		        label="联系方式"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="empName"
		        label="被访者"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="empPhone"
		        label="被访者联系方式"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="visitType"
		        label="拜访事由"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="vcompany"
		        label="工作单位"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="date"
		        label="cardId"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="date"
		        label="证件扫描件"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="peopleCount"
		        label="来访人数"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="remark"
		        label="随访人员清单"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="remark"
		        label="备注"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="visitdate"
		        label="签到时间"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="signOutDate"
		        label="签出时间"
		        width="180">
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
  props: {
  	vdata: {
  	  type: Array,
  	  default: []
  	}
  },
  data () {
  	return {
  	  data: []
  	}
  },
  mounted () {
  	this.data = this.vdata
  	console.log(this.data)
  }
}
</script>