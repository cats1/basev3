<template>
	<div class="btnsection">
	  <el-button :type="bType" @click="editPro"><i class="fa fa-edit"></i>{{$t('btn.editProjectBtn')}}</el-button>
	  <pro-edit-show :etype="1" :epdata="proform" :is-show="dialogVisible" @editkit="getEdit"></pro-edit-show>
	</div>
</template>
<script>
import proEditShow from './proEditShow'
import {getCache} from '@/utils/auth'
export default {
  props: {
    epdata: null,
    btnType: {
      type: Number,
      default: 0
    },
    epdata: {
      type: Object,
      default: {}
    }
  },
  components: {proEditShow},
  data () {
  	return {
  	  dialogVisible: false,
  	  proform: this.epdata,
      bType: 'default',
  	  rules: {
  	  	pName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  }
  	}
  },
  watch: {
    epdata (val) {
      this.proform = val
    },
    btnType (val) {
      if (val === 2) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  mounted () {
    if (this.btnType === 2) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    editPro () {
      if (this.proform.pid === '') {
        this.$message({
          type: 'warning',
          message: this.$t('selectProject')
        })
      } else {
        this.dialogVisible = true
        this.$emit('editpro',2)
      }
    },
    getEdit () {
      this.dialogVisible = false
      this.$emit('editkit')
    }
  }
}
</script>