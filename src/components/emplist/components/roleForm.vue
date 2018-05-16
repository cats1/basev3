<template>
  <el-dialog
      :title="$t('btn.editRole')"
      :visible.sync="dialogVisible"
      width="30%" @close="handleClose">
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
        <el-button type="redline" @click="deleteProject" v-show="etype === 1">{{$t('btn.deleteBtn')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
      </span>
    </el-dialog>
</template>
<script>
import {getCache} from '@/utils/auth'
import roleGroupMenu from '@/components/menu/roleGroupMenu'
export default {
  props: {
    parent: null,
    roleNode: null,
    groupList: {
      type: Array,
      default: []
    },
    outerShow: {
      type: Boolean,
      default: false
    },
    innerShow: {
      type: Boolean,
      default: false
    },
    etype: {
      type: Number,
      default: 0
    }
  },
  components: {roleGroupMenu},
  data () {
    return {
      dialogVisible: this.outerShow,
      innerVisible1: this.innerShow,
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
      parentObj: this.parent,
      parentArray: [],
      dform: {
        rid: '',
        userid: getCache('userid')
      }
    }
  },
  watch: {
    roleNode (val) {
      this.form.rgName = val.label
      this.form.rid = val.pid
      this.dform.rid = val.pid
    },
    groupList (val) {},
    parent (val) {
      this.parentObj = val
      this.form.parentId = val.pid
      let varray = []
      varray.push(val)
      this.parentArray = varray
    },
    outerShow (val) {
      this.dialogVisible = val
    }
  },
  mounted () {},
  methods: {
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
            if (this.etype === 0) {
              this.addPro()
            } else {
              this.updatePro()
            }
          } else {
            return false;
          }
        })
    },
    addPro () {
      this.$store.dispatch('addRARG',this.form).then(res => {
          let {status} = res
          if (status === 0) {
            this.dialogVisible = false
            this.$refs['form'].resetFields()
            this.$emit('editrolekit')
          }
      })
    },
    updatePro () {
      this.$store.dispatch('updateRARG',this.form).then(res => {
          let {status} = res
          if (status === 0) {
            this.dialogVisible = false
            this.$refs['form'].resetFields()
            this.$emit('editrolekit')
          }
      })
    },
    deleteProject () {
      this.$store.dispatch('delRARG',this.dform).then(res => {
          let {status} = res
          if (status === 0) {
              this.dialogVisible = false
              this.$refs['form'].resetFields()
              this.$emit('delerolekit')
          }
      })
    },
    handleClose () {
      this.$emit('editrolekit')
    }
  }
}
</script>