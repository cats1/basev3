<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20 block">
      <add-depart :parent="parent" :dlist="list" @addkit="getAddkit"></add-depart>
      <add-emp :parent="parent" :dlist="list" @addempkit="getAddkit"></add-emp>
      <export-address-list @exportkit="changeExport"></export-address-list>
      <edit-depart :parent-node="parentNode" :parent="parent" :dlist="list" @addkit="getAddkit" :emp-list="dataList"></edit-depart>
      <move-depart :parent="parent" :dlist="list" :semp="sempArray" @movekit="getmove"></move-depart>
      <delete-emp :semp="sempArray" @delekit="getDelete"></delete-emp>
  		<send-all-face></send-all-face>
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
          <el-input v-model="sform.name" @change="searchEmp">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
	  			<el-radio-group class="margintop20" v-model="vtype" @change="changeVtype">
			      <el-radio-button label="group"><router-link to="/group">{{$t('emplist.pro')}}</router-link></el-radio-button>
			      <el-radio-button label="role"><router-link to="/role">{{$t('emplist.com')}}</router-link></el-radio-button>
			    </el-radio-group>
			    <div class="emptreewrap">
			    	<el-tree :data="list" :highlight-current="true" node-key="id" :default-expanded-keys="[0]" :default-checked-keys="[1]" :props="defaultProps" @getNode="getNode" @node-click="handleNodeClick"></el-tree>
			    </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >        
        <div class="" v-if="rightType === 0">
          <use-excel @changetype="getChangetype"></use-excel>
        </div>
        <div class="" v-else-if="rightType === 1">
          <use-rtx @changetype="getChangetype"></use-rtx>
        </div>
        <div class="" v-else-if="rightType === 2">
          <use-ding @changetype="getChangetype"></use-ding>
        </div>
        <div class="" v-else-if="rightType === 3">
          <div class="boxshadow margintop20 paddinglr30 paddingtb20">
            <el-table :data="dataList" border @selection-change="handleSelectionChange" @row-click="editEmp">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                :label="$t('form.name.text')"
                width="120">
                <template slot-scope="scope" >
                  {{ scope.row.empName }}
                    <span class="mangericon" v-show="checkIsManager(scope.row.empid)" >{{$t('visitor.manager')}}</span>
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
        </div>
        <div class="" v-else-if="rightType === 4">
          <change-upload-type :etype="rightType" @comfirmkit="confirmBack" @cancelkit="cancelBack"></change-upload-type>
        </div>
	  	</el-col>
	  </el-row>
    <el-dialog
      :title="$t('visitor.editEmp')"
      :visible.sync="dialogVisible"
      width="50%">
      <emp-detail :parent="parent" :dlist="list" :cur-emp="curEmp" @updateempkit="getUpdateEmp" @deleempkit="getDeleteEmp"></emp-detail>
    </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {getCgBarList} from '@/utils/common'
import {addDepart,addEmp,editDepart,moveDepart,deleteEmp,sendAllFace,empDetail} from './components'
import {exportAddressList,useExcel,useRtx,useDing,changeUploadType} from '@/components/upload'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  components: {addDepart,addEmp,editDepart,deleteEmp,exportAddressList,useExcel,useRtx,useDing,changeUploadType,moveDepart,sendAllFace,empDetail},
  data () {
  	return {
      list: [],
      total:0,
      dataList:[],
      dialogVisible: false,
      sform: {
        name: '',
        userid: getCache('userid')
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nform:{
  	  	deptid:'',
  	  	requestedCount: 10,
  	  	startIndex:1,
  	  	userid: getCache('userid')
  	  },
      rform:{
        requestedCount: 10,
        startIndex:1,
        userid: getCache('userid')
      },
      deform: {
        empids: [],
        userid: getCache('userid')
      },
      faceform: {
        userid: getCache('userid')
      },
      dtype: 0,
      parent: {},
      rightType: 3,
      parentNode: {},
      sempArray: [],
      curEmp: {}
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
    this.getEmpListPages()
  },
  methods: {
    getUpdateEmp () {
      this.dialogVisible = false
      this.getProjectList()
      this.getEmpList()
    },
    getDeleteEmp () {
      this.dialogVisible = false
      this.getProjectList()
      this.getEmpList()
    },
    editEmp (row, event, column) {
      console.log(row)
      this.curEmp = row
      this.dialogVisible = true
    },
    searchEmp (val) {
      console.log(val)
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
  	changeVtype (val) {
  	  if(val === 'group') {
  	  	this.$router.push({path:'/'})
  	  } else {
  	  	this.$router.push({path:'/role'})
  	  }
  	},
    checkIsManager (eid) {
      let eArray = stringToArray(this.parent.dp)
      let flag = false
      eArray.forEach(function(ele,index){
        if (parseInt(eid) === parseInt(ele)) {
          flag = true
        }
      })
      return flag
    },
    confirmBack (type) {
      this.rightType = type
    },
    cancelBack () {
      this.changeExport()
    },
    getChangetype (type) {
      this.rightType = type
    },
    changeExport () {
      if (getCache('rtxip') && getCache('rtxport')) {
        this.rightType = 1
      } else if (getCache('ddnotify') === 1) {
        this.rightType = 2
      } else {
        this.rightType = 0
      }
    },
    getAddkit () {
      this.getProjectList()
      this.getEmpList()
    },
    getDelete () {
      this.getProjectList()
      this.getEmpList()
    },
    getmove () {
      this.getProjectList()
      this.getEmpList()
    },
    getEmpList () {
      if (this.dtype === 0) {
        this.getEmpListPages()
      } else {
        this.getResidentVisitor()
      } 
    },
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getDeptList',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getCgBarList(result,'deptName','deptid','empCount','deptManagerEmpid','childDeptList')
          console.log(this.list)
          this.parent = this.list[0]
  	  	}
  	  })
  	},
  	getResidentVisitor () {
  	  this.$store.dispatch('getEmpDeptList',this.nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dataList = result.list
  	  	  this.total = result.count
  	  	} else {}
  	  })	
  	},
    getEmpListPages () {
      this.$store.dispatch('getEmpListPages',this.rform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.dataList = result.list
          this.total = result.count
        } else {}
      })  
    },
    getNode (data) {
      console.log(data)
    },
  	handleNodeClick(data,node,d) {
      console.log(data)
      this.parentNode = node.parent.data
      this.parent = data
      if (data.dp === 'root') {
        this.dtype = 0
        this.rform.startIndex = 1
        this.getEmpListPages()
      } else {
        this.dtype = 1
        this.nform.deptid = data.pid
        this.nform.startIndex = 1
        this.getResidentVisitor()
      }        
    },
    handleSizeChange (val) {
      if (this.dtype === 0) {
        this.rform.requestedCount = val
        this.getEmpListPages()
      } else {
        this.nform.requestedCount = val
        this.getResidentVisitor()
      }  	  
  	},
  	handleCurrentChange (val) {
      if (this.dtype === 0) {
        this.rform.startIndex = (val - 1) * this.rform.requestedCount + 1
        this.getEmpListPages()
      } else {
        this.nform.startIndex = (val - 1) * this.nform.requestedCount + 1
        this.getResidentVisitor()
      }
  	},
  	handleSelectionChange (val) {
  	  //this.clist = val
  	  let _self = this
      this.sempArray = val
  	  val.forEach(function(ele,index){
        _self.deform.empids.push(ele.empid)
  	  })
  	}
  }
}
</script>