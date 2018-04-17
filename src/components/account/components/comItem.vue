<template>
	<div class="comitemwrap">
		<el-row @mouseover="doOver" @mouseout="doOut">
			<el-col :span="2">
				<span class="comlogo">
					<img :src="logo" alt="">
				</span>
			</el-col>
			<el-col :span="4">
				<span class="comname">{{name}}</span>
			</el-col>
			<el-col :span="10" v-show="editShow">
				<el-button type="text">{{$t('btn.updateBtn')}}</el-button>
				<el-button type="text">{{$t('btn.deleteBtn')}}</el-button>
				<el-button type="text">{{$t('btn.initPwdBtn')}}</el-button>
			</el-col>
		</el-row>
		<el-dialog
		  :title="$t('notice.coms.dialog.title')"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <el-form :model="form">
		  	<el-form-item>
		  		<el-input v-model="form.companyName"></el-input>
		  	</el-form-item>
		  	<h3>{{$t('notice.coms.dialog.title1')}}</h3>
		  	<el-form-item>
		  		<el-input v-model="form.phone"></el-input>
		  	</el-form-item>
		  	<el-form-item>
		  		<el-input v-model="form.email"></el-input>
		  	</el-form-item>
		  	<el-form-item>
		  		<el-input v-model="form.floor"></el-input>
		  	</el-form-item>
		  	<el-form-item>
		  		<el-input v-model="form.roomNumber"></el-input>
		  	</el-form-item>
		  	<el-form-item>
		  		<el-input v-model="form.balance"></el-input>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="dialogVisible = false">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
export default {
  props: {
  	data: {
  	  type: Object,
  	  default: {}
  	},
  	index: {
  	  type: Number,
  	  default: 0
  	}
  },
  data () {
  	return {
  	  editShow: false,
  	  dialogVisible: false,
  	  form: {
  	  	companyName: ''
  	  }
  	}
  },
  computed: {
  	logo () {
      return this.data.logo ? this.data.logo : require('@/assets/img/com-default.jpg')
  	},
  	name () {
      return this.data.companyName
  	}
  },
  methods: {
  	doOver () {
      console.log(888)
  	}
  }
}
</script>