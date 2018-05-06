<template>
  <div class="boxshadow margintop20 paddingtb20 paddinglr30">
  	<h3 class="marginbom20">
      <template v-if="emptype === 0">
        {{$t('btn.addEmpBtn')}}
      </template>
      <template v-else>
        {{$t('btn.editEmpBtn')}}
      </template>
    </h3>
    <el-form :model="form" class="empform" ref="ruleForm" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="empName">
            <el-input v-model="form.empName" placeholder="请填写姓名">
              <i slot="prefix" class="el-input__icon">
                <img :src="nameIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.empNickname" placeholder="请填写昵称">
              <i slot="prefix" class="el-input__icon">
                <img :src="nickIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="empEmail">
            <el-input v-model="form.empEmail" placeholder="请填写邮箱">
              <i slot="prefix" class="el-input__icon">
                <img :src="emailIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="empPhone" placeholder="请填写手机">
            <el-input v-model="form.empPhone" >
              <i slot="prefix" class="el-input__icon">
                <img :src="phoneIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" placeholder="请填写备注">
              <i slot="prefix" class="el-input__icon">
                <img :src="remarkIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item class="empborder">
            <i class="defaulticon">
              <img :src="defaultIcon" alt="">
            </i>
            <el-select v-model="form.subaccountId" placeholder="请选择" @change="getCom">
              <el-option
                v-for="item in comList"
                :key="item.id"
                :label="item.companyName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="emptype" @change="setEmptype">{{$t('emplist.pad')}}</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="">
          <p class="marginbom20">{{$t('form.gate.text1')}}</p>
          <el-form-item>
            <el-input v-model="form.cardNo" placeholder="请输入关联卡号">
              <i slot="prefix" class="el-input__icon">
                <img :src="cardIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="range"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('vdate[0]')"
              :end-placeholder="$t('vdate[1]')" @change="getDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item >
            <div class="eborder">
              <i slot="prefix" class="el-input__icon">
                <img :src="gateIcon" alt="">
              </i>{{$t('form.gate.text2')}}
            </div>
            <gate-group :t-show="false" :check-array="stringToArray(form.egids)" @getclist="getGate"></gate-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item >
        <el-button type="primary" @click="addEmployeeSave">{{$t('btn.saveBtn')}}</el-button>
        <el-button @click="addCancel">{{$t('btn.cancelBtn')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import { formatDate } from '@/utils'
import {gateGroup} from '@/components/account/components'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  props: {
    btnType: {
      type: Number,
      default: 1
    },
    editType: {
      type: Number,
      default: 0
    },
    empObj:{
      type: Object,
      default: {}
    }
  },
  components: {gateGroup},
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
      comList: [],
      emptype: false,
      etype: this.editType,
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
        cardNo: '',
        egids: '',
        startDate: '',
        endDate: ''
      },
      rules: {
        empName:[
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        empPhone:[
          { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        empEmail:[
          { required: true, message: this.$t('formCheck.validEmail.tip2'), trigger: 'blur' }],
      },
      range: [],
      nameIcon: require('@/assets/img/e_name.png'),
      nickIcon: require('@/assets/img/nickname.png'),
      emailIcon: require('@/assets/img/e_email.png'),
      phoneIcon: require('@/assets/img/e_phone.png'),
      remarkIcon: require('@/assets/img/e_remark.png'),
      defaultIcon: require('@/assets/img/e_default.png'),
      cardIcon: require('@/assets/img/e_card.png'),
      gateIcon: require('@/assets/img/e_group.png')
  	}
  },
  watch: {
    btnType (val) {
      if (val === 1) {
        this.bType = 'primary'
        this.getSubAccountByUserid()
      } else {
        this.bType = 'default'
      }
    },
    editType (val) {
      this.etype = val
    },
    empObj (val) {
      console.log(val)
      if (this.editType !== 0) {
        this.form = val
        this.range = [new Date(val.startDate),new Date(val.endDate)]
      }
    }
  },
  mounted () {
    if (this.editType !== 0) {
        this.form = this.empObj
        this.range = [new Date(this.empObj.startDate),new Date(this.empObj.endDate)]
    }
    if (this.btnType === 1) {
      this.bType = 'primary'
      this.getSubAccountByUserid()
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    stringToArray:stringToArray,
    getCom (val) {
      console.log(val)
    },
    getDate (val) {
      console.log(val)
      this.form.startDate = formatDate(val[0],'yyyy-MM-dd')
      this.form.endDate = formatDate(val[1],'yyyy-MM-dd')
    },
    setEmptype (val) {
      if (val) {
        this.form.emptype = 3
      } else {
        this.form.emptype = 1
      }
    },
    addEmp () {
      this.$emit('addkit',1)
    },
    getGate (val) {
      console.log(val)
      this.form.egids = arrayToString(val)
    },
    addCancel () {
      this.$refs.ruleForm.resetFields()
    },
    addEmployeeSave () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.editType === 0) {
            this.addEmployee()
          } else {
            this.updateEmployee()
          }
        }
      })
    },
    updateEmployee () {
      let nform = {
            userid: getCache('userid'),
            employee_name: this.form.empName,
            empNo: this.form.empNo,
            email: this.form.empEmail,
            phone: this.form.empPhone,
            employeeid: this.form.empid,
            deptIds: [],
            emptype: 2,
            empPosition: '',
            telephone: '',
            workbay: '',
            visitType: '面试',
            subaccountId: '',
            empNickname: this.form.empNickname,
            remark: '',
            deptIds: [],
            cardNo: '',
            egids: '',
            startDate: '',
            endDate: ''
          }
          this.$store.dispatch('updateEmployee',nform).then(res => {
            let {status} = res
            if (status === 0) {
              this.$refs.ruleForm.resetFields()
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
            empPosition: '',
            telephone: '',
            workbay: '',
            visitType: '面试',
            subaccountId: '',
            empNickname: this.form.empNickname,
            remark: '',
            deptIds: [],
            cardNo: '',
            egids: '',
            startDate: '',
            endDate: ''
          }
          this.$store.dispatch('addEmployee',nform).then(res => {
            let {status} = res
            if (status === 0) {
              this.$refs.ruleForm.resetFields()
            }
          })
    },
    getSubAccountByUserid () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getSubAccountByUserid',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let comArray = [{
            id: 0,
            companyName: '默认'
          }]
          for (let i=0;i<result.length;i++) {
            let item = result[i]
            comArray.push(item)
          }
          this.comList = comArray
        }
      })
    }
  }
}
</script>