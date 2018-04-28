<template>
  <div class="btnsection">
    <el-button @click="addRole"><i class="fa fa-user"></i>{{$t('btn.addRole')}}</el-button>
    <el-dialog
      :title="$t('btn.addRole')"
      :visible.sync="dialogVisible"
      width="30%" >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('role.rolename')" prop="rgName">
          <el-input v-model="form.rgName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role.rolegroup')" prop="parentId">
          <div class="last_inner" >
            <span>{{parentObj.name}}</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: ['parent'],
  data () {
    return {
      dialogVisible: false,
      form: {
        rgName: '',
        parentId: '',
        userid: getCache('userid')
      },
      rules: {
        rgName: [
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        parentId: [
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
      },
      parentObj: this.parent
    }
  },
  watch: {
    parent (val) {
      console.log(val)
      this.parentObj = val
      this.form.parentId = val.pid
    }
  },
  mounted () {
    console.log(this.parent)
  },
  methods: {
    addRole () {
      if(!this.parent) {
        this.$message({
          message: this.$t('role.tip'),
          type: 'error'
        })
      } else if(this.parent.type === 1) {
        this.$message({
          message: this.$t('role.tip'),
          type: 'error'
        })
      } else {
        this.dialogVisible = true
      }
    },
    saveProject () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addRARG',this.form).then(res => {
                let {status} = res
                if (status === 0) {
                  this.dialogVisible = false
                  this.$refs['form'].resetFields()
                  this.$emit('addrolekit')
                }
            })
          } else {
            return false;
          }
        })
    }
  }
}
</script>