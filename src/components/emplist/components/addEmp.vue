<template>
	<div class="btnsection">
    <el-button :type="bType" @click="editBtn()" v-show="btnShow"><i class="fa fa-user-plus"></i>{{$t('btn.addEmpBtn')}}</el-button>
	  <el-dialog
		  :title="winTitle"
		  :visible.sync="dialogVisible"
		  width="600px" @close="handClose">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane :label="$t('btn.editEmpBtn')" name="first">
          <el-form :model="form" :rules="rules" ref="empform" label-width="100px" class="demo-ruleForm">
          <template v-if="!onwork">
            <template v-if="editType === 1">
              <el-form-item class="center">
                <upload-user-photo id="userphoto" :photourl="form.avatar" @sendkit="getUserPhoto"></upload-user-photo>
                <template v-if="!empWorkNoCheck">
                  <reg-face :rform="form" v-show="faceTextShow"></reg-face>
                </template>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item class="center">
                <upload-user-photo :photourl="form.avatar" @sendkit="getUserPhoto"></upload-user-photo>
              </el-form-item>
            </template>
          </template>
          <template v-if="takePhotoShow">
            <el-form-item class="center">
              <user-photo @updateurl="getTakePhoto"></user-photo>
            </el-form-item>
          </template>
          <template v-if="!onwork">
            <el-form-item>
              <el-checkbox v-model="checked" @change="setEmptype">{{$t('emplist.pad')}}</el-checkbox>
              <template v-if="onworkManager">
                <el-checkbox v-model="defaultnotify" @change="setDefaultnotify">{{$t('onWorkManager')}}</el-checkbox>
              </template>              
            </el-form-item>
          </template>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('form.name.text')" prop="empName">
                <el-input v-model="form.empName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item class="is-required" :label="$t('form.depart.text')" >
                <template v-if="empWorkNoCheck">
                  <div class="last_inner noedit" @click="setEmpShow">
                    <template v-for="item in departArray" >
                      <span >{{item.name}}</span>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <div class="last_inner" @click="setEmpShow">
                    <template v-for="item in departArray" >
                      <span >{{item.name}}</span>
                    </template>
                  </div>
                </template>                
              </el-form-item>
              
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('form.name.text3')" >
                <el-input v-model="form.empNickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="$t('form.position.text')" >
                <el-input v-model="form.empPosition"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('entranceGuard')" >
                <el-input v-model="form.cardNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="$t('form.phone.text')" prop="empPhone" v-if="empPhoneCheck">
                <el-input v-model="form.empPhone"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.phone.text')" v-else>
                <el-input v-model="form.empPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('form.email.text')" >
                <el-input v-model="form.empEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="$t('form.position.text1')" prop="empNo" v-if="empWorkNoCheck">
                <template v-if="empnoread">
                  <el-input v-model="form.empNo" :disabled="empnoread"></el-input>
                </template>
                <template v-else>
                  <el-input v-model="form.empNo" ></el-input>
                </template>               
              </el-form-item>
              <el-form-item :label="$t('form.position.text1')" v-else>
                <el-input v-model="form.empNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('form.phone.text3')" >
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="$t('form.company.text1')" v-if="!workbayCheck">
                <el-input v-model="form.workbay"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.company.text1')" v-else>
                <el-select v-model="workbay" multiple style="width:100%">
                  <el-option :key="workValue[0]" :label="$t('floorArray')[0]" :value="workValue[0]"></el-option>
                  <el-option :key="workValue[1]" :label="$t('floorArray')[1]" :value="workValue[1]"></el-option>
                  <el-option :key="workValue[2]" :label="$t('floorArray')[2]" :value="workValue[2]"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <template v-if="agentCheck">
                <el-form-item :label="$t('form.gate.text')" props="egids">
                  <gate-group :t-show="false" :check-array="egids" @getclist="getGate"></gate-group>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item :label="$t('form.gate.text')">
                  <gate-group :t-show="false" :check-array="egids" @getclist="getGate"></gate-group>
                </el-form-item>
              </template>
            </el-col>
          </el-row>            
          <template v-if="!onwork">
            <el-form-item :label="$t('form.time.text4')" prop="startDate">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-" format="yyyyMMdd" value-format="yyyyMMdd"
                :start-placeholder="$t('vtime[0]')"
                :end-placeholder="$t('vtime[1]')" @change="setrange" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </template>
          <template v-if="onwork">
            <el-form-item :label="$t('onWorkReason')" prop="remark">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="$t('form.remark.text')" prop="remark">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </template>
        </el-form>
        </el-tab-pane>
        <template v-if="agentShow && editType == 1">
          <el-tab-pane :label="$t('Proxysettings')" name="second" >
          <el-form :model="proxy" :rules="rules" ref="porxyform" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('agentName')" prop="proxyId">
              <el-select v-model="proxy.proxyId" filterable @change="setEmpProxy">
                <el-option
                  v-for="item in emplist"
                  :key="item.empid"
                  :label="item.empName"
                  :value="item.empid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('agentStatus')" >
              <el-radio-group v-model="proxy.proxyStatus">
                <el-radio :label="0">{{$t('status.forbid')}}</el-radio>
                <el-radio :label="1">{{$t('status.on')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('form.time.text4')" prop="startDate">
              <el-date-picker
                v-model="pdateRange"
                type="daterange"
                range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :start-placeholder="$t('vtime[0]')"
                :end-placeholder="$t('vtime[1]')" @change="setprange">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('Proxylist')" name="third" >
          <el-form :model="iproxy" ref="porxyform1" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('agentName')" >
              <el-select v-model="iproxy.proxyId">
                <el-option
                  v-for="item in iproxyList"
                  :key="item.empid"
                  :label="item.empName"
                  :value="item.empid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        </template>        
      </el-tabs>		  
      <el-dialog
      width="50%"
      :title="$t('depart.selectDepart')"
      :visible.sync="innerVisible"
      append-to-body>
        <depart-menu :menu-type="1" :left-data="dlist" :check-num="10" :right-data="departArray" @menukit="setdepart"></depart-menu>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">{{$t('btn.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
        </span>
      </el-dialog>
		  <span slot="footer" class="dialog-footer" v-show="btnIsShow">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <template v-if="empWorkNoCheck">
          <template v-if="editType == 1">
            <el-button type="info" @click="resetPwd" >{{$t('resetPwd')}}</el-button>
          </template>
          <template v-if="form.empType == 4">
            <el-button type="success" @click="useOnEmp" >{{$t('status.on')}}</el-button>
          </template>
          <template v-else-if="editType == 1 && form.empType !== 4">
            <el-button type="danger" @click="stopEmp" >{{$t('status.off')}}</el-button>
          </template>
        </template>       
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
import {stringToArray,arrayToString,PrefixInteger,isEmptyObject} from '@/utils/common'
import userPhoto from '@/components/photo/userPhoto'
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
  components: {uploadUserPhoto,departMenu,gateGroup,regFace,userPhoto},
  data () {
  	return {
      workValue: [1,2,4],
      btnIsShow: this.btnShow,
      empPhoneCheck: process.env.empPhoneCheck,
      empWorkNoCheck: process.env.empWorkNoCheck,
      agentCheck: process.env.agentCheck || false,
      takePhotoShow: process.env.takePhotoShow || false,
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
        empType: 2,
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
        proxyId: [
          { required: true, message: this.$t('selectAgent'), trigger: 'blur' }],
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
      iproxyList: [],
      proxy: {
        proxyId: '',
        proxyName: '',
        proxyStatus: 0,
        startDate: '',
        endDate: ''
      },
      pdateRange: [],
      iproxy: {
        proxyId: '',
        proxyName: '',
        proxyStatus: 0,
        startDate: '',
        endDate: ''
      },
      workbay: [],
      agentShow: process.env.agentShow || false,
      faceTextShow: false,
      workbayCheck: process.env.workbayCheck || false,
      deptidToString: process.env.deptidToString || false,
      comAddEmpShow: process.env.comAddEmpShow || false,
      defaultnotify: false,
      onworkManager: process.env.onworkManager || false,
      defaultInterviewSet: process.env.defaultInterviewSet || false
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
      if (!this.btnShow) {
        this.dialogVisible = true
      }
      if (!this.dialogShow && !this.btnShow) {
        this.dialogVisible = false
      }
      if (this.editType == 1) {
        this.empnoread = true
      } else {
        this.empnoread = false
      }
      if (!isEmptyObject(val)) {
        this.form = val
        this.getDeptByEmpid()
        if (val.defaultNotify == 2) {
          this.defaultnotify = true
        }
        if (val.egids) {
          this.egids = stringToArray(val.egids)
        }
        if (this.workbayCheck) {
          if (val.workbay == '低') {
            this.workbay = [1]
          } else if (val.workbay == '中') {
            this.workbay = [2]
          } else if (val.workbay == '高') {
            this.workbay = [4]
          } else {
            this.workbay = this.changeNumToArrFloor(parseInt(val.workbay))
          }
        } else {
          this.form.workbay = val.workbay
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
      } else {
        this.checked = false
        this.faceTextShow = false
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
        if (this.editType === 0) {
          return this.$t('btn.addEmpBtn')
        } else {
          return this.$t('btn.editEmpBtn')
        }
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
  },
  methods: {
    stringToArray: stringToArray,
    setEmptype (val) {
      if (val) {
        this.form.empType = 3
      } else {
        this.form.empType = 1
      }
    },
    resetPwd () {
      let nform = {
        'empNo': this.curEmp.empNo,
        'empPwd': '888888'
      }
      this.$store.dispatch('resetEmpPwd',nform).then(res => {})
    },
    handleClick () {
      if (this.activeName2 == 'second') {
        this.proxy = {
          proxyId: '',
          proxyName: '',
          proxyStatus: 0,
          startDate: '',
          endDate: ''
        }
        this.pdateRange = []        
        this.GetEmpList()
      } else if (this.activeName2 == 'third') {
        this.iproxy = {
          proxyId: '',
          proxyName: '',
          proxyStatus: 0,
          startDate: '',
          endDate: ''
        }
        this.getVisitProxyForProxy()
      }
    },
    getDeptByEmpid () {
      let nform = {
        empid: this.form.empid,
        userid: getCache('userid')
      }
      this.$store.dispatch('getDeptByEmpid',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.parentObj = result
          let darray = []
          if (result.length > 0) {            
            result.forEach(function(element, index) {
              let nobj = {
                label: element['deptName'],// + '(' + element[count] + ')',
                name: element['deptName'],
                pid: element['deptid'],
                pcount: 0,
                dp: element['deptManagerEmpid'],
                children: [],
                id: element['deptid'],
                dpno: element['deptNo'],
                dpRole: 'parent',
                strdid: element['strDeptid']
              }
              darray.push(nobj)
            })            
          } else {
              let nobj = {
                label: getCache('company'),// + '(' + element[count] + ')',
                name: getCache('company'),
                pid: '',
                pcount: 0,
                dp: 'root',
                children: [],
                id: 0,
                dpno: 0,
                dpRole: 'root',
                strdid: 0
              }
              darray.push(nobj)
          }
          this.departArray = darray
        }
      })
    },
    getMaxEmpNo (nform) {      
      this.$store.dispatch('getMaxEmpNo',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let parentNo
          if (this.parentObj.dpRole == 'parent') {
            parentNo = '00' + this.parentObj.dpno
          } else if (this.parentObj.dpRole == 'child') {
            parentNo =  this.parentObj.parentno + this.parentObj.dpno
          }
          if (result.length > 0) {
            this.form.empNo = PrefixInteger(result[0] + 1,parentNo,4)
          } else {
            this.form.empNo = PrefixInteger(1,parentNo,4)
          }
        }
      })
    },
    editBtn () {
      if (this.parentObj.dpRole == 'root') {
        if (this.comAddEmpShow) {
          if (this.empWorkNoCheck) {
            if (this.editType == 1) {
              this.$emit('clickit',this.btnType)
              this.dialogVisible = true
              this.empnoread = true
            } else {
              this.$message({
                showClose: true,
                message: this.$t('pleaseDepart'),
                type: 'warning'
              })
            }
          } else {
            this.$emit('clickit',this.btnType)
            this.dialogVisible = true
            this.empnoread = true
            if (this.editType == 1) {
              this.empnoread = true
            } else {
              this.empnoread = false
            }
          }
        } else {
          if (!this.curEmp.empid) {
            this.$message({
              showClose: true,
              message: this.$t('comAddEmpShowText'),
              type: 'warning'
            })
            this.$emit('clickit',0)
          } else {
            this.$emit('clickit',this.btnType)
            this.dialogVisible = true
            this.empnoread = true
            if (this.editType == 1) {
              this.empnoread = true
            } else {
              this.empnoread = false
            }
          }         
        }
      } else {
        this.$emit('clickit',this.btnType)
        this.dialogVisible = true
        this.empnoread = true
        if (this.editType == 1) {
          this.empnoread = true
        } else {
          /*if (this.parentObj.dpRole == 'parent') {
            let nform = {
              userid: getCache('userid'),
              deptid: this.parentObj.id,
              deptNo: this.parentObj.dpno
            }
            this.getMaxEmpNo(nform)
          } else if (this.parentObj.dpRole == 'child') {
            let nform = {
              userid: getCache('userid'),
              deptid: this.parentObj.parentid,
              deptNo: this.parentObj.parentno
            }
            this.getMaxEmpNo(nform)
          }*/
          this.empnoread = false
          if (this.empWorkNoCheck) {
            let nform = {
              userid: getCache('userid'),
              deptid: this.parentObj.id,
              deptNo: this.parentObj.dpno
            }
            this.getMaxEmpNo(nform)
          }
        }
      }
      this.activeName2 = 'first'
    },
    getTakePhoto (url) {
      this.form.avatar = url
      this.regPhoto()
    },
    getUserPhoto (url) {
      this.form.avatar = url
      //this.regPhoto()
    },
    setrange (val) {
      this.form.startDate = new Date(val[0])
      this.form.endDate = new Date(val[1])
    },
    setprange (val) {
      this.proxy.startDate = val[0]
      this.proxy.endDate = val[1]
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
          this.getVisitProxyForProxy()
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
          if (result) {
            this.proxy.proxyId = result.proxyId
            this.proxy.proxyName = result.proxyName
            this.proxy.proxyStatus = result.proxyStatus
            this.proxy.startDate = formatDate(new Date(result.startDate),'yyyy-MM-dd')
            this.proxy.endDate = formatDate(new Date(result.endDate),'yyyy-MM-dd')
            this.$set(this.pdateRange,0,formatDate(new Date(result.startDate),'yyyy-MM-dd'))
            this.$set(this.pdateRange,1,formatDate(new Date(result.endDate),'yyyy-MM-dd'))
          }
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
          if (result.length > 0) {
            this.iproxy.proxyId = result[0].empid
            this.iproxyList = []
            let _self = this
            if (result.length > 0) {
              result.forEach(function(element,index){
                if (element.proxyStatus == 1) {
                  _self.iproxyList.push(element)
                }
              })
            }
          }
        }
      })
    },
    saveProject () {
      if (this.agentShow) {
        if (this.activeName2 == 'first') {
          this.saveEmpDetail()
        } else if (this.activeName2 == 'second') {
          this.setVisitProxy()
        } else if (this.activeName2 == 'third') {
          //console.log(888)
        }
      } else {
        this.saveEmpDetail()
      }  
    },
    changeNumToArrFloor (num) {
      if (num == 1 || num == 2 || num == 4) {
        return [num]
      } else if (num == 3) {
        return [1,2]
      } else if (num == 5) {
        return [1,4]
      } else if (num == 6) {
        return [2,4]
      } else if (num == 7) {
        return [1,2,4]
      } else {
        return []
      }
    },
    changeArrToFloor (arr) {
      let num = 0
      if (arr.length > 0) {
        for(let i = 0;i<arr.length;i++) {
          num += parseInt(arr[i])
        }
      }

      /*arr.forEach(function(element, index) {
        num += parseInt(element)
      })*/
      return num
    },
    saveEmpDetail () {
        this.$refs['empform'].validate((valid) => {
          if (valid) {
            let darray = []
            let _self = this
            this.departArray.forEach(function(element,index){
              if (!_self.deptidToString) {
                if (element.pid !=='') {
                  darray.push(element.pid)
                }
              } else {
                if (element.strdid !=='') {
                  darray.push(element.strdid)
                }
              }
            })
            /*if (darray[0] == 0) {
              this.form.deptIds = [-1]
            } else {
              this.form.deptIds = darray
            }*/
            this.form.deptIds = darray
            if (this.editType === 0) {
              this.addEmployee()
            } else {
              let workbay
              if (this.workbayCheck) {
                workbay = this.changeArrToFloor(this.workbay)  
              } else {
                workbay = this.form.workbay
              }
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
                    emptype: this.form.empType,
                    endDate: this.dateRange[1],
                    phone: this.form.empPhone || '',
                    remark: this.form.remark  || '',
                    startDate: this.dateRange[0],
                    subaccountId: 0,
                    telephone: this.form.telephone,
                    userid: getCache('userid'),
                    visitType: '',
                    workbay: workbay
                }
                this.updateEmployee(nform)
            }
          } else {
            return false;
          }
        })
    },
    setEmpProxy (val) {
      let _self = this
      this.emplist.forEach(function(element, index){
        if (element.empid == val) {
          _self.proxy.proxyName = element.empName
        }
      })
    },
    setVisitProxy () {
      this.$refs['porxyform'].validate((valid) => {
        if (valid) {
          let nform = {
            userid: getCache('userid'),
            empid: this.form.empid,
            empName: this.form.empName,
            proxyId: this.proxy.proxyId,
            proxyName: this.proxy.proxyName,
            proxyStatus: this.proxy.proxyStatus,
            startDate: this.pdateRange[0],//,new Date(startDate),
            endDate: this.pdateRange[1]//new Date(endDate)
          }
          this.$store.dispatch('setVisitProxy',nform).then(res => {
            let {status} = res
            if (status === 0) {
            }
          })
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
        emptype: this.form.empType,
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
          this.empnoread = false
          this.egids = []
          this.form = {
            userid: getCache('userid'),
            avatar: '',
            empName: '',
            empNo: '',
            cardNo: '',
            empEmail: '',
            empPhone: '',
            empType: 2,
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
          }
          this.$refs['empform'].resetFields()
          this.$refs['empform'].clearValidate()
          this.dateRange = []
          this.$emit('addempkit',this.parent)
        }
      })
    },
    useOnEmp () {
      let darray = []
      let _self = this
      this.departArray.forEach(function(element,index){
        if (!_self.deptidToString) {
          if (element.pid !=='') {
            darray.push(element.pid)
          }
        } else {
          if (element.strdid !=='') {
            darray.push(element.strdid)
          }
        }
      })
      this.form.deptIds = darray
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
          emptype: 2,
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
      this.updateEmployee(nform)
    },
    stopEmp () {
      this.$confirm(this.$t('confirmStopEmp'),this.$t('outTip.desc'), {
              confirmButtonText: this.$t('outTip.conform'),
              cancelButtonText: this.$t('outTip.cancel'),
              type: 'warning',
              center: true
          }).then(() => {
            this.doStopEmp()         
          }).catch(() => { })
    },
    doStopEmp () {
      let darray = []
      let _self = this
      this.departArray.forEach(function(element,index){
        if (!_self.deptidToString) {
          if (element.pid !=='') {
            darray.push(element.pid)
          }
        } else {
          if (element.strdid !=='') {
            darray.push(element.strdid)
          }
        }
      })
      this.form.deptIds = darray
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
          emptype: 4,
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
      this.updateEmployee(nform)
    },
    updateEmployee (nform) {
      this.$store.dispatch('updateEmployee',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.empnoread = false
          this.dateRange = []
          this.egids = []
          this.form = {
            userid: getCache('userid'),
            avatar: '',
            empName: '',
            empNo: '',
            cardNo: '',
            empEmail: '',
            empPhone: '',
            empType: 2,
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
          }
          this.$refs['empform'].resetFields()
          this.$refs['empform'].clearValidate()
          this.$emit('updateempkit',this.form)
        }
      })
    },
    regPhoto () {
      let nform = {
        userid: getCache('userid'),
        empids: [this.form.empid]
      }
      this.$store.dispatch('updateFace',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.form.face = 0
        }
      })
    },
    saveSelect () {
      this.departArray = this.menuList
      let arr = []
      let _self = this
      this.departArray.forEach(function(element, index) {
        if(!_self.deptidToString){
          if (element.pid !=='') {
            arr.push(element.pid)
          }
        } else {
          if (element.strdid !=='') {
            arr.push(element.strdid)
          }
        }
      })
      this.form.deptIds = arr
      this.innerVisible = false
    },
    setdepart (val) {
      this.menuList = val
    },
    handClose () {
      this.dialogVisible = false
      this.empnoread = false
      this.dateRange = []
      this.egids = []
      this.defaultnotify = false
      this.form = {
        userid: getCache('userid'),
        avatar: '',
        empName: '',
        empNo: '',
        cardNo: '',
        empEmail: '',
        empPhone: '',
        empType: 2,
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
      }
      this.$refs['empform'].resetFields()
      this.$refs['empform'].clearValidate()
      this.$emit('closeempkit',this.form)
      
    },
    setDefaultnotify (val) {
      let defaultnotify = 0
      if (val) {
        defaultnotify = 2
      }
      let nform = [{
        'employeeid': this.form.empid,
        'defaultnotify': defaultnotify
      }]
      this.$store.dispatch('updateDefaultNotify',nform)
    }
  }
}
</script>