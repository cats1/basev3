<template>
	<div class="boxshadow margintop20 paddinglr30 paddingtb20">
		<h3 class="marginbom20 margintop20">{{$t('record')}}{{total}}{{$t('record1')}}{{$t('record2')}}
		  <template v-show="data.length > 0">
		  	<export-set style="float:right;" :vtype="vtype" :nform="nform"></export-set>
		  </template>
		</h3>
		<el-table :data="list" border>
			<el-table-column
		        prop="vname"
		        :label="$t('form.name.text1')">
		        <template slot-scope="scope">
		        	<div class="vphotowrap">
		        		<span class="vphoto"><img :src="scope.row.vphoto" alt=""></span>
			            <span class="vname">{{scope.row.vname}}</span>
		        	</div> 
			    </template>
		    </el-table-column>
		    <el-table-column
		        prop="vphone"
		        :label="$t('form.phone.text1')" width="120">
		    </el-table-column>
		    <el-table-column
		        prop="empName"
		        :label="$t('form.name.text2')">
		    </el-table-column>
		    <el-table-column
		        prop="empPhone"
		        :label="$t('form.phone.text2')" width="120">
		    </el-table-column>
		    <el-table-column
		        prop="visitType"
		        :label="$t('checkVtype[3]')">
		    </el-table-column>
		    <el-table-column
		        prop="vcompany"
		        :label="$t('form.companypro.text2')"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="cardId"
		        :label="$t('form.idnum.text1')"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="vphoto"
		        :label="$t('form.idnum.text2')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.vphoto | setVphoto}}
			    </template>
		    </el-table-column>
		    <el-table-column
		        prop="peopleCount"
		        :label="$t('form.count.text')"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="remark"
		        :label="$t('form.count.text1')"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="remark"
		        :label="$t('form.remark.text')"
		        width="180">
		    </el-table-column>
		    <el-table-column
		        prop="visitdate"
		        :label="$t('form.time.text')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.visitdate | formatDate}}
			    </template>
		    </el-table-column>
		    <el-table-column
		        prop="signOutDate"
		        :label="$t('form.time.text1')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.signOutDate | formatDate}}
			    </template>
		    </el-table-column>
		</el-table>
		<div class="marginbom20 margintop20">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="current"
		      :page-sizes="size"
		      :page-size="page"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>
<script>
import {formatDate} from '@/utils/index'
import exportSet from './exportSet'
export default {
  components: {exportSet},
  props: {
  	vdata: {
  	  type: Array,
  	  default: []
  	},
  	vtype: {
  	  type: Number,
  	  default: 0
  	},
  	nform: {
  	  type: Object,
  	  default: {}
  	}
  },
  data () {
  	return {
  	  data: [],
  	  list: [],
  	  size: [10, 20, 30, 40],
  	  page: 10,
  	  total: 0,
  	  current: 1
  	}
  },
  filters:{
  	formatDate (time) {
  	  let date = new Date(time)
  	  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  	},
  	setVphoto (url) {
      console.log(url)
  	}
  },
  watch: {
  	vdata (val) {
  	  this.data = this.vdata
  	  this.total = this.vdata.length
  	  this.setPage()
  	}
  },
  mounted () {
  	this.data = this.vdata
  	this.setPage()
  },
  methods: {
  	handleSizeChange(val) {
      this.page = val
      this.setPage()
    },
    handleCurrentChange(val) {
      this.current = val
      this.setPage()
    },
    setPage () {
      let start = (this.current-1) * this.page
      let end = (this.current-1) * this.page + this.page
      this.list = this.data.slice(start,end)
    },
    exportSet () {}
  }
}
</script>