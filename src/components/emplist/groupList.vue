<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20">
      <add-depart :parent="parent" @addkit="getAddkit"></add-depart>
      <add-emp :parent="parent" :dlist="list" @addempkit="getAddkit"></add-emp>
      <export-address-list @exportkit="changeExport"></export-address-list>
      <edit-depart :parent-node="parentNode" :parent="parent" :dlist="list" @addkit="getAddkit" :emp-list="dataList"></edit-depart>
  		<el-button><i class="fa fa-unsorted"></i>{{$t('btn.moveDepart')}}</el-button>
  		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
  		<el-button type="redline" @click="sendEmpFace"><i class="fa fa-picture-o"></i>{{$t('btn.sendFaceBtn')}}</el-button>  
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
	  			<el-radio-group v-model="vtype" @change="changeVtype">
			      <el-radio-button label="group"><router-link to="/">{{$t('emplist.pro')}}</router-link></el-radio-button>
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
            <el-table :data="dataList" border @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="姓名"
                width="120">
                <template slot-scope="scope">
                  {{ scope.row.empName }}
                    <span class="mangericon" v-show="checkIsManager(scope.row.empid)">主管</span>
                </template>
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
        </div>
        <div class="" v-else-if="rightType === 4">
          <change-upload-type :etype="rightType" @comfirmkit="confirmBack" @cancelkit="cancelBack"></change-upload-type>
        </div>
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {getCgBarList} from '@/utils/common'
import {addDepart,addEmp,editDepart} from './components'
import {exportAddressList,useExcel,useRtx,useDing,changeUploadType} from '@/components/upload'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  components: {addDepart,addEmp,editDepart,exportAddressList,useExcel,useRtx,useDing,changeUploadType},
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
      parentNode: {}
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
  	  val.forEach(function(ele,index){
        _self.deform.empids.push(ele.empid)
  	  })
  	},
  	deleteEmp () {
      this.$store.dispatch('batchDelEmployee',this.deform).then(res => {
          let {status} = res
          if (status === 0) {
            if (this.dtype === 0) {
              this.getEmpListPages()
            } else {
              this.getResidentVisitor()
            } 
          }
      })
  	},
    sendEmpFace () {
      this.$store.dispatch('updateAllFace',this.faceform)
    }
  }
}
</script>