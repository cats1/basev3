<template>
	<div class="btnsection">
    <el-button :type="bType" @click="editBtn()" v-show="btnShow"><i class="fa fa-user-plus"></i>{{$t('btn.addEmpBtn')}}</el-button>
	  <el-dialog
		  :title="winTitle"
		  :visible.sync="dialogVisible"
		  width="50%" @close="handClose">
          <el-form :model="form" :rules="rules" ref="empform" label-width="100px" class="demo-ruleForm">
          <template v-if="!onwork">
            <template v-if="editType === 1">
              <el-form-item class="center" :class="{'noedit':empnoread}">
                <upload-user-photo id="userphoto" :photourl="form.avatar" @sendkit="getUserPhoto"></upload-user-photo>
                <template v-if="!empWorkNoCheck">
                  <reg-face :rform="form" v-show="faceTextShow"></reg-face>
                </template>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item >
                <upload-user-photo :photourl="form.avatar" @sendkit="getUserPhoto"></upload-user-photo>
              </el-form-item>
            </template>
          </template>
          <template v-if="!onwork">
            <el-form-item>
              <el-checkbox v-model="checked" @change="setEmptype" :disabled="empnoread">{{$t('emplist.pad')}}</el-checkbox>
            </el-form-item>
          </template>      
          <el-form-item :label="$t('form.name.text')" prop="empName">
            <el-input v-model="form.empName" :readonly="empnoread"></el-input>
          </el-form-item>
          <template v-if="!onwork">
            <el-form-item :label="$t('form.name.text3')" >
              <el-input v-model="form.empNickname" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item class="is-required" :label="$t('form.depart.text')" >
              <div class="last_inner" @click="setEmpShow" :class="{'noedit':empnoread}">
                <template v-for="item in departArray" >
                  <span >{{item.name}}</span>
                </template>
              </div>
            </el-form-item>
            <el-form-item :label="$t('form.position.text')" >
              <el-input v-model="form.empPosition" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('entranceGuard')" >
              <el-input v-model="form.cardNo" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.phone.text')" prop="empPhone" v-if="empPhoneCheck">
              <el-input v-model="form.empPhone" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.phone.text')" v-else>
              <el-input v-model="form.empPhone" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.email.text')" >
              <el-input v-model="form.empEmail" :readonly="empnoread"></el-input>
            </el-form-item>
          </template>
          <el-form-item :label="$t('form.position.text1')" prop="empNo" v-if="empWorkNoCheck">
            <el-input v-model="form.empNo" :readonly="empnoread"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.position.text1')" v-else>
            <el-input v-model="form.empNo" :readonly="empnoread"></el-input>
          </el-form-item>
          <template v-if="!onwork">
            <el-form-item :label="$t('form.phone.text3')" >
              <el-input v-model="form.telephone" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.company.text1')" v-if="!workbayCheck">
              <el-input v-model="form.workbay" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.company.text1')" prop="workbay" v-else>
              <el-input v-model="form.workbay" :readonly="empnoread"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.gate.text')">
              <gate-group :t-show="false" :check-array="egids" @getclist="getGate" :class="{'noedit':empnoread}"></gate-group>
            </el-form-item>
            <el-form-item :label="$t('form.time.text4')" prop="startDate">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-" format="yyyyMMdd" value-format="yyyyMMdd"
                :start-placeholder="$t('vtime[0]')"
                :end-placeholder="$t('vtime[1]')" @change="setrange" :class="{'noedit':empnoread}">
              </el-date-picker>
            </el-form-item>
          </template>
          <template v-if="onwork">
            <el-form-item :label="$t('onWorkReason')" prop="remark">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark" :readonly="empnoread"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="$t('form.remark.text')" prop="remark">
              <el-input v-model="form.remark" :readonly="empnoread"></el-input>
            </el-form-item>
          </template>
        </el-form>	  
      <el-dialog
      width="50%"
      :title="$t('depart.selectDepart')"
      :visible.sync="innerVisible"
      append-to-body>
        <depart-menu :left-data="dlist" :check-num="10" :right-data="departArray" @menukit="setdepart"></depart-menu>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">{{$t('btn.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
        </span>
      </el-dialog>
		  <span slot="footer" class="dialog-footer" v-show="btnIsShow">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {uploadUserPhoto} from '@/components/upload'
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
import departMenu from '@/components/menu/departMenu'
import {gateGroup} from '@/components/account/components'
import {stringToArray,arrayToString} from '@/utils/common'
import regFace from './regFace'
export default {
  props: {
    parent: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dlist: {
      type: Array,
      default: []
    },
    editType: {
      type: Number,
      default: 0
    },
    curEmp: {
      type: Object,
      default: {}
    },
    btnType: {
      type: Number,
      default: 1
    },
    btnShow: {
      type: Boolean,
      default: true
    },
    dialogShow: {
      type: Boolean,
      default: false
    },
    onwork: {
      type: Boolean,
      default: false
    }
  },
  components: {uploadUserPhoto,departMenu,gateGroup,regFace},
  data () {
  	return {
      btnIsShow: this.btnShow,
      empPhoneCheck: process.env.empPhoneCheck,
      empWorkNoCheck: process.env.empWorkNoCheck,
      activeName2: 'first',
  	  dialogVisible: false,
      innerVisible: false,
      bType: 'default',
      checked: false,
      empnoread: false,
      form: {
        userid: getCache('userid'),
        avatar: '',
        empName: '',
        empNo: '',
        cardNo: '',
        empEmail: '',
        empPhone: '',
        emptype: 2,
        empPosition: '',
        telephone: '',
        workbay: '',
        visitType: '',
        subaccountId: '',
        empNickname: '',
        remark: '',
        deptIds: [],
        egids: '',
        startDate: '',
        endDate: ''
      },
  	  rules: {
        avatar: [
          {required: true, message: this.$t('form.photo.tip'), trigger: 'blur'}],
  	  	empName: [
          { required: true, message: this.$t('formCheck.validName.tip5'), trigger: 'blur' }],
        deptIds: [
          { required: true, message: this.$t('formCheck.validCompany.tip2'), trigger: 'blur' },
          { min: 1, message: this.$t('formCheck.validCompany.tip2'), trigger: 'blur' }],
        egids: [
          { required: true, message: this.$t('form.gate.tip'), trigger: 'blur' }],
        empPhone: [
          { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        workbay: [
          { required: true, message: this.$t('workbayIsNotNull'), trigger: 'blur' }],
        empNo: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }],
        startDate: [
          { required: true, message: this.$t('formCheck.time.tip2'), trigger: 'blur' }]
  	  },
      dateRange: [],
      parentObj: this.parent,
      proform: {},
      cobj: [],
      departArray: [],
      menuList: [],
      egids: [],
      emplist: [],
      proxy: {
        proxyId: '',
        proxyName: '',
        proxyStatus: 0
      },
      agentShow: process.env.agentShow || false,
      faceTextShow: false,
      workbayCheck: process.env.workbayCheck || false
  	}
  },
  watch: {
    parent (val) {
      this.parentObj = val
      this.cobj.push(val)
      let darray = []
      if (val.name) {
        darray.push(val)
      }
      this.departArray = darray
      if (val.dp === 'root') {
        //this.departform.parentId = ''
      }
    },
    btnShow (val) {
      this.btnIsShow = val
    },
    dialogShow (val) {
      if (!val) {
        this.dialogVisible = false
      }
    },
    editType (val) {
      if (val === 1) {
        this.editBtn()
      }
    },
    curEmp (val) {
      console.log(val)
      if (!this.btnShow) {
        this.dialogVisible = true
      }
      if (!this.dialogShow && !this.btnShow) {
        this.dialogVisible = false
      }
      this.form = val
      if (val.egids) {
        this.egids = stringToArray(val.egids)
      }
      if (val.empNo) {
        this.empnoread = true
      }
      if (val.empType === 3) {
        this.checked = true
      } else {
        this.checked = false
      }
      if (val.avatar && val.face !== 0) {
        this.faceTextShow = true
      } else {
        this.faceTextShow = false
      }
      if (val.startDate) {
        this.dateRange[0] = val.startDate
        this.$set(this.dateRange,0,val.startDate)
      }
      if (val.endDate) {
        this.dateRange[1] = val.endDate
        this.$set(this.dateRange,1,val.endDate)
      }
    },
    btnType (val) {
      if (val === 1) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  computed: {
    winTitle: {
      get () {
        return this.$t('empTitle')
      },
      set () {}
    }
  },
  mounted () {    
    if (this.btnType === 1) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
    /*if (this.editType !== 0) {
      this.form = this.curEmp
      this.dateRange = [this.curEmp.startDate,this.curEmp.endDate]
    }*/
  },
  methods: {
    stringToArray: stringToArray,
    setEmptype (val) {
      if (val) {
        this.form.emptype = 3
      } else {
        this.form.emptype = 1
      }
    },
    handleClick () {
      if (this.activeName2 == 'second') {
        this.GetEmpList()
      } else if (this.activeName2 == 'third') {

      }
    },
    editBtn () {
      this.$emit('clickit',this.btnType)
      this.dialogVisible = true
    },
    getUserPhoto (url) {
      this.form.avatar = url
    },
    setrange (val) {
      this.form.startDate = new Date(val[0])
      this.form.endDate = new Date(val[1])
    },
    setEmpShow () {
      this.innerVisible = true
    },
    getGate (val) {
      this.egids = val
      this.form.egids = arrayToString(val)
    },
    GetEmpList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.emplist = result
          this.getVisitProxyForEmp()
        }
      })
    },
    getVisitProxyForEmp () {
      let nform = {
        userid: getCache('userid'),
        empid: this.form.empid
      }
      this.$store.dispatch('getVisitProxyForEmp',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          console.log(result)
        }
      })
    },
    getVisitProxyForProxy () {
      let nform = {
        userid: getCache('userid'),
        proxyId: this.form.empid
      }
      this.$store.dispatch('getVisitProxyForProxy',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          console.log(result)
        }
      })
    },
    saveProject () {
        this.$refs['empform'].validate((valid) => {
          if (valid) {
            let darray = []
            this.departArray.forEach(function(element,index){
              if (element.pid !=='') {
                darray.push(element.pid)
              }
            })
            this.form.deptIds = darray
            if (this.editType === 0) {
              this.addEmployee()
            } else {              
              if (this.activeName2 == 'first') {
                this.updateEmployee()
              } else {
                this.setVisitProxy()
              }
            }
          } else {
            return false;
          }
        })
    },
    setVisitProxy () {
      let nform = {
        userid: getCache('userid'),
        empid: this.form.empid,
        empName: this.form.empName,
        proxyId: this.proxy.proxyId,
        proxyName: this.proxy.proxyName,
        proxyStatus: this.proxy.status,
        startDate: '',//,new Date(startDate),
        endDate: ''//new Date(endDate)
      }
      this.$store.dispatch('setVisitProxy',nform).then(res => {
        let {status} = res
        if (status === 0) {
        }
      })
    },
    addEmployee () {
      let nform = {
        avatar: this.form.avatar || '',
        deptIds: this.form.deptIds,
        egids: this.form.egids,
        email: this.form.empEmail  || '',
        empNickname: this.form.empNickname || '',
        empNo: this.form.empNo  || '',
        cardNo: this.form.cardNo  || '',
        empPosition: this.form.empPosition  || '',
        employee_name: this.form.empName,
        employeeid: this.form.empid,
        emptype: this.form.emptype,
        endDate: this.dateRange[1],
        phone: this.form.empPhone || '',
        remark: this.form.remark  || '',
        startDate: this.dateRange[0],
        subaccountId: 0,
        telephone: this.form.telephone  || '',
        userid: getCache('userid'),
        visitType: '',
        workbay: this.form.workbay
      }
      this.$store.dispatch('addEmployee',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.egids = []
          this.$refs['empform'].resetFields()
          this.$refs['empform'].clearValidate()
          this.dateRange = []
          this.$emit('addempkit')
        }
      })
    },
    updateEmployee () {
      let nform = {
          avatar: this.form.avatar || '',
          deptIds: this.form.deptIds,
          egids: this.form.egids,
          email: this.form.empEmail,
          empNickname: this.form.empNickname  || '',
          empNo: this.form.empNo  || '',
          cardNo: this.form.cardNo  || '',
          empPosition: this.form.empPosition  || '',
          employee_name: this.form.empName,
          employeeid: this.form.empid,
          emptype: this.form.emptype,
          endDate: this.dateRange[1],
          phone: this.form.empPhone || '',
          remark: this.form.remark  || '',
          startDate: this.dateRange[0],
          subaccountId: 0,
          telephone: this.form.telephone,
          userid: getCache('userid'),
          visitType: '',
          workbay: this.form.workbay
      }
      this.$store.dispatch('updateEmployee',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.dateRange = []
          this.egids = []
          this.$refs['empform'].resetFields()
          this.$refs['empform'].clearValidate()
          this.$emit('updateempkit',this.form)
        }
      })
    },
    saveSelect () {
      this.departArray = this.menuList
      let arr = []
      this.departArray.forEach(function(element, index) {
        if (element.pid !=='') {
          arr.push(element.pid)
        }
      })
      this.form.deptIds = arr
      this.innerVisible = false
    },
    setdepart (val) {
      this.menuList = val
    },
    handClose () {
      this.$emit('updateempkit',this.form)
      this.dateRange = []
      this.egids = []
      this.$refs['empform'].resetFields()
      this.$refs['empform'].clearValidate()
    }
  }
}
</script>