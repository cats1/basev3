<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20" style="overflow:hidden;">
      <add-pro :btn-type="btnType" @addkit="getaddpro"></add-pro>
      <add-visit :btn-type="btnType" :pro-list="projectList" :pid="nform.pid" @sendav="getaddv" :edit-type="editType" :cur-emp="curEmp" @addemp="getBtnType"></add-visit>
      <edit-pro :epdata="probj" @editpro="getBtnType" @editkit="geteditv"></edit-pro>
      <move-pro :cardarray="cardarray" :pro-list="projectList" @movekit="getmove"></move-pro>
      <make-visit-card :cardarray="cardarray"></make-visit-card>
      <delete-visit :drids="dform.rids" @senddkit="getDev"></delete-visit>
      <send-all-face></send-all-face> 
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
          <el-input v-model="sform.name" @change="searchEmp" :placeholder="$t('searchVnameHolder')">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
	  			<el-radio-group class="margintop20" v-model="vtype" @change="changeVtype">
			      <el-radio-button label="pro">{{$t('project.pro')}}</el-radio-button>
			      <el-radio-button label="com">{{$t('project.com')}}</el-radio-button>
			    </el-radio-group>
			    <div class="emptreewrap">
			    	<el-tree :data="list" :highlight-current="true" node-key="id" :props="defaultProps" :default-expanded-keys="[0]" :default-checked-keys="[1]" @node-click="handleNodeClick"></el-tree>
			    </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
	  			<el-table :data="dataList" border @selection-change="handleSelectionChange" @row-click="checkRow">
		  			<el-table-column
				      type="selection"
				      width="40">
				    </el-table-column>
				    <el-table-column
				      :label="$t('form.name.text')">
				      <template slot-scope="scope">{{ scope.row.name }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('form.company.text')">
				      <template slot-scope="scope">{{ scope.row.company }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('project.proname')">
				      <template slot-scope="scope">{{ scope.row.pName }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('chargePerson')">
				      <template slot-scope="scope">{{ scope.row.leader }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('chargePersonPhone')">
				      <template slot-scope="scope">{{ scope.row.phone }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('workArea')">
				      <template slot-scope="scope">{{ scope.row.area }}</template>
				    </el-table-column>
				    <el-table-column
				      :label="$t('form.time.text4')" width="200">
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
      btnType: 0,
      total:0,
      dataList:[],
      projectList: [],
      sform: {
        name: '',
        requestedCount: 10,
        startIndex: 1,
        userid: getCache('userid')
      },
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
      cardarray: [],
      curEmp: {},
      editType: 0,
      vtype: 'pro'
  	}
  },
  created () {
    this.getProjectList()
  },
  methods: {
  	changeVtype (val) {
      this.$emit('typekit',val)
  	},
    searchEmp (val) {
      if (val !== '') {
        this.$store.dispatch('getResidentVisitorByName',this.sform).then(res => {
          let {status,result} = res
          if (status === 0) {
            this.dataList = result.list
            this.total = result.count
          }
        })
      }
    },
    getaddpro () {
      this.btnType = 0
      this.getProjectList()
    },
    getmove () {
      this.getProjectList()
    },
    getBtnType (val) {
      this.btnType = val
    },
    getaddv (val) {
      this.btnType = 1
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
          this.projectList = result
  	  	  if (result.length>0) {
            this.nform.pid = result[0].pid
            this.probj = result[0]
            this.getResidentVisitor()
  	  	  }
  	  	}
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
  	},
    checkRow (val) {
      this.editType = 1
      this.btnType = 1
      this.curEmp = val
      console.log(val)
    }
  }
}
</script>