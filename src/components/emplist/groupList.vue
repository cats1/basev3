<template>
	<div>
    <template v-if="!empAddMenuShow">
  	  <div class="boxshadow paddinglr30 paddingtb20 block bgwhite">
        <add-depart :btn-type="btnType" :parent="parent" :dlist="list" @addkit="getAddkit" @clickit="changeRightType"></add-depart>
        <add-emp :btn-type="btnType" :parent="parent" :edit-type="editType" :cur-emp="curEmp" :dlist="list" @addempkit="getAddEmpkit" @updateempkit="getUpdatekit" @closeempkit="getClosekit" @clickit="changeRightType"></add-emp>
        <export-address-list @exportkit="changeExport"></export-address-list>
        <edit-depart :parent-node="parentNode" :parent="parent" :dlist="list" @addkit="getAddkit" :emp-list="dataList" @clickit="changeRightType"></edit-depart>
        <move-depart :parent="parent" :dlist="list" :semp="sempArray" @movekit="getmove" @clickit="changeDepart"></move-depart>
        <template v-if="!empWorkNoCheck">
          <delete-emp :semp="sempArray" @delekit="getDelete" @clickit="changeRightType"></delete-emp>
        </template>
    		<send-all-face></send-all-face>
        <template v-if="empWorkNoCheck">
          <export-emp-list></export-emp-list>
        </template>
        <template v-if="operatorSet">
          <operator-set></operator-set>
        </template>
  	  </div>
    </template>
    <template v-else>
      <show-emp-detail :btn-type="btnType" :parent="parent" :edit-type="editType" :cur-emp="curEmp" :dlist="list" @addempkit="getAddEmpkit" @updateempkit="getUpdatekit" @closeempkit="getClosekit" @clickit="changeRightType"></show-emp-detail>
    </template>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
          <!-- <el-autocomplete v-model="sform.name" :fetch-suggestions="querySearchAsync" value-key="empName" :trigger-on-focus="false" @select="handleSelect" :placeholder="$t('sempholder1')">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-autocomplete> -->
          <template v-if="empNoSearchShow">
            <div class="borderstyle">
              <el-col :span="8" style="padding-left:0;padding-right:0;">
                <el-select class="selectinput" v-model="searchType">
                  <el-option key="0"
                    :label="$t('form.name.text')"
                    value="0">
                  </el-option>
                  <el-option key="1"
                    :label="$t('form.position.text1')"
                    value="1">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16" style="padding-left:0;padding-right:0;">
                <input type="text" class="inputnoborder" v-model="sform.name" @keydown="searchEmpNo($event)">
                <!-- <el-input v-model="sform.name" suffix-icon="el-icon-search" @change="searchEmp">
                </el-input> -->
              </el-col> 
            </div>      
          </template>
          <template v-else>
            <div class="borderstyle" style="position:relative;">
              <input type="text" class="inputnoborder" :placeholder="$t('form.name.text')" v-model="sform.name" @keydown="searchEmpNo($event)">
              <i slot="prefix" class="el-input__icon el-icon-search" style="position:absolute;top:0;right:0;"></i>
            </div>
            <!-- <el-input v-model="sform.name" @change="searchEmp" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input> -->
          </template>          
	  			<el-radio-group class="margintop20" v-model="vtype" @change="changeVtype">
			      <el-radio-button label="emplist">{{$t('emplist.pro')}}</el-radio-button>
			      <el-radio-button label="role">{{$t('emplist.com')}}</el-radio-button>
			    </el-radio-group>
			    <div class="emptreewrap">
            <l-tree :list="list" :expandedid="expandedid" :dexpanded="defaultGet" :dprops="defaultProps" @nodeclick="handleNodeClick"></l-tree>
			    </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >        
        <div class="" v-if="rightType === 2">
          <export-address-book :utype="exportType"></export-address-book>
        </div>
        <div class="" v-else >
          <div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite" style="height:617px;">
            <el-table class="emptable" :data="dataList" max-height="485" border @selection-change="handleSelectionChange" @row-click="editEmp" :row-class-name="tableRowClassName">
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
                  <template v-if="defaultInterviewSet">
                    <span class="mangericon" v-show="checkIsReciver(scope.row.empid)" >{{$t('defaultInterviewPerson')}}</span>
                  </template>
                  
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
        </div>
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import $ from 'jquery'
import {getCache,setCache} from '@/utils/auth'
import {getCgBarList} from '@/utils/common'
import {addDepart,addEmp,editDepart,moveDepart,deleteEmp,sendAllFace,empDetail,exportAddressBook,exportEmpList,showEmpDetail,operatorSet} from './components'
import {exportAddressList,useExcel,useRtx,useDing,changeUploadType} from '@/components/upload'
import lTree from '@/components/tree/lTree'
import {stringToArray,arrayToString,replaceRemoveReserveQuotation,replaceRemoveQuotation} from '@/utils/common'
export default {
  components: {addDepart,addEmp,editDepart,deleteEmp,exportAddressList,useExcel,useRtx,useDing,changeUploadType,moveDepart,sendAllFace,empDetail,exportAddressBook,lTree,exportEmpList,showEmpDetail,operatorSet},
  data () {
  	return {
      empTotal: 0,
      defaultOpen: [0],
      defaultGet: [0],
      expandedid: 0,
      list: [],
      total:0,
      currentPage: 1,
      requestedCount: 10,
      dataList:[],
      dialogVisible: false,
      btnType: 0,
      editType: 0,
      searchType: '0',
      sform: {
        name: '',
        //empNo: '',
        //empName: '',
        userid: getCache('userid')
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nform:{
  	  	deptid:'',
  	  	requestedCount: 10,
  	  	startIndex:0,
  	  	userid: getCache('userid'),
        strDeptid: ''
  	  },
      rform:{
        requestedCount: 10,
        startIndex:0,
        //name: '',
        //empNo: '',
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
      rightType: 0,
      parentNode: {},
      sempArray: [],
      curEmp: {},
      vtype: 'emplist',
      sname: '',
      restaurants: [],
      timeout:  null,
      whiteListShow: process.env.whiteListShow || false,
      empWorkNoCheck: process.env.empWorkNoCheck || false,
      searchFlag: false,
      empAddMenuShow: process.env.empAddMenuClose || false,
      deptidToString: process.env.deptidToString || false,
      comAddEmpShow: process.env.comAddEmpShow || false,
      empNoSearchShow: process.env.empNoSearchShow || false,
      getEmpByEmpName: process.env.getEmpByEmpName || false,
      operatorSet: process.env.operatorSet || false,
      departVnoSet: process.env.departVnoSet || false,
      defaultInterviewSet: process.env.defaultInterviewSet || false
  	}
  },
  computed: {
    exportType: {
      get: function () {
        if (this.$route.query.export) {
          this.rightType = 2
        }
        if (this.$route.query.export === 'dd') {
          return 2
        } else if (this.$route.query.export === 'rtx') {
          return 1
        } else if (this.$route.query.export === 'excel') {
          return 0
        } else {
          return 0
        }
      },
      set: function () {} 
    }
  },
  watch: {
    empTotal (val) {
      setCache('empTotal',val)
    }
  },
  created () {
    this.getEmployeeCount()
  },
  mounted () {    
    this.getProjectList()
  },
  methods: {
    getEmployeeCount () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getEmployeeCount',nform).then(res => {
        let {status,result} = res
        if (status == 0) {
          this.empTotal = result.empcount
        }
      })
    },
    GetEmpList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status == 0) {
          this.empTotal = result.length
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (row.empType === 4) {
        return 'off-row'
      } else {
        return 'on-row'
      }
    },
    changeDepart (val) {
      this.rightType = val
    },
    changeRightType (val) {
      this.rightType = val
      this.getProjectList()
      this.getEmpList()
    },
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
      this.editType = 1
      this.curEmp = row
      this.editType = 1
    },
    getAddEmpkit (data) {
      this.defaultGet = [data.id]
      this.expandedid = parseInt(data.id)
      this.editType = 0
      this.curEmp = {}
      this.getProjectList()
      this.getEmpList()
      this.getEmployeeCount()
    },
    getAddkit () {
      this.editType = 0
      this.curEmp = {}
      this.getProjectList()
      this.getEmpList()
    },
    getClosekit (data) {
      let nullArray = []
      let deptid = parseInt(data.deptid)
      nullArray.push(deptid)
      this.defaultOpen = nullArray
      this.defaultGet = nullArray
      this.expandedid = deptid
      //deptid
      this.editType = 0
      this.curEmp = {}
      this.searchFlag = false
      //this.getProjectList()
      this.getEmpList()
    },
    getUpdatekit (data) {
      let nullArray = []
      let deptid = parseInt(data.deptid)
      nullArray.push(deptid)
      this.defaultOpen = nullArray
      this.defaultGet = nullArray
      this.expandedid = deptid
      //deptid
      this.editType = 0
      this.curEmp = {}
      //this.getProjectList()
      this.getEmpList()
    },
  	changeVtype (val) {
  	  this.$router.push({name:val})
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
    checkIsReciver (eid) {
      let receiver = replaceRemoveQuotation(this.parent.receiver)
      let sreceiver = JSON.stringify(receiver)
      let areceiver = JSON.parse(sreceiver)
      let aempid = ''
      if (areceiver.indexOf('name') > 0 && areceiver.indexOf('empid') > 0) {
        let array = areceiver.split(/name|}]/g)[1]
        let objArray = array.split(/\"|\:|\,/g)
        let aname = objArray[3]
        aempid = objArray[8]
      }     
      let flag = false
      if (aempid == eid) {
        flag = true
      }
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
    changeExport (val) {
      this.rightType = val
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
  	  	  this.list = getCgBarList(result,'deptName','deptid','empCount','deptManagerEmpid','childDeptList','deptNo','strDeptid','vMaxCount','defaultNotify','defaultReceiver')
          this.getEmpList()
          if (JSON.stringify(this.parent) == "{}") {
            this.parent = this.list[0]
          }
  	  	}
  	  })
  	},
  	getResidentVisitor () {
      let nform = {
        deptid:this.nform.deptid,
        requestedCount: this.nform.requestedCount,
        startIndex: this.nform.startIndex,
        userid: getCache('userid')
      }
      //-8817945845315714000
      if (this.deptidToString) {
        nform = {
          deptid: this.nform.strDeptid,//this.nform.deptid.toString(),
          requestedCount: this.nform.requestedCount,
          startIndex: this.nform.startIndex,
          userid: getCache('userid')
        }
      }
  	  this.$store.dispatch('getEmpDeptList',nform).then(res => {
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
    getNode (data) {},
  	handleNodeClick(data,node,d) {
      this.searchFlag = false
      this.defaultGet = [data.id]
      this.rightType = 1
      this.parentNode = node.parent.data
      this.parent = data
      //this.defaultGet = [parseInt(data.id)]
      if (data.dp === 'root') {
        this.dtype = 0
        this.rform.startIndex = 1
        this.getEmpListPages()
      } else {
        this.dtype = 1
        this.nform.deptid = data.pid
        this.nform.strDeptid = data.strdid
        this.nform.startIndex = 1
        this.getResidentVisitor()
      }        
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.requestedCount = val
      if (this.dtype === 0) {
        this.rform.startIndex = 1
        this.rform.requestedCount = val
        this.getEmpListPages()
      } else {
        this.nform.startIndex = 1
        this.nform.requestedCount = val
        this.getResidentVisitor()
      }	  
  	},
  	handleCurrentChange (val) {
      if (this.dtype === 0) {
        this.rform.startIndex = (val - 1) * this.requestedCount + 1
        this.getEmpListPages()
      } else {
        this.nform.startIndex = (val - 1) * this.requestedCount + 1
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
  	},
    searchEmpNo (event) {
      if(event.keyCode == 13) {
        if (this.searchType == 0) {
          this.searchEmp(this.sform.name)
        } else {
          this.searchEmpByNo()
        }        
      }
    },
    searchEmpByNo (val) {
      if (val !== '') {
        let nform = {
          empName: '',
          empNo: this.sform.name,
          userid: getCache('userid')
        }
        this.$store.dispatch('getEmpByName',nform).then(res => {
          let {status,result} = res
          if (status === 0) {
            this.dataList = result
            this.total = 0
          }
        })
      }
    },
    searchEmp (val) {
      if (val !== '') {
        let nform = {
          name: val,
          userid: this.sform.userid
        }
        if (this.getEmpByEmpName) {
          nform = {
            empName: val,
            userid: this.sform.userid
          }
        }
        this.$store.dispatch('getEmpByName',nform).then(res => {
          let {status,result} = res
          if (status === 0) {
            this.dataList = result
            this.total = 0
          }
        })
      }
    },
    querySearchAsync(queryString, cb) {
      this.$store.dispatch('getEmpByName',this.sform).then(res => {
          let {status,result} = res
          if (status === 0) {
            this.restaurants = result
            let restaurants = this.restaurants
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 1000 * Math.random())
          }
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.empName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect(item) {
      let varray = []
      varray.push(item)
      this.searchFlag = true
      this.dataList = varray
      this.total = 1
    }
  }
}
</script>