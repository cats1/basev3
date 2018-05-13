<template>
	<div class="boxshadow bgwhite paddinglr30 paddingtb20">
		<el-table :data="data" border>
			<el-table-column
		      type="index"
		      width="30">
		    </el-table-column>
			<el-table-column prop="vname" :label="$t('form.name.text')"></el-table-column>
			<el-table-column prop="vphone" :label="$t('form.phone.text')"></el-table-column>
			<el-table-column prop="visitType" :label="$t('tablehead[7]')" width="100"></el-table-column>
			<el-table-column prop="appointmentDate" :label="$t('tablehead[2]')" width="160">
				<template slot-scope="scope">
			      {{scope.row.appointmentDate | formatDate}}
			    </template>
			</el-table-column>
			<el-table-column prop="company" :label="$t('checkVtype[5]')"></el-table-column>
			<el-table-column prop="vphone" :label="$t('moban.inviteLink')" width="300">
				<template slot-scope="scope">
			      {{ scope.row.visitType | checkLink}}{{scope.row.encryption}}
			    </template>
			</el-table-column>
			<el-table-column prop="remark" :label="$t('form.remark.text')"></el-table-column>
			<el-table-column prop="status" :label="$t('tablehead[10]')" width="70">
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
import {getBaseUrl} from '@/utils/common'
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
  	  	return getBaseUrl() + '/bus?id='
  	  } else {
  	  	return getBaseUrl() + '/show?id='
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