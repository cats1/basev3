<template>
	<div>
		<el-table :data="inviteArray" border>
			<el-table-column
		      prop="date"
		      label="序号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="手机号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="事由"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="发起时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="公司"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="备注"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="状态"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="发送状态"
		      width="180">
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
  props: [ 'mid'],
  data () {
  	return {
  	  inviteArray: []
  	}
  },
  methods: {
  	getInviteList () {
  	  let newForm = {
  	  	mid: this.mid
  	  }
  	  this.$store.dispatch('getAppointmentByMid',newForm).then(res => {
  	  	console.log(res)
  	  	let { status, result } = res
  	  	if (status === 0) {
  	  		this.inviteArray = result
  	  	}
  	  })
  	}
  },
  mounted () {
  	this.$nextTick(function(){
  		this.getInviteList()
  	})
  }
}
</script>