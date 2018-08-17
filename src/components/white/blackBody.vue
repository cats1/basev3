<template>
	<div>
	  <div class="boxshadow bgwhite paddinglr30 paddingtb20 marginbom20">
		<el-button type="default" @click="addWhite"><i class="fa fa-user-circle"></i>{{$t('addWhiteBtn')}}</el-button>
		<el-button type="redline" @click="deleEmpWlist()"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	  </div>
	  <div class="boxshadow bgwhite paddinglr30 paddingtb20">
	  	<el-table :data="list" border  @selection-change="handleSelectionChange" @row-click="showEmp">
	  		<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	  		<el-table-column prop="empName" :label="$t('form.name.text')"></el-table-column>
	  		<el-table-column prop="empNo" :label="$t('form.position.text1')"></el-table-column>
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
	  <el-dialog
      :title="$t('addWhiteBtn')"
      :visible.sync="dialogVisible"
      width="30%" @close="closeWins">
      <el-form :model="curEmp" ref="blackform" :rules="rules" :inline="true" label-position="right" label-width="100px">
        <el-form-item prop="empName" :label="$t('form.name.text')">
          <el-select v-model="curEmpid" filterable placeholder="请选择" @change="setEmp">
            <el-option
              v-for="item in emplist"
              :key="item.empid"
              :label="item.empName"
              :value="item.empid"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  :label="$t('form.position.text1')">
          <el-input v-model="curEmp.empNo" readonly="true"></el-input>
        </el-form-item>        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="addBlack">{{$t('btn.saveBtn')}}</el-button>
      </span>
    </el-dialog>
    <emp-new-detail :btn-show="false" :parent="parent" :btn-type="btnType" :edit-type="editType" :cur-emp="selectCurEmp" :dlist="dlist" :dialog-show="dialogShow" @updateempkit="getUpdatekit"></emp-new-detail>
	</div>
</template>
<script>
import {getCgBarAllList} from '@/utils/common'
import {empNewDetail} from '@/components/emplist/components'
import {getCache} from '@/utils/auth'
import rightWindow from '@/components/window/rightWindow'
import { isvalidatPhone, checkIdCard } from '@/utils/validate'
export default {
  components: {rightWindow,empNewDetail},
  data () {
    const isvalidPhone = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!isvalidatPhone(value)) {
        callback(new Error(this.$t('validphone.tip1')))
      } else {
        callback()
      }
    }
    const isvalidIdNum = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (checkIdCard(value) !== '验证通过!') {
        callback(new Error(checkIdCard(value)))
      } else {
        callback()
      }
    }
  	return {
  	  list: [],
      emplist: [],
      sarray: [],
      curEmpid: '',
      curEmp: {
        empName: '',
        empid: ''
      },
      dialogShow: false,
  	  form: {
  	  	'userid': getCache('userid'),
        'empid': '',
        'startIndex': 1,
        'requestedCount': 10
  	  },
      rules: {
        empName: [
          { required: true, message: this.$t('formCheck.validName.tip3'), trigger: 'blur' }
        ],
        phone: [{ required: false,trigger: 'blur', validator: isvalidPhone }],
        credentialNo: [{ required: false,trigger: 'blur', validator: isvalidIdNum }]
      },
  	  total: 0,
  	  dform: {
  	  	userid: getCache('userid'),
  	  	bids: []
  	  },
      editType: 0,
      dialogVisible: false,
      selectCurEmp: {},
      btnType: 1,
      editType: 1,
      dlist: [],
      parent: {}
  	}
  },
  computed: {
    dTitle () {
      if (this.editType === 0) {
        return this.$t('black.wins.title')
      } else if (this.editType === 1) {
        return this.$t('black.wins.title')
      }
    }
  },
  methods: {
    showEmp (val) {
      this.parent = {}
      this.getDeptByEmpid(val.empid)
      this.dialogShow = true
      this.editType = 1
      this.selectCurEmp = val
    },
    getDeptByEmpid (type) {
      let nform = {
        empid: type,
        userid: getCache('userid')
      }
      this.$store.dispatch('getDeptByEmpid',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          if (result.length > 0) {
            let nobj = {
              label: result[0].deptName + '(' + result[0].empCount + ')',
              name: result[0].deptName,
              pid: result[0].parentId,
              pcount: result[0].empCount,
              dp: result[0].deptName,
              children: [],
              id: result[0].deptid
            }
            this.parent = nobj
          }
        }
      })
    },
  	getList () {
      let nform = {
        'startIndex': this.form.startIndex,
        'requestedCount': this.form.requestedCount,
        'empName': '',
        'empNo': '',
        'userid': getCache('userid')
      }
  	  this.$store.dispatch('getEmpWlist',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = result.list
  	  	  this.total = result.count
  	  	}
  	  })
  	},
    getAllEmpList () { //GetEmpList
      let nform = {
        'userid': getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          if (result.length > 0) {
            let _self = this
            let newEmplist = []
            result.forEach(function(element, index) {
              let obj = element
              obj.disabled = false
              _self.list.forEach(function(lelement, lindex) {
                if (element.empid == lelement.empid) {
                  obj.disabled = true
                }
              })
              newEmplist.push(obj)
            })
            this.emplist = newEmplist
          } else {
            this.emplist = []
          }
        }
      })
    },
    setEmp (val) {
      let _self = this
      this.emplist.forEach(function(item){
        if (parseInt(item.empid) === parseInt(val)) {
          _self.curEmp = item
        }
      })
    },
    addWhite () {
      this.dialogVisible = true
      this.getAllEmpList()
    },
  	handleSizeChange (val) {
  	  this.form.requestedCount = val
      this.getList()
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = (val - 1) * this.form.requestedCount + 1
      this.getList()
  	},
  	handleSelectionChange (val) {
  	  let _self = this
      _self.sarray = []
  	  val.forEach(function(ele,index){
        let nform = {
          empid: ele.empid,
          wlist: 0,
          empNo: ele.empNo
        }
        _self.sarray.push(nform)
  	  })
  	},
    deleEmpWlist () {
      let nform = {}
      if (this.sarray.length > 0) {
        nform = this.sarray
        this.setEmpWlist(nform,1)
      } else {
        this.$message({
          showClose: true,
          message: this.$t('selectEmpTip'),
          type: 'error'
        })
      }
    },
    setEmpWlist (nform,type) {
      this.$store.dispatch('setEmpWlist', nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          if (type !== 0) {
            this.$refs.blackform.resetFields()
            this.$refs.blackform.clearValidate()
            this.curEmp = {}
            this.curEmpid = ''
          }
          this.getList()
        }
      })
    },
    addBlack () {
      this.$refs.blackform.validate((valid) => {
        if (valid) {
            let nform = [{
              empid: this.curEmp.empid,
              empNo: this.curEmp.empNo,
              wlist: 1
            }]
            this.setEmpWlist(nform,0)
        }
      })
    },
    getUpdatekit (data) {
      this.editType = 0
      this.dialogShow = false
      this.selectCurEmp = {}
      this.getList()
    },
    closeWins () {
      this.$refs.blackform.resetFields()
      this.$refs.blackform.clearValidate()
      this.curEmp = {}
      this.curEmpid = ''
    }
  },
  created () {
    this.getList()
  },
  mounted () {
      	
  }
}
</script>