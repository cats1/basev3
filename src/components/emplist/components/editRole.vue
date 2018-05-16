<template>
  <div class="btnsection">
    <el-button @click="addRole"><i class="fa fa-user-plus"></i>{{$t('btn.editRole')}}</el-button>
    <role-form :etype="1" :group-list="groupList" :parent="roleNode" :role-node="parent" :outer-show="outerShow" @editrolekit="doDone" @delerolekit="doDone"></role-form>
  </div>
</template>
<script>
import roleForm from './roleForm'
import {getCache} from '@/utils/auth'
import roleGroupMenu from '@/components/menu/roleGroupMenu'
export default {
  props: {
    parent: {
      type: Object,
      default: {}
    },
    groupList: {
      type: Array,
      default: []
    },
    roleNode: null
  },
  components: {roleGroupMenu,roleForm},
  data () {
    return {
      outerShow: false,
      dialogVisible: false,
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
    parent (val) {
      this.form.parentId = val.pid
      this.parentObj = val
      let varray = []
      varray.push(val)
      this.parentArray = varray
    },
    roleNode (val) {
      this.form.rid = val.pid
      this.dform.rid = val.pid
      this.form.rgName = val.name
    }
  },
  mounted () {},
  methods: {
    addRole () {
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
        this.outerShow = true
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
    doDone () {
      this.outerShow = false
      this.dialogVisible = false
      this.$emit('updatelist')
    }
  }
}
</script>