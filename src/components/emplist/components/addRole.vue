<template>
  <div class="btnsection">
    <el-button @click="addRole"><i class="fa fa-user"></i>{{$t('btn.addRole')}}</el-button>
    <role-form :etype="0" :group-list="groupList" :parent="parent" :outer-show="outerShow" @editrolekit="doDone"></role-form>
  </div>
</template>
<script>
import roleForm from './roleForm'
import {getCache} from '@/utils/auth'
export default {
  props: {
    parent: {
      type: Object,
      default: {}
    },
    groupList: {
      type: Array,
      default: []
    }
  },
  components: {roleForm},
  data () {
    return {
      outerShow: false,
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
      this.parentObj = val
      this.form.parentId = val.pid
    },
    groupList (val) {}
  },
  mounted () {},
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
      } else if (!this.parent.name) {
        this.$message({
          message: this.$t('role.tip'),
          type: 'error'
        })
      } else {
        this.outerShow = true
      }
    },
    doDone () {
      this.outerShow = false
      this.dialogVisible = false
      this.$emit('updatelist')
    }
  }
}
</script>