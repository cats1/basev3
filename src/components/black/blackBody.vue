<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20 marginbom20">
		<el-button type="default"><i class="fa fa-user-times"></i>添加黑名单</el-button>
		<el-button type="redline" @click="deleteBlack"><i class="fa fa-trash-o"></i>批量删除</el-button>
	  </div>
	  <div class="boxshadow paddinglr30 paddingtb20">
	  	<el-table :data="list" border  @selection-change="handleSelectionChange">
	  		<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	  		<el-table-column prop="name" label="姓名"></el-table-column>
	  		<el-table-column prop="credentialNo" label="身份证号"></el-table-column>
	  		<el-table-column prop="phone" label="手机号"></el-table-column>
	  	</el-table>
	  	<div class="page-footer">
	  		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="form.startIndex"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="form.requestedCount"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	  	</div>
	  </div>
	  <right-window>
	  	<div>testbody</div>
	  </right-window>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import rightWindow from '@/components/window/rightWindow'
export default {
  components: {rightWindow},
  data () {
  	return {
  	  list: [],
  	  form: {
  	  	'userid': getCache('userid'),
        'credentialNo': "",
        'name': "",
        'phone': "",
        'startIndex': 1,
        'requestedCount': 10
  	  },
  	  total: 0,
  	  dform: {
  	  	userid: getCache('userid'),
  	  	bids: []
  	  }
  	}
  },
  methods: {
  	getList () {
  	  this.$store.dispatch('getBlacklist',this.form).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = result.list
  	  	  this.total = result.count
  	  	}
  	  })
  	},
  	handleSizeChange (val) {
  	  this.form.requestedCount = val
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = val
  	},
  	handleSelectionChange (val) {
  	  //this.clist = val
  	  let _self = this
  	  val.forEach(function(ele,index){
        _self.form.bids.push(ele.bid)
  	  })
  	},
  	deleteBlack () {
      this.$store.dispatch('delBlacklist',this.dform).then(res => {
      	let {status} = res
      	if (status === 0) {
          this.getList()
      	}
      })
  	}
  },
  created () {
  	this.getList()
  },
  mounted () {
      	
  }
}
</script>