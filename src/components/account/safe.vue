<template>
	<div class="boxshadow">
    <h2 class="set-title borderbom">{{$t('account.safe.title')}}</h2>
    <el-row class="paddingtb20 paddinglr30">
      <el-col :span="12">
        <el-form :model="form" :rules="rules" label-width="100px" ref="baseform">
          <el-form-item :label="$t('form.password.oldtext')" prop="oldpwd">
            <el-input type="password" v-model="form.oldpwd"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.newtext')" prop="newpwd">
            <el-input type="password" v-model="form.newpwd"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.retext')" prop="renewpwd">
            <el-input type="password" v-model="form.renewpwd"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="saveBase">{{$t('btn.saveBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('formCheck.validPassword.tip4')))
        } else {
          callback()
        }
    }
    var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('formCheck.validPassword.tip4')))
        } else {
          if (this.form.renewpwd !== '') {
            this.$refs.baseform.validateField('renewpwd');
          }
          callback()
        }
    }
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('formCheck.validPassword.tip6')));
        } else if (value !== this.form.newpwd) {
          callback(new Error(this.$t('formCheck.validPassword.tip5')));
        } else {
          callback();
        }
    }
  	return {
      form: {
        userid: getCache('userid'),
        oldpwd: '',
        newpwd: '',
        renewpwd:''
      },
      rules: {
        oldpwd: [
          { required: true,validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('validPassword.tip2'), trigger: 'blur' }
        ],
        newpwd: [
          { required: true,validator: validateNewPass, trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('validPassword.tip2'), trigger: 'blur' }
        ],
        renewpwd: [
          { required: true,validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('validPassword.tip2'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveBase () {
      this.updateOldPwd()
    },
    updateOldPwd () {
      this.$refs.baseform.validate(valid => {
        if (valid) {
          let nform = {
            userid: getCache('userid'),
            oldpwd: this.form.oldpwd,
            newpwd: this.form.newpwd
          }
          this.$store.dispatch('updatePassword',nform).then(res => {
            let {status} = res
            if (status === 0) {
              this.$refs.baseform.resetFields()
              this.$refs.baseform.clearValidate()
            }
          })
        }
      })
    }
  }
}
</script>