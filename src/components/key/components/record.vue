<template>
	<div class="boxshadow bgwhite paddinglr30 paddingtb20">
		<el-form ref="form" :inline="true" :model="form" label-width="120px">
			<el-form-item :label="$t('key.equipMark')">
				<el-input v-model="form.deviceCode"></el-input>
			</el-form-item>
			<el-form-item :label="$t('form.phone.text')">
				<el-input v-model="form.mobile"></el-input>
			</el-form-item>
			<el-form-item :label="$t('form.name.text4')">
				<el-input v-model="form.vname"></el-input>
			</el-form-item>
			<el-form-item :label="$t('form.name.text5')">
				<template v-if="!empWorkNoCheck">
					<el-select v-model="form.vtype" >
					  <el-option :label="$t('checkVtype[0]')" value=""></el-option>
				      <el-option :label="$t('people.emp')" value="0"></el-option>
				      <el-option :label="$t('people.inviteVisit')" value="1"></el-option>
				      <el-option :label="$t('people.orderVisit')" value="2"></el-option>
				    </el-select>
				</template>
				<template v-else>
					<el-select v-model="form.vtype" >
					  <el-option :label="$t('checkVtype[0]')" value=""></el-option>
				      <el-option :label="$t('people.emp')" :value="$t('people.emp')"></el-option>
				      <el-option :label="$t('people.visit')" :value="$t('people.visit')"></el-option>
				      <el-option :label="$t('vtype')[3]" :value="$t('vtype')[3]"></el-option>
				    </el-select>
				</template>
				
			</el-form-item>
			<el-form-item :label="$t('form.time.text5')">
				<el-date-picker
			      v-model="date"
			      type="daterange" 
			      range-separator="-"
			      :start-placeholder="$t('vdate[0]')"
			      :end-placeholder="$t('vdate[1]')" @change="setDate">
			    </el-date-picker>
			</el-form-item>
			<el-form-item >
			  <el-button type="primary" @click="getOpendoorInfo">{{$t('btn.searchBtn')}}</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" border>
			<el-table-column prop="deviceName"
	        :label="$t('key.equipeName')" ></el-table-column>
	        <el-table-column prop="deviceCode"
	        :label="$t('key.equipMark')"
	        width="140"></el-table-column>
	        <el-table-column prop="vname"
	        :label="$t('form.name.text4')"
	        width="140"></el-table-column>
	        <template v-if="empWorkNoCheck">
		        <el-table-column prop="company"
		        :label="$t('form.name.text5')" >
		        	<template slot-scope="scope">
		        		{{scope.row.vtype}}
		        	</template>
		        </el-table-column>
	        </template>
	        <template v-else>
	        	<el-table-column prop="company"
		        :label="$t('form.name.text5')" :filters="[{ text: $t('people.emp'), value: '0' }, { text: $t('people.inviteVisit'), value: '1' }, { text: $t('people.orderVisit'), value: '2' }]"
		        width="120" :filter-method="doFilter">
		        	<template slot-scope="scope">
		        		{{scope.row.vtype | judgeVtype}}
		        	</template>
		        </el-table-column>
	        </template>
	        <template v-if="empWorkNoCheck">
	        	<el-table-column prop="company"
		        :label="$t('direction')"
		        width="80"></el-table-column>
	        </template>
	        <template v-else>
	        	<el-table-column prop="company"
			        :label="$t('form.company.text3')"
			        width="180"></el-table-column>
	        </template>
	        <template v-if="empWorkNoCheck">
	        	<el-table-column prop="mobile" :label="$t('peopleNo')"
	            ></el-table-column>
	        </template>
	        <template v-else>
	        	<el-table-column prop="mobile" :label="$t('form.phone.text4')"
	            width="180"></el-table-column>
	        </template>	        
	        <el-table-column prop="openDate"
	        :label="$t('tablehead[2]')" width="180">
	        	<template slot-scope="scope">
	        		{{scope.row.openDate | formatDate}}
	        	</template>
	        </el-table-column>
	        <!-- <template v-if="empWorkNoCheck">
	        	<el-table-column
			        :label="$t('status.text')" width="80">
			        	<template slot-scope="scope">
			        		{{scope.row.openStatus}}
			        	</template>
			        </el-table-column>
	        </template> -->
            <template v-if="!empWorkNoCheck">
            	<el-table-column :label="$t('status.text')" width="100">
	        	<template slot-scope="scope">
	        		{{scope.row.status | judgeRecordStatus}}
	        	</template>
	        </el-table-column>
            </template>
	        
		</el-table>
		<div class="page-footer">
            <el-pagination background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @prev-click="handleCurrentChange"
                @next-click="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="requestedCount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
import { groupStatusText,judgeVtype,judgeRecordStatus } from '@/utils/common'
export default {
  data () {
  	return {
  	  list: [],
  	  total:0,
  	  currentPage: 1,
      requestedCount: 10,
  	  form: {
  	  	userid: getCache('userid'),
  	  	startDate: formatDate(new Date(),'yyyy-MM-dd'),
        endDate: formatDate(new Date(),'yyyy-MM-dd'),
        startIndex: 1,
        requestedCount: 10,
        mobile: '',
        deviceCode: '',
        vtype: '',
        vname: ''
  	  },
  	  empWorkNoCheck: process.env.empWorkNoCheck,
  	  date: [formatDate(new Date(),'yyyy-MM-dd'),formatDate(new Date(),'yyyy-MM-dd')]
  	}
  },
  filters: {
  	groupStatusText: groupStatusText,
  	judgeVtype: judgeVtype,
  	judgeRecordStatus: judgeRecordStatus,
  	formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created () {
  	this.getOpendoorInfo()
  },
  methods: {
  	init () {},
  	doFilter (value, row, column) {
  		console.log(value)
  	},
  	setDate (value) {
  	  this.form.startDate = formatDate(value[0],'yyyy-MM-dd')
  	  this.form.endDate = formatDate(value[1],'yyyy-MM-dd')
  	},
  	handleSizeChange (val) {
  	  this.currentPage = 1
      this.requestedCount = val
      this.form.startIndex = 1
      this.form.requestedCount = val
      this.getOpendoorInfo()  	  
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = (val - 1) * this.requestedCount + 1
      this.getOpendoorInfo()
  	},
  	getOpendoorInfo () {
  	  this.$store.dispatch('getOpendoorInfo',this.form).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result.list
          this.total = result.count
  	  	}
  	  })
  	}
  }
}
</script>