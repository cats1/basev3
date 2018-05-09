<template>
	<div class="btnsection">
	  <el-button :type="bType" @click="doAddVisit"><i class="fa fa-user-plus"></i>{{$t('btn.addVisitorBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addVisitorBtn')"
		  :visible.sync="dialogVisible"
		  width="60%" >
		  <el-form :model="proform" :rules="rules" ref="proform" label-width="100px" class="demo-ruleForm">
			  <el-form-item >
			    <upload-user-photo :photourl="proform.avatar" @sendkit="getUserPhoto"></upload-user-photo>
          <reg-photo :rform="proform"></reg-photo>
			  </el-form-item>
        <el-form-item :label="$t('form.name.text')" prop="name">
          <el-input v-model="proform.name"></el-input>
        </el-form-item>
			  <el-form-item :label="$t('gender')" prop="sex">
          <el-select v-model="proform.sex" placeholder="请选择">
            <el-option
              v-for="(item,index) in $t('sex')"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
			  </el-form-item>
        <el-form-item :label="$t('age')" prop="age">
          <el-input v-model="proform.age"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.company.text')" prop="company">
          <el-input v-model="proform.company"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Projectselect')" prop="pName">
          <el-select v-model="proform.pName" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.pid"
              :label="item.pName"
              :value="item.pid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('chargePerson')" prop="leader">
          <el-input v-model="proform.leader"></el-input>
        </el-form-item>
        <el-form-item :label="$t('chargePersonPhone')" prop="phone">
          <el-input v-model="proform.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('workArea')" prop="area">
          <el-input v-model="proform.area"></el-input>
        </el-form-item>
        <el-form-item :label="$t('workcontent')" prop="job">
          <el-input v-model="proform.job"></el-input>
        </el-form-item>
        <el-form-item :label="$t('busdepartment')" prop="department">
          <el-input v-model="proform.department"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.time.text4')" prop="startDate">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('startTime')"
            :end-placeholder="$t('endTime')" @change="setrange">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('form.remark.text')" prop="remark">
          <el-input v-model="proform.remark"></el-input>
        </el-form-item>
      </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="saveVisit">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {uploadUserPhoto} from '@/components/upload'
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
import regPhoto from './regPhoto'
export default {
  components: {uploadUserPhoto,regPhoto},
  props: {
    btnType: {
      type: Number,
      default: 1
    },
    proList: {
      type: Array,
      default: []
    },
    editType: {
      type: Number,
      default: 0
    },
    curEmp:{
      type: Object,
      default: {}
    },
    pid: null
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
  	  proform: {
  	  	pName: '',
  	  	remark: '',
        avatar: '',
        company: '',
        name: '',
        age: '',
        sex: 0,
        leader: '',
        phone: '',
        area: '',
        startDate: '',
        endDate: '',
        job: '',
        department: '',
        rid: '',
  	  	userid: getCache('userid')
  	  },
      dateRange: [],
  	  rules: {
  	  	name: [
  	  	  { required: true, message: this.$t('pronameIsBlank'), trigger: 'blur' }],
        company: [
          { required: true, message: this.$t('comnameIsBlank'), trigger: 'blur' }],
        leader: [
          { required: true, message: this.$t('chargeIsBlank'), trigger: 'blur' }],
        phone: [
          { required: true, message: this.$t('chargePhoneIsBlank'), trigger: 'blur' }],
        startDate: [
          { required: true, message: this.$t('dateIsBlank'), trigger: 'blur' }]
  	  },
      list: this.proList
  	}
  },
  watch: {
    btnType (val) {
      if (val === 1) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    },
    proList(val) {
      this.list = val
    },
    pid (val) {
      this.proform.rid = val
    },
    editType (val) {
      console.log(val)
      this.doAddVisit()
    },
    curEmp (val) {
      console.log(val)
      this.proform = val
      this.dateRange = [val.startDate,val.endDate]
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
    doAddVisit () {
      this.$emit('addemp',1)
      this.dialogVisible = true
    },
    getUserPhoto (url) {
      this.proform.avatar = url
    },
    setrange (val) {
      this.proform.startDate = formatDate(new Date(val[0]),'yyyy-MM-dd')
      this.proform.endDate = formatDate(new Date(val[1]),'yyyy-MM-dd')
    },
    saveVisit () {
        this.$refs['proform'].validate((valid) => {
          if (valid) {
            if (this.editType === 0) {
              this.addResidentVisitor()
            } else {
              this.updateResidentVisitor()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    addResidentVisitor () {
      this.$store.dispatch('addResidentVisitor',this.proform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',this.pid)
          this.$refs.proform.resetFields()
        }
      })
    },
    updateResidentVisitor () {//updateResidentVisitor
      this.$store.dispatch('updateResidentVisitor',this.proform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',this.pid)
          this.$refs.proform.resetFields()
        }
      })
    }
  }
}
</script>