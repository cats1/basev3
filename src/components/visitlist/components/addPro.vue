<template>
	<div class="btnsection">
	  <el-button :type="bType" @click="editPro"><i class="fa fa-plus"></i>{{$t('btn.addProjectBtn')}}</el-button>
    <pro-edit-show :etype="0" :epdata="proform" :is-show="dialogVisible" @editkit="getEdit"></pro-edit-show>
	</div>
</template>
<script>
import proEditShow from './proEditShow'
import {getCache} from '@/utils/auth'
export default {
  props: {
    btnType: {
      type: Number,
      default: 0
    }
  },
  components: {proEditShow},
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
  	  proform: {
  	  	pName: '',
  	  	remark: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	pName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  }
  	}
  },
  watch: {
    btnType (val) {
      if (val === 0) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  mounted () {
    if (this.btnType === 0) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    editPro () {
      this.dialogVisible = true
      this.$emit('editpro',0)
    },
    getEdit () {
      this.dialogVisible = false
      this.$emit('editkit')
    }
  }
}
</script>