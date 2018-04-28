<template>
	<div>
		<el-form :model="empform" :rules="rules" ref="empform" label-width="100px" class="demo-ruleForm">
	        <el-form-item prop="avatar">
	          <upload-user-photo :photourl="empform.avatar" @sendkit="getUserPhoto"></upload-user-photo>
	        </el-form-item>
	        <el-form-item :label="$t('form.name.text')" prop="employee_name">
	          <el-input v-model="empform.employee_name"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.name.text3')" >
	          <el-input v-model="empform.empNickname"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.depart.text')" >
	          <div class="last_inner" @click="setEmpShow">
	            <template v-for="item in departArray">
	              <span>{{item.name}}</span>
	            </template>
	          </div>
	        </el-form-item>
	        <el-form-item :label="$t('form.position.text')" >
	          <el-input v-model="empform.empPosition"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.phone.text')" prop="phone">
	          <el-input v-model="empform.phone"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.email.text')" >
	          <el-input v-model="empform.email"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.position.text1')">
	          <el-input v-model="empform.empNo"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.phone.text3')" >
	          <el-input v-model="empform.telephone"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.company.text1')" >
	          <el-input v-model="empform.workbay"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('form.gate.text')" prop="egids">
	          <gate-group :t-show="false" :check-array="stringToArray(empform.egids)" @getclist="getGate"></gate-group>
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
	          <el-input v-model="empform.remark"></el-input>
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
	        <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
	        <el-button type="redline" @click="saveDelete">{{$t('btn.deleteBtn')}}</el-button>
	        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
	    </span>
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
  props: ['parent','dlist','curEmp'],
  components: {uploadUserPhoto,departMenu,gateGroup},
  data () {
  	return {
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
  	  rules: {
        avatar: [
          {required: true, message: this.$t('form.photo.tip'), trigger: 'blur'}],
  	  	employee_name: [
          { required: true, message: this.$t('formCheck.validName.tip5'), trigger: 'blur' }],
        deptIds: [
          { required: true, message: this.$t('formCheck.validCompany.tip2'), trigger: 'change' },
          { min: 1, message: this.$t('formCheck.validCompany.tip2'), trigger: 'blur' }],
        egids: [
          { required: true, message: this.$t('form.gate.tip'), trigger: 'blur' }],
        phone: [
          { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        startDate: [
          { required: true, message: this.$t('formCheck.time.tip2'), trigger: 'blur' }]
  	  },
  	  menuList: [],
  	  departArray: [],
  	  dform: {
  	  	userid: getCache('userid'),
  	  	empids: []
  	  },
  	  dateRange: [],
  	  cobj: []
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
    curEmp (val) {
    	console.log(val)
      let arr = []
      arr.push(val.empid)
      this.dform.empids = arr
      this.empform = {
      	avatar: val.avatar,
      	deptIds: val.deptIds,
      	egids: val.egids,
      	email: val.empEmail,
      	empNickname: val.empNickname,
      	empNo: val.empNo,
      	empPosition: val.empPosition,
      	employee_name: val.empName,
      	employeeid: val.empid,
      	emptype: val.empType,
      	endDate: val.endDate,
      	phone: val.empPhone,
      	remark: val.remark,
      	startDate: val.startDate,
      	subaccountId: val.subaccountId,
      	telephone: val.telephone,
      	userid: val.userid,
      	visitType: val.visitType,
      	workbay: val.workbay
      }
    }
  },
  methods: {
  	stringToArray: stringToArray,
  	setEmpShow () {
      this.innerVisible = true
    },
    getUserPhoto (url) {
      this.empform.avatar = url
    },
    getGate (val) {
      console.log(val)
      this.empform.egids = arrayToString(val)
    },
    setrange (val) {
      this.empform.startDate = formatDate(new Date(val[0]),'yyyy-MM-dd')
      this.empform.endDate = formatDate(new Date(val[1]),'yyyy-MM-dd')
    },
    setdepart (val) {
      console.log(val)
      this.menuList = val
    },
    saveSelect () {
      this.departArray = this.menuList
      //this.empform.deptIds = 
      let arr = []
      this.departArray.forEach(function(element, index) {
        arr.push(element.pid)
      })
      this.empform.deptIds = arr
      this.innerVisible = false
    },
    saveProject () {
        this.$refs['empform'].validate((valid) => {
          if (valid) {
            let darray = []
            this.departArray.forEach(function(element,index){
              darray.push(element.pid)
            })
            this.empform.deptIds = darray
            this.$store.dispatch('updateEmployee',this.empform).then(res => {
  		   	  	let {status} = res
  		   	  	if (status === 0) {
  		          this.dialogVisible = false
  		          this.dateRange = []
                  this.$refs['empform'].resetFields()
  		          this.$emit('updateempkit')
  		   	  	}
		   	})
          } else {
            return false;
          }
        })
    },
    saveDelete () {
    	console.log(8989)
        this.$store.dispatch('batchDelEmployee',this.dform).then(res => {
  		   	let {status} = res
  		   	if (status === 0) {
  		        this.dialogVisible = false
  		        this.dateRange = []
                this.$refs['empform'].resetFields()
  		        this.$emit('deleempkit')
  		   	}
		    })
    }
  }
}
</script>