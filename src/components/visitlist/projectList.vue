<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20">
		<el-button>添加项目</el-button>
		<el-button>添加访客</el-button>
		<el-button>编辑项目</el-button>
		<el-button>调整项目</el-button>
		<el-button>生成访客卡</el-button>
		<el-button type="redline">批量删除</el-button>
		<el-button type="redline">下发全部人脸</el-button>  
	  </div>
	  <el-row :gutter="20" class="margintop20">
	  	<el-col :span="6" class="boxshadow paddinglr30 paddingtb20">
	  		<el-radio-group v-model="vtype">
		      <el-radio-button label="0">项目列表</el-radio-button>
		      <el-radio-button label="1">公司列表</el-radio-button>
		    </el-radio-group>
		    <div>
		    	<el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		    </div>
	  	</el-col>
	  	<el-col :span="18" class="boxshadow paddinglr30 paddingtb20">
	  		<el-table :data="dataList" border @selection-change="handleSelectionChange">
	  			<el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="姓名"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.name }}</template>
			    </el-table-column>
			    <el-table-column
			      label="公司名称"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.company }}</template>
			    </el-table-column>
			    <el-table-column
			      label="项目名称"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.pName }}</template>
			    </el-table-column>
			    <el-table-column
			      label="负责人"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.leader }}</template>
			    </el-table-column>
			    <el-table-column
			      label="负责人手机"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.phone }}</template>
			    </el-table-column>
			    <el-table-column
			      label="工作区域"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.area }}</template>
			    </el-table-column>
			    <el-table-column
			      label="服务期限"
			      width="120">
			      <template slot-scope="scope">{{ scope.row.startDate }}-{{ scope.row.endDate }}</template>
			    </el-table-column>
	  		</el-table>
	  		<div class="page-footer">
	  		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="nform.startIndex"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="nform.requestedCount"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	  	</div>
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {getBarList} from '@/utils/common'
export default {
  data () {
  	return {
      vtype:'0',
      list: [],
      total:0,
      dataList:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nform:{
  	  	pid:'',
  	  	requestedCount: 10,
  	  	startIndex:1
  	  }
  	}
  },
  created () {
    console.log(this.$router)
    this.getProjectList()
  },
  methods: {
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getProject',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getBarList(result)
  	  	  if (result.length>0) {
            this.nform.pid = result[0].pid
            this.getResidentVisitor()
  	  	  }
  	  	  console.log(this.list)
  	  	} else {}
  	  })
  	},
  	getResidentVisitor () {
  	  this.$store.dispatch('getResidentVisitor',this.nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dataList = result.list
  	  	  this.total = result.count
  	  	} else {}
  	  })	
  	},
  	handleNodeClick(data) {
        this.nform.pid = data.pid
        this.nform.startIndex = 1
        this.getResidentVisitor()
    },
    handleSizeChange (val) {
  	  this.form.requestedCount = val
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = val
  	},
  	handleSelectionChange (val) {
  	  //this.clist = val
  	  /*let _self = this
  	  val.forEach(function(ele,index){
        _self.form.bids.push(ele.bid)
  	  })*/
  	}
  }
}
</script>