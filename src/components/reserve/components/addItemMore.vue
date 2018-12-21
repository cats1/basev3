<template>
	<div>
		<div class="approvewrap" @click="dialogVisible = true">
			<span class="region-logo">
				<img :src="addIcon" alt="">
				<strong>{{$t('newApprove')}}</strong>
			</span>
		</div>
		<el-dialog
		  :title="$t('newApprove')"
		  :visible.sync="dialogVisible"
		  width="30%" @close="handClose">
		  <el-form :model="form" ref="areaform" :rules="rules">
		  	<el-form-item :label="$t('approve.areaName')" prop="aName">
		  		<el-input v-model="form.aName"></el-input>
		  	</el-form-item>
		  	<el-form-item :label="$t('approve.areaAddress')">
		  		<el-input v-model="form.address"></el-input>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="saveSet">{{$t('btn.saveBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
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
  	  addIcon: require('@/assets/img/add.png'),
  	  form:{
  	  	aName: '',
  	  	address: '',
  	  	userid: getCache('userid')
  	  },
  	  rules:{
  	  	aName: [{ required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }]
  	  }
  	}
  },
  methods: {
  	saveSet () {
  	  this.$refs['areaform'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addProcessArea',this.form).then(res => {
	        let {status} = res
	        if (status === 0) {
	          this.dialogVisible = false
	          this.$emit('addkit')
	        }
  	  	  })
        }
      })
  	  
  	},
  	handClose () {
  	  this.form = {
  	  	aName: '',
  	  	address: '',
  	  	userid: getCache('userid')
  	  }
  	}
  }
}
</script>