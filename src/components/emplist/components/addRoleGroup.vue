<template>
	<div class="btnsection">
    <el-button @click="addGroup"><i class="fa fa-folder"></i>{{$t('btn.addRoleGroup')}}</el-button>
	  <role-group-form :etype="0" :parent="parent" :is-show="isShow" @editrolekit="doDone"></role-group-form>
	</div>
</template>
<script>
import roleGroupForm from './roleGroupForm'
import {getCache} from '@/utils/auth'
export default {
  props: ['parent'],
  components: {roleGroupForm},
  data () {
  	return {
  	  isShow: false,
  	  form: {
  	  	rgName: '',
  	  	parentId: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	rgName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      parentObj: this.parent
  	}
  },
  watch: {
    parent (val) {
      this.parentObj = val
      if (val.dp === 'root') {
        this.form.parentId = ''
      }
    }
  },
  mounted () {},
  methods: {
    addGroup () {
      this.isShow = true
    },
    doDone () {
      this.isShow = false
      this.$emit('addrolekit')
    }
  }
}
</script>