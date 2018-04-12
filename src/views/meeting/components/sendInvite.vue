<template>
	<div>
		<el-table :table="table" border>
			<el-table-column
		      type="index"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="姓名"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="手机号"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="公司"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="备注">
		    </el-table-column>
		</el-table>
		<!-- <baidu-map></baidu-map> -->
	</div>
</template>
<script>
export default {
  data () {
  	return {
  	  table: []
  	}
  }
}
</script>