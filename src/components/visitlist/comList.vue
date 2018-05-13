<template>
	<div>
	  <div class="boxshadow paddinglr30 bgwhite paddingtb20">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button> 
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow bgwhite margintop20 paddinglr30 paddingtb20">
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
	  		<div class="boxshadow bgwhite margintop20 paddinglr30 paddingtb20">
	  			<el-table :data="dataList" border @selection-change="handleSelectionChange">
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
import {getCache} from '@/utils/auth'
import {getComBarList} from '@/utils/common'
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
  	  	company:'',
  	  	requestedCount: 10,
  	  	startIndex:1,
  	  	userid: getCache('userid')
  	  },
      sform: {
        name: '',
        requestedCount: 10,
        startIndex: 1,
        userid: getCache('userid')
      },
  	  dform: {
  	  	userid: getCache('userid'),
  	  	rids: []
  	  },
      vtype: 'com'
  	}
  },
  created () {
    this.getProjectList()
  },
  methods: {
  	changeVtype (val) {
      this.$emit('typekit',val)
  	},
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getAllResidentCompany',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getComBarList(result,'company','pid','pcount')
  	  	  if (result.length>0) {
            this.nform.company = result[0].company
            this.getResidentVisitor()
  	  	  }
  	  	}
  	  })
  	},
  	getResidentVisitor () {
  	  this.$store.dispatch('getResidentVisitorByCompany',this.nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dataList = result.list
  	  	  this.total = result.count
  	  	}
  	  })	
  	},
  	handleNodeClick(data) {
        this.nform.company = data.name
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
        _self.dform.rids.push(ele.rid)
  	  })
  	},
  	deleteEmp () {
      this.$store.dispatch('delResidentVisitor',this.dform).then(res => {
      	let {status} = res
      	if (status === 0) {
          this.getProjectList()
      	}
      })
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
    }
  }
}
</script>