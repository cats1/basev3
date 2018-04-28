<template>
  <div class="btnsection">
    <el-button @click="addRole"><i class="fa fa-user-plus"></i>{{$t('btn.editRole')}}</el-button>
    <el-dialog
      :title="$t('btn.editRole')"
      :visible.sync="dialogVisible"
      width="30%" >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('role.rolename')" prop="rgName">
          <el-input v-model="form.rgName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role.rolegroup')" prop="parentId">
          <div class="last_inner" @click="doShowGroup">
            <span>{{parentObj.name}}</span>
          </div>
        </el-form-item>
      </el-form>
      <el-dialog
      width="50%"
      :title="$t('role.tip1')"
      :visible.sync="innerVisible1"
      append-to-body>
        <role-group-menu :left-data="groupList" :right-data="parentArray" :check-value="false" :check-num="1" @menukit="setGroup"></role-group-menu>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible1 = false">{{$t('btn.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProject">{{$t('btn.saveBtn')}}</el-button>
        <el-button type="redline" @click="deleteProject">{{$t('btn.deleteBtn')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import roleGroupMenu from '@/components/menu/roleGroupMenu'
export default {
  props: ['parent','parentNode','groupList'],
  components: {roleGroupMenu},
  data () {
    return {
      dialogVisible: false,
      innerVisible1: false,
      form: {
        rgName: '',
        parentId: '',
        rid: '',
        userid: getCache('userid')
      },
      rules: {
        rgName: [
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        parentId: [
          { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
      },
      parentObj: {},
      parentArray: [],
      dform: {
        rid: '',
        userid: getCache('userid')
      }
    }
  },
  watch: {
    parentNode (val) {
      console.log(val)
      this.form.parentId = val.pid
      this.parentObj = val
      let varray = []
      varray.push(val)
      this.parentArray = varray
    },
    parent (val) {
      console.log(val)
      this.form.rid = val.pid
      this.dform.rid = val.pid
      this.form.rgName = val.name
    }
  },
  mounted () {
    console.log(this.parent)
  },
  methods: {
    addRole () {
      console.log(this.parent.type)
      if (!this.parent.type) {
        this.$message({
          message: this.$t('role.tip2'),
          type: 'error'
        })
      } else if(this.parent.type === 0) {
        this.$message({
          message: this.$t('role.tip2'),
          type: 'error'
        })
      } else {
        this.dialogVisible = true
      }
    },
    doShowGroup () {
      this.innerVisible1 = true
    },
    saveSelect () {
      this.form.parentId = this.parentArray[0].pid
      this.parentObj = this.parentArray[0]
      this.innerVisible1 = false
    },
    setGroup (val) {
      this.parentArray = val
    },
    saveProject () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('updateRARG',this.form).then(res => {
                let {status} = res
                if (status === 0) {
                  this.dialogVisible = false
                  this.$refs['form'].resetFields()
                  this.$emit('editrolekit')
                }
            })
          } else {
            return false;
          }
        })
    },
    deleteProject () {
      this.$store.dispatch('delRARG',this.dform).then(res => {
          let {status} = res
          if (status === 0) {
              this.dialogVisible = false
              this.dateRange = []
                this.$refs['form'].resetFields()
              this.$emit('delerolekit')
          }
      })
    }
  }
}
</script>