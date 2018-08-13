<template>
	<el-dialog :title="winTitle" :visible.sync="dialogVisible" width="50%" @close="handClose">
		<el-form :model="proform" :rules="rules" ref="proform" label-width="100px" class="demo-ruleForm" >
			<el-form-item >
			    <upload-user-photo :photourl="proform.avatar" @sendkit="getUserPhoto"></upload-user-photo>
                <reg-photo :rform="proform" v-show="faceTextShow"></reg-photo>
			</el-form-item>
	        <el-form-item :label="$t('form.name.text')" prop="name">
	          <el-input v-model="proform.name"></el-input>
	        </el-form-item>
			<el-form-item :label="$t('gender')" >
		        <el-select v-model="proform.sex" :placeholder="$t('mustSelect')">
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
	          <el-select v-model="curDefaultRid" :placeholder="$t('mustSelect')" @change="getProname">
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
          <el-form-item :label="$t('form.idnum.text')" prop="cardid">
            <el-input v-model="proform.cardid"></el-input>
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
</template>
<script>
import {uploadUserPhoto} from '@/components/upload'
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
import regPhoto from './regPhoto'
export default {
  components: {uploadUserPhoto,regPhoto},
  props: {
    isShow: {
      type: Boolean,
      default: false
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
    curRid: null,
    pid: null
  },
  data () {
  	return {
  	  dialogVisible: this.isShow,
      bType: 'default',
      curDefaultRid: this.curRid,
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
        cardid: '',
        department: '',
        pid: '',
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
          { required: true, message: this.$t('dateIsBlank'), trigger: 'blur' }],
        cardid: [
          { required: true, message: this.$t('cardidIsNotNull'), trigger: 'blur' }]
  	  },
      list: this.proList,
      faceTextShow: false
  	}
  },
  computed: {
    winTitle: {
      get () {
        if (this.editType === 0) {
          return this.$t('btn.addVisitorBtn')
        } else {
          return this.$t('editVisitor')
        }
      },
      set () {}
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
    isShow (val) {
      this.dialogVisible = val
    },
    curEmp (val) {
      if (this.editType === 1) {
      	this.proform = val
        this.dateRange = [val.startDate,val.endDate]
        if (val.avatar && val.face !== 0) {
          this.faceTextShow = true
        } else {
          this.faceTextShow = false
        }
      } else {
         this.faceTextShow = false
      }
    },
    curRid (val) {
      this.curDefaultRid = val
      this.getProname(val)
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
  	getProname (val) {
  	  let _self = this
  	  let pid
      let pName
  	  this.proList.forEach(function(element, index) {        
  	  	if (element.pid === val) {
          pid = element.pid
          pName = element.pName
  	  	}
  	  })
  	  this.proform.pid = pid
      this.proform.pName = pName
  	},
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
              /*if (this.proform.avatar === '') {
                this.$message({
                  type: 'warning',
                  message: this.$t('form.photo.tip')
                })
              } else {*/
              	this.updateResidentVisitor()
              //}
            }
          } else {
            return false;
          }
        })
    },
    addResidentVisitor () {
      let nform = {
        pName: this.proform.pName,
        remark: this.proform.remark,
        avatar: this.proform.avatar,
        company: this.proform.company,
        name: this.proform.name,
        age: this.proform.age,
        sex: this.proform.sex,
        leader: this.proform.leader,
        phone: this.proform.phone,
        area: this.proform.area,
        startDate: this.proform.startDate,
        endDate: this.proform.endDate,
        job: this.proform.job,
        cardid: this.proform.cardid,
        department: this.proform.department,
        pid: this.proform.pid,
        userid: getCache('userid')
      }
      this.$store.dispatch('addResidentVisitor', nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',this.editType,this.proform)
          this.dateRange = []
          this.$refs.proform.resetFields()
          this.$refs.proform.clearValidate()
        }
      })
    },
    updateResidentVisitor () {//updateResidentVisitor
      this.$store.dispatch('updateResidentVisitor',this.proform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',this.editType,this.proform)
          this.dateRange = []
          this.$refs.proform.resetFields()
          this.$refs.proform.clearValidate()
        }
      })
    },
    handClose () {
      this.$emit('sendav',this.editType,this.proform)
      this.dateRange = []
      this.$refs.proform.resetFields()
      this.$refs.proform.clearValidate()
    }
  }
}
</script>