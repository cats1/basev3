<template>
	<div class="btnsection">
    <el-button @click="dialogVisible = true"><i class="fa fa-user-plus"></i>{{$t('btn.addEmpBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addEmpBtn')"
		  :visible.sync="dialogVisible"
		  width="50%" >
		  <el-form :model="empform" :rules="rules" ref="empform" label-width="100px" class="demo-ruleForm">
        <el-form-item >
          <upload-user-photo :photourl="empform.avatar" @sendkit="getUserPhoto"></upload-user-photo>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="empform.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="empform.empNickname"></el-input>
        </el-form-item>
        <el-form-item label="部门" >
          <div class="last_inner" @click="setEmpShow">
            <template v-for="item in departArray">
              <span>{{item.name}}</span>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="职位" >
          <el-input v-model="empform.empPosition"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="empform.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="empform.email"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="empform.empNo"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="empform.telephone"></el-input>
        </el-form-item>
        <el-form-item label="办公地点" >
          <el-input v-model="empform.workbay"></el-input>
        </el-form-item>
        <el-form-item label="关联闸机" prop="egids">
          <gate-group :t-show="false" :check-array="stringToArray(empform.egids)" @getclist="getGate"></gate-group>
        </el-form-item>
        <el-form-item label="服务期限" prop="startDate">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间" @change="setrange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="empform.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-dialog
      width="50%"
      title="选择部门"
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
  props: ['parent','dlist'],
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
  	  rules: {
  	  	name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }],
        deptIds: [
          { required: true, message: '部门不能为空', trigger: 'blur' }],
        egids: [
          { required: true, message: '请选择闸机组', trigger: 'blur' }],
        phone: [
          { required: true, message: '负责人手机不能为空', trigger: 'blur' }],
        startDate: [
          { required: true, message: '日期不能为空', trigger: 'blur' }]
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
      this.departArray.push(val)
      if (val.dp === 'root') {
        //this.departform.parentId = ''
      }
    }
  },
  mounted () {
    console.log(this.parent)
  },
  methods: {
    stringToArray: stringToArray,
    getUserPhoto (url) {
      this.empform.avatar = url
    },
    setrange (val) {
      this.empform.startDate = formatDate(new Date(val[0]),'yyyy-MM-dd')
      this.empform.endDate = formatDate(new Date(val[1]),'yyyy-MM-dd')
    },
    setEmpShow () {
      this.innerVisible = true
    },
    getGate (val) {
      console.log(val)
      this.empform.egids = arrayToString(val)
    },
    saveProject () {
        this.$refs['empform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addEmployee',this.empform).then(res => {
  		   	  	let {status} = res
  		   	  	if (status === 0) {
  		          this.dialogVisible = false
                this.$refs['empform'].resetFields()
  		          this.$emit('addempkit')
  		   	  	}
		   	    })
          } else {
            return false;
          }
        })
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
    setdepart (val) {
      console.log(val)
      this.menuList = val
    }
  }
}
</script>