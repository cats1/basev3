<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button> 
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
	  			<el-radio-group v-model="vtype" @change="changeVtype">
			      <el-radio-button label="group"><router-link to="/">{{$t('project.pro')}}</router-link></el-radio-button>
			      <el-radio-button label="role"><router-link to="/role">{{$t('project.com')}}</router-link></el-radio-button>
			    </el-radio-group>
			    <div>
			    	<el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			    </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
	  			<el-table :data="dataList" border @selection-change="handleSelectionChange">
		  			<el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      label="姓名"
				      width="120">
				      <template slot-scope="scope">{{ scope.row.empName }}</template>
				    </el-table-column>
				    <el-table-column
				      label="职位">
				      <template slot-scope="scope">{{ scope.row.empPosition }}</template>
				    </el-table-column>
				    <el-table-column
				      label="工号">
				      <template slot-scope="scope">{{ scope.row.empNo }}</template>
				    </el-table-column>
				    <el-table-column
				      label="手机号">
				      <template slot-scope="scope">{{ scope.row.empPhone }}</template>
				    </el-table-column>
				    <el-table-column
				      label="邮箱">
				      <template slot-scope="scope">{{ scope.row.empEmail }}</template>
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
	  	    </div>
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {getCBarList} from '@/utils/common'
export default {
  data () {
  	return {
      list: [],
      total:0,
      dataList:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nform:{
  	  	rid:'',
  	  	requestedCount: 10,
  	  	startIndex:1
  	  },
  	  dform: {
  	  	rid: '',
  	  	empids: []
  	  }
  	}
  },
  computed: {
  	vtype: {
  	  get: function () {
  	  	return this.$route.name
  	  },
  	  set: function () {}
  	}
  },
  created () {
    this.getProjectList()
  },
  methods: {
  	changeVtype (val) {
  	  if(val === 'group') {
  	  	this.$router.push({path:'/'})
  	  } else {
  	  	this.$router.push({path:'/role'})
  	  }
  	},
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getRARG',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getCBarList(result,'rgName','rid','childRoleList')
          console.log(this.list)
  	  	  if (result.length>0) {
            this.nform.rid = result[0].rid
            this.getResidentVisitor()
  	  	  }
  	  	}
  	  })
  	},
  	getResidentVisitor () {
  	  this.$store.dispatch('getEmpRoleList',this.nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dataList = result.list
  	  	  this.total = result.count
  	  	}
  	  })	
  	},
  	handleNodeClick(data) {
        this.dform.rid = data.pid
        this.nform.rid = data.pid
        this.nform.startIndex = 1
        this.getResidentVisitor()
    },
    handleSizeChange (val) {
  	  this.form.requestedCount = val
  	  this.getResidentVisitor()
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = (val - 1) * this.form.requestedCount + 1
  	  this.getResidentVisitor()
  	},
  	handleSelectionChange (val) {
  	  //this.clist = val
  	  let _self = this
  	  val.forEach(function(ele,index){
        _self.dform.empids.push(ele.empid)
  	  })
  	},
  	deleteEmp () {
      this.$store.dispatch('delRoleEmp',this.dform).then(res => {
      	let {status} = res
      	if (status === 0) {
          this.getProjectList()
      	}
      })
  	}
  }
}
</script>