<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-form ref="form" :inline="true" :model="form" label-width="120px">
			<el-form-item label="设备标识">
				<el-input v-model="form.deviceCode"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="form.mobile"></el-input>
			</el-form-item>
			<el-form-item label="操作者名称">
				<el-input v-model="form.vname"></el-input>
			</el-form-item>
			<el-form-item label="操作者类型">
				<el-select v-model="form.vtype" >
			      <el-option label="员工" value="0"></el-option>
			      <el-option label="邀请访客" value="1"></el-option>
			      <el-option label="签到访客" value="2"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="操作者时间">
				<el-date-picker
			      v-model="date"
			      type="daterange" 
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期" @change="setDate">
			    </el-date-picker>
			</el-form-item>
			<el-form-item >
			  <el-button type="primary" @click="getOpendoorInfo">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" border>
			<el-table-column prop="egname"
	        label="设备名称" ></el-table-column>
	        <el-table-column prop="egid"
	        label="设备编号"
	        width="180"></el-table-column>
	        <el-table-column prop="egid"
	        label="操作者名称"
	        width="180"></el-table-column>
	        <el-table-column prop="egid"
	        label="操作者类型" :filters="[{ text: '员工', value: '0' }, { text: '邀请访客', value: '1' }, { text: '签到访客', value: '2' }]"
	        width="180" :filter-method="doFilter"></el-table-column>
	        <el-table-column prop="egid"
	        label="所属公司"
	        width="180"></el-table-column>
	        <el-table-column prop="egid"
	        label="电话号码"
	        width="180"></el-table-column>
	        <el-table-column prop="status"
	        label="时间">
	        	<template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	        </el-table-column>
	        <el-table-column
	        label="状态" width="180">
	        	<template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	        </el-table-column>
		</el-table>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
export default {
  data () {
  	return {
  	  list: [],
  	  form: {
  	  	userid: getCache('userid'),
  	  	startDate: formatDate(new Date(),'yyyy-MM-dd'),
        endDate: formatDate(new Date(),'yyyy-MM-dd'),
        startIndex: 0,
        requestedCount: 10,
        mobile: '',
        deviceCode: '',
        vtype: '',
        vname: ''
  	  },
  	  date: [formatDate(new Date(),'yyyy-MM-dd'),formatDate(new Date(),'yyyy-MM-dd')]
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
  	getOpendoorInfo () {
  	  this.$store.dispatch('getOpendoorInfo',this.form).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result.list
  	  	}
  	  })
  	}
  }
}
</script>