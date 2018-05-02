<template>
	<div>
		<el-row class="margintop20 marginbom20">
	        <p>{{$t('moban.ctitle')}}<el-button @click="goDot">{{$t('moban.dot')}}</el-button></p>
	    </el-row>
	    <div class="boxshadow paddinglr30 paddingtb20">
	    	<el-form :model="form" :rules="rules" ref="danform" label-width="100px" style="width:70%;">
	    	    <h3>{{$t('moban.visitMess')}}</h3>
		    	<el-form-item :label="$t('form.name.text')" prop="name">
		    	  <el-input v-model="form.name"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.phone.text')" prop="phone">
		    		<el-input v-model="form.phone"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.time.text6')" prop="appointmentDate">
		    		<el-date-picker
				      v-model="form.appointmentDate"
				      type="datetime" class="block">
				    </el-date-picker>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.visitType.text')">
		    		<el-select v-model="visitType" class="block">
					    <el-option
					      v-for="item in $t('itype')"
					      :key="item.value"
						  :label="item.label"
						  :value="item.value">
					    </el-option>
					</el-select>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.company.text')">
		    		<el-input v-model="form.vcompany"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.remark.text')">
		    		<el-input v-model="form.remark"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.time.text7')" prop="qrcodeType">
		    		<el-row>
		    			<el-col :span="12">
			    			<el-select v-model="timetype">
							    <el-option
							      v-for="item in $t('timetype')"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
			    		</el-col>
			    		<el-col :span="12">
			    			<el-input v-model="form.qrcodeType"></el-input>
			    		</el-col>
		    		</el-row>
		    	</el-form-item>
		    </el-form>
		    <bom-moban @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"
		    @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></bom-moban>
	    </div>
	    <div class="margintop20">
	    	<el-button type="success" @click="sendOrder">{{$t('btn.sendInvite')}}</el-button>
	    	<el-button type="default">{{$t('btn.overview')}}</el-button>
	    </div>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import { replaceQuotation } from '@/utils/common'
import { formatDate } from '@/utils/index'
export default {
  components: { bomMoban },
  data () {
  	return {
      form: {
      	address: '',
      	appointmentDate: '',
      	companyProfile: '',
      	empid: '',
      	inviteContent: '',
      	latitude: '',
      	longitude: '',
      	name: '',
      	phone: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: ''
      },
      rules: {
      	name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      	phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      	appointmentDate: [{ required: true, message: '请选择邀请时间', trigger: 'blur' }],
      	qrcodeType: [{ required: true, message: '有效期', trigger: 'blur' }]
      },
      timetype: 0,
      visitType: 0,
      mobanShow: false,
      facemoban: {},
      busmoban: {},
      demoban: {}
  	}
  },
  methods: {
  	goDot () {
  	  this.$router.push({path: 'dot'})
  	},
  	getinv (val) {
  	  this.facemoban.inviteContent = val
  	},
  	gettraffic (val) {
      this.facemoban.traffic = val
    },
    getcompro (val) {
      this.facemoban.companyProfile = val
    },
    getbinv (val) {
  	  this.busmoban.inviteContent = val
  	},
  	getbtraffic (val) {
      this.busmoban.traffic = val
    },
    getbcompro (val) {
      this.busmoban.companyProfile = val
    },
    getinitface (val) {
      this.facemoban = val
    },
    getinitbus (val) {
      this.busmoban = val
    },
  	sendOrder () {
      this.$refs.danform.validate(valid => {
      	if (valid) {
      		if (this.visitType === 0) {
		        this.demoban = this.facemoban
		  	} else {
		  	  	this.demoban = this.busmoban
		  	}
		  	let date = formatDate(this.form.appointmentDate,'yyyy-MM-dd hh:mm:ss')
		  	console.log(this.form.appointmentDate)
		  	let nform = [{
		  	  	address: this.demoban.address,
		      	appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
		      	companyProfile: replaceQuotation(this.demoban.companyProfile),
		      	empid: getCache('empid'),
		      	inviteContent: replaceQuotation(this.demoban.inviteContent),
		      	latitude: this.demoban.latitude,
		      	longitude: this.demoban.longitude,
		      	name: this.form.name,
		      	phone: this.form.phone,
		      	qrcodeConf: this.timetype === 0 ? '0' : '1',
		      	qrcodeType: this.form.qrcodeType,
		      	remark: this.form.remark,
		      	traffic: replaceQuotation(this.demoban.traffic),
		      	userid: getCache('userid'),
		      	vcompany: this.form.vcompany,
		      	visitType: this.visitType === 0 ? this.$t('itype[0].label') : this.$t('itype[1].label')
		  	}]
  	  		this.$store.dispatch('addAppointment',nform).then(res => {
  	  		  let {status} = res
  	  		  this.$message({
  	  		  	type: 'success',
  	  		  	message: '发送成功'
  	  		  })
  	  		})
      	}
      })
  	},
  	editMoban () {
  	  this.mobanShow = !this.mobanShow
  	}
  }
}
</script>