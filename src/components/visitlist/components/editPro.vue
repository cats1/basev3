<template>
	<div class="btnsection">
	  <el-button :type="bType" @click="editPro"><i class="fa fa-edit"></i>{{$t('btn.editProjectBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.editProjectBtn')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="proform" :rules="rules" ref="proform" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('project.proname')" prop="pName">
			    <el-input v-model="proform.pName"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('form.remark.text')" >
			    <el-input v-model="proform.remark"></el-input>
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
  props: ['epdata'],
  props: {
    btnType: {
      type: Number,
      default: 0
    },
    epdata: {
      type: Object,
      default: {}
    }
  },
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
      this.dialogVisible = true
      this.$emit('editpro',2)
    },
    saveProject () {
        this.$refs['proform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('updateProject',this.proform).then(res => {
  		   	  	let {status} = res
  		   	  	if (status === 0) {
  		          this.dialogVisible = false
  		          this.$emit('editkit')
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