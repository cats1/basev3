<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20 block bgwhite">
      <add-role-group :parent="parent" @addrolekit="getAddRoleGroup"></add-role-group>
      <add-role :group-list="list" :parent="parent" @updatelist="getAddRole"></add-role>
      <edit-role-group :parent="parent" @editrolekit="getAddRole" @addrolekit="getdeleRole"></edit-role-group>
      <edit-role :group-list="list" :parent="parent" :role-node="roleNode" @updatelist="getAddRole"></edit-role>
      <add-member :parent="parent" :vemp="vempObj" @addempkit="getMember"></add-member>
  		<delete-role-emp :parent="parent" :vemp="vempObj" @delekit="getDelete"></delete-role-emp>
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
          <el-input v-model="sform.name" @change="searchEmp">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
	  			<el-radio-group class="margintop20" v-model="vtype" @change="changeVtype">
			      <el-radio-button label="emplist">{{$t('emplist.pro')}}</el-radio-button>
			      <el-radio-button label="role">{{$t('emplist.com')}}</el-radio-button>
			    </el-radio-group>
			    <div class="roletreewrap">
            <r-tree :list="list" :expandedid="expandedid" :dexpanded="defaultGet" :dprops="defaultProps" @nodeclick="handleNodeClick"></r-tree>
			    </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
	  			<el-table :data="dataList" border @selection-change="handleSelectionChange">
		  			<el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
            <el-table-column
                :label="$t('form.name.text')"
                width="120">
                <template slot-scope="scope" >
                  {{ scope.row.empName }}
                </template>
            </el-table-column>
				    <el-table-column
                :label="$t('form.position.text')">
                <template slot-scope="scope">{{ scope.row.empPosition }}</template>
            </el-table-column>
				    <el-table-column
                :label="$t('form.position.text1')">
                <template slot-scope="scope">{{ scope.row.empNo }}</template>
            </el-table-column>
            <el-table-column
                :label="$t('form.phone.text')">
                <template slot-scope="scope">{{ scope.row.empPhone }}</template>
            </el-table-column>
            <el-table-column
                :label="$t('form.email.text')">
                <template slot-scope="scope">{{ scope.row.empEmail }}</template>
            </el-table-column>
	  		  </el-table>
		  		<div class="page-footer">
  		  		<el-pagination
            background
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
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import rTree from '@/components/tree/rTree'
import { getCache } from '@/utils/auth'
import { getCBarList } from '@/utils/common'
import { addRoleGroup,addRole,editRoleGroup,editRole,addMember,deleteRoleEmp } from './components'
export default {
  components: { addRoleGroup,addRole,editRoleGroup,editRole,addMember,deleteRoleEmp,rTree },
  data () {
  	return {
      list: [],
      total:0,
      currentPage: 1,
      requestedCount: 10,
      dataList:[],
      sform: {
        name: '',
        userid: getCache('userid')
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nform:{
  	  	rid:'',
  	  	requestedCount: 10,
  	  	startIndex:1
  	  },
      parent: {},
      roleNode: {},
      vempObj: [],
      vtype: 'role',
      expandedid: 0,
      defaultGet: [0]
  	}
  },
  created () {
    this.getProjectList()
  },
  methods: {
    searchEmp (val) {
      if (val !== '') {
        this.$store.dispatch('getEmpByName',this.sform).then(res => {
          let {status,result} = res
          if (status === 0) {
            this.dataList = result
            this.total = 0
          }
        })
      }
    },
    getAddRole () {
      this.getProjectList()
      //this.getResidentVisitor()
    },
    getdeleRole () {
      this.getProjectList()
      //this.getResidentVisitor()
    },
    getAddRoleGroup () {
      this.getProjectList()
      //this.getResidentVisitor()
    },
    getMember () {
      this.vempObj = []
      //this.getProjectList()
      this.getResidentVisitor()
    },
    getDelete () {
      this.getProjectList()
      //this.getResidentVisitor()
    },
  	changeVtype (val) {
  	  this.$router.push({name:val})
  	},
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getRARG',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {  	  	  
  	  	  if (result.length > 0) {
            this.list = getCBarList(result,'rgName','rid','childRoleList')
            this.nform.rid = result[0].rid
            this.getResidentVisitor()
  	  	  } else {
            this.list = []
          }
  	  	}
  	  })
  	},
  	getResidentVisitor () {
      let nform = {
        rid: this.nform.rid,
        requestedCount: this.requestedCount,
        startIndex:this.nform.startIndex
      }
  	  this.$store.dispatch('getEmpRoleList',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dataList = result.list
  	  	  this.total = result.count
  	  	}
  	  })	
  	},
  	handleNodeClick(data,node) {
      this.parent = data
      this.defaultGet = [data.pid]
      this.roleNode = node.parent.data
      this.nform.rid = data.pid
      this.nform.startIndex = 1
      this.getResidentVisitor()
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.requestedCount = val
      this.nform.startIndex = 1
  	  this.nform.requestedCount = val
  	  this.getResidentVisitor()
  	},
  	handleCurrentChange (val) {
  	  this.nform.startIndex = (val - 1) * this.requestedCount + 1
  	  this.getResidentVisitor()
  	},
  	handleSelectionChange (val) {
      this.vempObj = val
  	}
  }
}
</script>