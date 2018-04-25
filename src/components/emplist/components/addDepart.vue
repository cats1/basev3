<template>
	<div class="btnsection">
    <el-button @click="dialogVisible = true"><i class="fa fa-plus"></i>{{$t('btn.addDepartBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addDepartBtn')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="departform" :rules="rules" ref="departform" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('depart.departName')" prop="deptName">
			    <el-input v-model="departform.deptName"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('depart.prevDepartName')" >
          <div class="last_inner">
            <span>{{parentObj.name}}</span>
          </div>
			    <!-- <el-input v-model="departform.remark"></el-input> -->
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
  	  departform: {
  	  	deptName: '',
  	  	parentId: '',
        deptManagerEmpid: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	deptName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      parentObj: this.parent
  	}
  },
  watch: {
    parent (val) {
      console.log(val)
      this.parentObj = val
      this.departform.parentId = val.pid
      if (val.dp === 'root') {
        this.departform.parentId = ''
      }
    }
  },
  mounted () {
    console.log(this.parent)
  },
  methods: {
   saveProject () {
        this.$refs['departform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addDepartment',this.departform).then(res => {
		   	  	let {status} = res
		   	  	if (status === 0) {
		          this.dialogVisible = false
              this.$refs['departform'].resetFields()
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