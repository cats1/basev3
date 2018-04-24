<template>
	<div class="btnsection">
	  <el-button @click="dialogVisible = true"><i class="fa fa-plus"></i>{{$t('btn.addProjectBtn')}}</el-button>
	  <el-dialog
		  :title="$t('project.addprotitle')"
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
  data () {
  	return {
  	  dialogVisible: false,
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
  methods: {
   saveProject () {
        this.$refs['proform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addProject',this.proform).then(res => {
		   	  	let {status} = res
		   	  	if (status === 0) {
		          this.dialogVisible = false
		          this.$emit('addkit')
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