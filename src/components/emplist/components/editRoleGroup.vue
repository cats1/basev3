<template>
	<div class="btnsection">
    <el-button @click="dialogVisible = true"><i class="fa fa-folder-open"></i>{{$t('btn.editGroup')}}</el-button>
	  <el-dialog
		  :title="$t('btn.editGroup')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('role.rgroup')" prop="rgName">
			    <el-input v-model="form.rgName"></el-input>
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
        rid: '',
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
      console.log(val)
      this.parentObj = val
      this.form.rgName = val.name
      this.form.rid = val.pid
      if (val.dp === 'root') {
        this.form.rid = ''
      }
    }
  },
  mounted () {
    console.log(this.parent)
  },
  methods: {
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
    }
  }
}
</script>