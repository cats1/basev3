<template>
	<div>
		<el-table :data="data" border>
			<el-table-column
		      type="index"
		      width="50">
		    </el-table-column>
			<el-table-column prop="vname" label="姓名"></el-table-column>
			<el-table-column prop="vphone" label="手机号"></el-table-column>
			<el-table-column prop="visitType" label="事由"></el-table-column>
			<el-table-column prop="appointmentDate" label="时间">
				<template slot-scope="scope">
			      {{scope.row.appointmentDate | formatDate}}
			    </template>
			</el-table-column>
			<el-table-column prop="company" label="公司"></el-table-column>
			<el-table-column prop="vphone" label="邀请函链接" width="150">
				<template slot-scope="scope">
			      {{ scope.row.visitType | checkLink}}{{scope.row.encryption}}
			    </template>
			</el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column prop="status" label="状态">
				<template slot-scope="scope">
			      {{scope.row.status | checkStatus}}
			    </template>
			</el-table-column>
		</el-table>
		<div class="margintop20 marginbom20">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="form.startIndex"
		      :page-sizes="sizes"
		      :page-size="form.requestedCount"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>
<script>
import {formatDate,setYearAgo} from '@/utils/index'
import { getCache } from '@/utils/auth'
export default {
  data () {
  	return {
  	  form: {
  	  	empid: getCache('empid'),
  	  	date: formatDate(setYearAgo(new Date(),1),'yyyy-MM-dd'),
  	  	endDate: formatDate(new Date(),'yyyy-MM-dd'),
  	  	startIndex: 1,
  	  	requestedCount: 10,
  	  	visitType: 1
  	  },
  	  sizes: [10, 20, 30, 40],
  	  data: [],
  	  total: 0
  	}
  },
  filters:{
  	formatDate (time) {
  	  let date = new Date(time)
  	  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  	},
  	checkLink (type) {
  	  if (type === '商务') {
  	  	return process.env.BASE_API + '/bus?id='
  	  } else {
  	  	return process.env.BASE_API + '/show?id='
  	  }
  	},
  	checkStatus (type) {
	    switch (type) {
	        case 0:
	            return '已发送'
	        case 1:
	            return '已签到'
	        case 2:
	            return '已查看'
	        case 3:
	            return '接受邀请'
	        case 4:
	            return '拒绝邀请'
	        default:
	            return '已发送'

	    }
  	}
  },
  methods: {
  	getList () {
      this.$store.dispatch('SearchRecordsByPhone',this.form).then(res => {
      	let {status,result} = res
      	if (status === 0) {
          this.total = result.count
          this.data = result.list
      	}
      })
  	},
  	handleSizeChange(val) {
       this.form.requestedCount = val
       this.getList()
    },
    handleCurrentChange(val) {
       this.form.startIndex = (val - 1) * this.form.requestedCount + 1
       this.getList()
    }
  },
  created () {
  	this.getList()
  }
}
</script>