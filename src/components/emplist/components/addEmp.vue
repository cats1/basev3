<template>
	<div class="btnsection">
    <el-button @click="editBtn()"><i class="fa fa-user-plus"></i>{{$t('btn.addEmpBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addEmpBtn')"
		  :visible.sync="dialogVisible"
		  width="50%" >
		  <el-form :model="form" :rules="rules" ref="empform" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="avatar">
          <upload-user-photo :photourl="form.avatar" @sendkit="getUserPhoto"></upload-user-photo>
        </el-form-item>
        <el-form-item :label="$t('form.name.text')" prop="empName">
          <el-input v-model="form.empName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.name.text3')" >
          <el-input v-model="form.empNickname"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.depart.text')" >
          <div class="last_inner" @click="setEmpShow">
            <template v-for="item in departArray">
              <span>{{item.name}}</span>
            </template>
          </div>
        </el-form-item>
        <el-form-item :label="$t('form.position.text')" >
          <el-input v-model="form.empPosition"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.phone.text')" prop="empPhone">
          <el-input v-model="form.empPhone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.email.text')" >
          <el-input v-model="form.empEmail"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.position.text1')">
          <el-input v-model="form.empNo"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.phone.text3')" >
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.company.text1')" >
          <el-input v-model="form.workbay"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.gate.text')" prop="egids">
          <gate-group :t-show="false" :check-array="stringToArray(form.egids)" @getclist="getGate"></gate-group>
        </el-form-item>
        <el-form-item :label="$t('form.time.text4')" prop="startDate">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('vtime[0]')"
            :end-placeholder="$t('vtime[1]')" @change="setrange">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('form.remark.text')" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-dialog
      width="50%"
      :title="$t('depart.selectDepart')"
      :visible.sync="innerVisible"
      append-to-body>
        <depart-menu :left-data="dlist" :right-data="cobj" @menukit="setdepart"></depart-menu>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">{{$t('btn.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
        </span>
      </el-dialog>
		  <span slot="footer" class="dialog-footer">
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
export default {
  props: {
    parent: {
      type: Object,
      default: {}
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
    }
  },
  components: {uploadUserPhoto,departMenu,gateGroup},
  data () {
  	return {
  	  dialogVisible: false,
      innerVisible: false,
  	  empform: {
  	  	userid: getCache('userid'),
        employee_name: '',
        empNo: '',
        email: '',
        phone: '',
        empNickname: '',
        empPosition: '',
        emptype: 2,
        telephone: '',
        workbay: '',
        visitType: "",
        subaccountId: 0,
        deptIds: [],
        remark: '',
        avatar: '',
        egids: '',
        startDate: '',
        endDate: ''
  	  },
      form: {
        userid: getCache('userid'),
        empName: '',
        empNo: '',
        empEmail: '',
        empPhone: '',
        emptype: 2,
        empPosition: '',
        telephone: '',
        workbay: '',
        visitType: '面试',
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
          { required: true, message: this.$t('formCheck.validCompany.tip2'), trigger: 'change' },
          { min: 1, message: this.$t('formCheck.validCompany.tip2'), trigger: 'blur' }],
        egids: [
          { required: true, message: this.$t('form.gate.tip'), trigger: 'blur' }],
        empPhone: [
          { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        startDate: [
          { required: true, message: this.$t('formCheck.time.tip2'), trigger: 'blur' }]
  	  },
      dateRange: [],
      parentObj: this.parent,
      proform: {},
      cobj: [],
      departArray: [],
      menuList: []
  	}
  },
  watch: {
    parent (val) {
      console.log(val)
      this.parentObj = val
      //this.departform.parentId = val.pid
      this.cobj.push(val)
      let darray = []
      darray.push(val)
      this.departArray = darray
      if (val.dp === 'root') {
        //this.departform.parentId = ''
      }
    },
    editType (val) {
      console.log(val)
      this.editBtn()
    },
    curEmp (val) {
      console.log(val)
      if (this.editType !== 0) {
        this.form = val
        this.dateRange = [val.startDate,val.endDate]
      }
      
    }
  },
  mounted () {
    if (this.editType !== 0) {
        this.form = this.curEmp
        this.dateRange = [this.curEmp.startDate,this.curEmp.endDate]
    }
  },
  methods: {
    stringToArray: stringToArray,
    editBtn () {
      this.dialogVisible = true
    },
    getUserPhoto (url) {
      this.form.avatar = url
    },
    setrange (val) {
      this.form.startDate = formatDate(new Date(val[0]),'yyyy-MM-dd')
      this.form.endDate = formatDate(new Date(val[1]),'yyyy-MM-dd')
    },
    setEmpShow () {
      this.innerVisible = true
    },
    getGate (val) {
      console.log(val)
      this.form.egids = arrayToString(val)
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
            console.log(this.form)
            if (this.editType === 0) {
              this.addEmployee()
            } else {
              this.updateEmployee()
            }
          } else {
            return false;
          }
        })
    },
    addEmployee () {
      let nform = {
            userid: getCache('userid'),
            employee_name: this.form.empName,
            empNo: this.form.empNo,
            email: this.form.empEmail,
            phone: this.form.empPhone,
            emptype: 2,
            empPosition: this.form.empPosition,
            telephone: this.form.telephone,
            workbay: this.form.workbay,
            visitType: '面试',
            subaccountId: this.form.subaccountId,
            empNickname: this.form.empNickname,
            remark: this.form.remark,
            deptIds: [],
            egids: this.form.egids,
            startDate: formatDate(this.dateRange[0],'yyyyMMdd'),
            endDate: formatDate(this.dateRange[1],'yyyyMMdd')
          }
      this.$store.dispatch('addEmployee',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$refs['empform'].resetFields()
          this.$emit('addempkit')
        }
      })
    },
    updateEmployee () {
      this.$store.dispatch('updateEmployee',this.empform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$refs['empform'].resetFields()
          this.$emit('addempkit')
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
      this.empform.deptIds = arr
      this.innerVisible = false
    },
    setdepart (val) {
      console.log(val)
      this.menuList = val
    }
  }
}
</script>