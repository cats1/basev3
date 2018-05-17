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
            <el-input v-model="form.empName" :placeholder="$t('yourName')">
              <i slot="prefix" class="el-input__icon">
                <img :src="nameIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.empNickname" :placeholder="$t('form.name.text3')">
              <i slot="prefix" class="el-input__icon">
                <img :src="nickIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="empEmail">
            <el-input v-model="form.empEmail" :placeholder="$t('form.email.text')">
              <i slot="prefix" class="el-input__icon">
                <img :src="emailIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="empPhone" >
            <el-input v-model="form.empPhone" :placeholder="$t('form.phone.text')">
              <i slot="prefix" class="el-input__icon">
                <img :src="phoneIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" :placeholder="$t('formCheck.remark.tip1')">
              <i slot="prefix" class="el-input__icon">
                <img :src="remarkIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item class="empborder">
            <i class="defaulticon">
              <img :src="defaultIcon" alt="">
            </i>
            <el-select v-model="form.subaccountId" :placeholder="$t('mustSelect')" @change="getCom">
              <el-option
                v-for="item in comList"
                :key="item.id"
                :label="item.companyName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" @change="setEmptype">{{$t('emplist.pad')}}</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="">
          <p class="marginbom20">{{$t('form.gate.text1')}}</p>
          <el-form-item>
            <el-input v-model="form.cardNo" :placeholder="$t('selectCard')">
              <i slot="prefix" class="el-input__icon">
                <img :src="cardIcon" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="range"
              type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
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
import { isvalidEmail, validatPhone } from '@/utils/validate'
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
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback()
      } else if (!isvalidEmail(value)) {
        callback(new Error(this.$t('validEmail.tip1')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error(this.$t('validphone.tip1')))
      } else {
        callback()
      }
    }
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
        visitType: '',
        subaccountId: '',
        empNickname: '',
        remark: '',
        deptIds: [],
        cardNo: '',
        egids: '',
        startDate: '',
        endDate: ''
      },
      checked: false,
      rules: {
        empName:[
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        empPhone:[
          { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePhone}],
        empEmail:[
          { required: false, trigger: 'blur', validator: validateEmail}],
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
      if (this.editType !== 0) {
        this.form = val
        console.log(val)
        if (val.empType === 3) {
          this.checked = true
        } else {
          this.checked = false
        }
        if (val.startDate) {
          this.range[0] = val.startDate
        }
        if (val.endDate) {
          this.range[1] = val.endDate
        }
      }
    }
  },
  mounted () {
    if (this.editType !== 0) {
        this.form = this.empObj
        this.range = [this.empObj.startDate,this.empObj.endDate]
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
    getCom (val) {},
    getDate (val) {
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
            emptype: this.form.emptype,
            empPosition: '',
            telephone: '',
            workbay: '',
            visitType: '',
            subaccountId: this.form.subaccountId,
            empNickname: this.form.empNickname || '',
            remark: this.form.remark,
            deptIds: [],
            cardNo: this.form.cardNo,
            egids: this.form.egids,
            startDate: this.range.length > 0 ? this.range[0].replace(/-/g,'') : '',
            endDate: this.range.length > 0 ? this.range[1].replace(/-/g,'') : ''
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
            visitType: '',
            subaccountId: this.form.subaccountId,
            empNickname: this.form.empNickname,
            remark: this.form.remark,
            deptIds: [],
            cardNo: this.form.cardNo,
            egids: this.form.egids,
            startDate: this.range.length > 0 ? formatDate(this.range[0],'yyyyMMdd') : '',
            endDate: this.range.length > 0 ? formatDate(this.range[1],'yyyyMMdd') : ''
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
            companyName: this.$t('defaultText')
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