<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20" style="overflow:hidden;">
      <add-pro @addkit="getaddpro"></add-pro>
      <add-visit :pid="nform.pid" @sendav="getaddv"></add-visit>
      <edit-pro :epdata="probj" @editkit="geteditv"></edit-pro>
      <move-pro :cardarray="cardarray" @movekit="getmove"></move-pro>
      <make-visit-card :cardarray="cardarray"></make-visit-card>
      <delete-visit :drids="dform.rids" @senddkit="getDev"></delete-visit>
      <send-all-face></send-all-face> 
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
	  			<el-radio-group v-model="vtype" @change="changeVtype">
			      <el-radio-button label="pro"><router-link to="/">{{$t('project.pro')}}</router-link></el-radio-button>
			      <el-radio-button label="com"><router-link to="/com">{{$t('project.com')}}</router-link></el-radio-button>
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
				      label="工作区域">
				      <template slot-scope="scope">{{ scope.row.area }}</template>
				    </el-table-column>
				    <el-table-column
				      label="服务期限">
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
	  	  </div>
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import {addPro,addVisit,editPro,movePro,makeVisitCard,deleteVisit,sendAllFace} from './components'
import {getCache} from '@/utils/auth'
import {getBarList} from '@/utils/common'
export default {
  components: {addPro,addVisit,editPro,movePro,makeVisitCard,deleteVisit,sendAllFace},
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
  	  	pid:'',
  	  	requestedCount: 10,
  	  	startIndex:1,
  	  	userid: getCache('userid')
  	  },
  	  dform: {
  	  	userid: getCache('userid'),
  	  	rids: []
  	  },
      probj: {},
      cardarray: []
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
  	  if(val === 'pro') {
  	  	this.$router.push({path:'/'})
  	  } else {
  	  	this.$router.push({path:'/com'})
  	  }
  	},
    getaddpro () {
      this.getProjectList()
    },
    getmove () {
      this.getProjectList()
    },
    getaddv (val) {
      if (val === this.nform.pid) {
        this.getResidentVisitor()
      }
    },
    geteditv () {
      this.getProjectList()
    },
    getDev () {
      this.getProjectList()
      this.getResidentVisitor()
    },
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getProject',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getBarList(result,'pName','pid','pcount')
  	  	  if (result.length>0) {
            console.log(result[0])
            this.nform.pid = result[0].pid
            this.probj = result[0]
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
  	  this.getResidentVisitor()
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = (val - 1) * this.form.requestedCount + 1
  	  this.getResidentVisitor()
  	},
  	handleSelectionChange (val) {
  	  let _self = this
      this.cardarray = val
  	  val.forEach(function(ele,index){
        _self.dform.rids.push(ele.rid)
  	  })
  	}
  }
}
</script>