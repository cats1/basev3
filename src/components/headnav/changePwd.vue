<template>
  <el-dialog :title="$t('downlist[1]')" :visible.sync="dialogVisible" :before-close="handleClose" width="30%">
  	<el-alert :title="$t('form.password.comtext')" type="error" >
    </el-alert>
  	<el-form :model="form" :rules="rules" ref="ruleForm">
  		<el-form-item :label="$t('form.password.oldtext')" prop="oldPwd">
  		  <el-input v-model="form.oldPwd"></el-input>
  		</el-form-item>
  		<el-form-item :label="$t('form.password.newtext')" prop="password">
  		  <el-input v-model="form.password"></el-input>
  		</el-form-item>
  		<el-form-item :label="$t('form.password.retext')" prop="repassword">
  		  <el-input v-model="form.repassword"></el-input>
  		</el-form-item>
  	</el-form>
  	<el-button type="primary" @click="saveChange">{{$t('btn.saveBtn')}}</el-button>
  </el-dialog>
</template>
<script>
import { getCache } from '@/utils/auth'
import {validatePass,validatePass2} from '@/utils/validates'
export default {
  props: {
  	isShow: {
  	  type: Boolean,
  	  default: false
  	},
    ptype: {
      type: Number,
      default: 0
    }
  },
  data () {
  	const validatePass = (rule, value, callback) => {
  	  if (value === '') {
  	    callback(new Error(this.$t('formCheck.validPassword.tip3')));
  	  } else {
  	    if (this.form.repassword !== '') {
  	      this.$refs.ruleForm.validateField('repassword');
  	    }
  	    callback();
  	  }
  	}
    const validatePass2 = (rule, value, callback) => {
  	  if (value === '') {
  	    callback(new Error(this.$t('formCheck.validPassword.tip6')));
  	  } else if (value !== this.form.password) {
  	    callback(new Error(this.$t('formCheck.validPassword.tip5')));
  	  } else {
  	    callback();
  	  }
  	}
  	return {
  	  form: {
  	  	password: '',
  	  	oldPwd: '',
  	  	repassword: ''
  	  },
  	  rules: {
  	  	oldPwd: [
  	  	  { required: true, trigger: 'blur',validator: validatePass }
        ],
  	  	password: [
  	  	  { required: true, trigger: 'blur',validator: validatePass }
        ],
        repassword: [
          { required: true, trigger: 'blur',validator: validatePass2 }
        ]
  	  },
  	  dialogVisible: false
  	}
  },
  watch: {
  	isShow (val) {
  	  this.dialogVisible = val
  	}
  },
  methods: {
  	saveChange () {
  	  this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ptype === 0) {
            let nform = {
              id: getCache('subaccountId'),
              password: this.form.password,
              oldPwd: this.form.oldPwd
            }
            this.$store.dispatch('updateSubAccountPwd',nform).then(res => {
              let {status} = res
              if (status === 0) {
                this.dialogVisible = false
                this.$emit('closekit')
              }
            })
          } else if (this.ptype === 1) {
            let nform = {
              username: getCache('username'),
              password: this.form.password,
              oldPwd: this.form.oldPwd
            }
            this.$store.dispatch('ModifySupAccPassword',nform).then(res => {
              let {status} = res
              if (status === 0) {
                this.dialogVisible = false
                this.$emit('closekit')
              }
            })
          } else if (this.ptype === 2) {
            let nform = {
              //phone: getCache('phone') || getCache('empPhone'),
              empNo: getCache('empNo'),
              empPwd: this.form.password,
              oldEmpPwd: this.form.oldPwd
            }
            this.$store.dispatch('updateEmpPwd',nform).then(res => {
              let {status} = res
              if (status === 0) {
                this.dialogVisible = false
                this.$emit('closekit')
              }
            })
          }
          
        }
  	  })
  	},
  	handleClose () {
  	  this.dialogVisible = false
  	  this.$emit('closekit')
  	}
  }
}
</script>