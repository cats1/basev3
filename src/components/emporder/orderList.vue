<template>
	<div class="boxshadow bgwhite paddinglr30 paddingtb20">
		<el-table :data="data" border>
			<el-table-column
		      type="index"
		      width="50">
		    </el-table-column>
			<el-table-column prop="vname" :label="$t('form.name.text')"></el-table-column>
			<el-table-column prop="vphone" :label="$t('form.phone.text')"></el-table-column>
      <el-table-column prop="vemail" :label="$t('form.email.text')"></el-table-column>
			<el-table-column prop="visitType" :label="$t('tablehead[7]')" width="100"></el-table-column>
			<el-table-column prop="appointmentDate" :label="$t('tablehead[2]')" width="160">
				<template slot-scope="scope">
			      {{scope.row.appointmentDate | formatDate}}
			    </template>
			</el-table-column>
			<el-table-column prop="vcompany" :label="$t('checkVtype[5]')"></el-table-column>
			<el-table-column prop="vphone" :label="$t('moban.inviteLink')" width="300">
				<template slot-scope="scope">
            <clip-link :item="scope.row" ></clip-link>
			    </template>
			</el-table-column>
			<el-table-column prop="remark" :label="$t('form.remark.text')"></el-table-column>
			<el-table-column prop="status" :label="$t('tablehead[10]')" width="70">
				<template slot-scope="scope">
			      {{checkStatus(scope.row.status)}}
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
import clipLink from '@/components/clipboard/clipLink'
import {formatDate,setYearAgo} from '@/utils/index'
import {getBaseUrl} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  components: {clipLink},
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
  	  total: 0,
      empWorkNoCheck: process.env.empWorkNoCheck,
      empPhoneCheck: process.env.empPhoneCheck
  	}
  },
  filters:{
  	formatDate (time) {
  	  let date = new Date(time)
  	  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  	}/*,
  	checkLink (type) {
  	  if (type === '商务') {
  	  	return getBaseUrl() + '/bus?id='
  	  } else {
  	  	return getBaseUrl() + '/show?id='
  	  }
  	}*/
  },
  methods: {
    checkLink (type,encryption) {
      if (type === '商务') {
        return getBaseUrl() + '/bus?id=' + encryption
      } else {
        return getBaseUrl() + '/show?id=' + encryption
      }
    },
  	checkStatus (type) {
  		return this.$t('vstatus')[type]
  	},
  	getList () {
      if (this.empWorkNoCheck) {
        this.getEmpNoList()
      } else {
        this.getPhoneList()
      }
  	},
    getPhoneList () {//SearchRecordsByPhone 替换成 SearchRecordsByEmpNo
      this.$store.dispatch('SearchRecordsByPhone',this.form).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.total = result.count
          this.data = result.list
        }
      })
    },
    getEmpNoList () {
      this.$store.dispatch('SearchRecordsByEmpNo',this.form).then(res => {
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