<template>
	<div>
		<el-row class="margintop20 marginbom20">
	        <p>{{$t('moban.ctitle')}}<el-button class="right" @click="goDan">{{$t('moban.single')}}</el-button></p>
	    </el-row>
	    <div class="boxshadow paddinglr30 paddingtb20">
	    	<h3>{{$t('moban.visitMess')}}
          <div class="right">
            <down-invite-moban></down-invite-moban>
            <upload-invite @sendkit="getUpload"></upload-invite>
          </div>
	    	</h3>
	    	<p>{{$t('moban.tip7')}}</p>
	    	<el-table class="margintop20" :data="data" border>
				<el-table-column
			      type="index"
			      width="30">
			    </el-table-column>
				<el-table-column prop="vname" :label="$t('form.name.text')">
					<template slot-scope="scope">
				      <el-input v-model="scope.row.name"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="vphone" :label="$t('form.phone.text')">
					<template slot-scope="scope">
				      <el-input v-model="scope.row.phone"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="visitType" :label="$t('tablehead[7]')">
					<template slot-scope="scope">
				      <el-select v-model="scope.row.visitType" class="block">
						<el-option
						    v-for="item in $t('itype')"
						    :key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					  </el-select>
				    </template>
				</el-table-column>
				<el-table-column prop="appointmentDate" :label="$t('form.time.text6')" width="160">
					<template slot-scope="scope">
					    <el-date-picker
					      v-model="scope.row.appointmentDate"
					      type="datetime"
					      placeholder="选择日期时间">
					    </el-date-picker>
				    </template>
				</el-table-column>
				<el-table-column prop="company" :label="$t('form.company.text2')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.vcompany"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="remark" :label="$t('form.remark.text')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="status" :label="$t('btn.edit1')">
					<template slot-scope="scope">
					  <el-button type="error" v-if="scope.row.etype === 1" @click="delettype">{{$t('btn.deleteBtn')}}</el-button>
				      <el-button type="primary" v-else @click="edittype">{{$t('btn.addBtn')}}</el-button>
				    </template>
				</el-table-column>
			</el-table>
			<div class="margintop20">
		      <el-button @click="addVisit">{{$t('btn.addVisitorBtn')}}</el-button>
		    </div>
	    	<el-form class="margintop20" :model="form" :rules="rules" ref="danform" label-width="100px" style="width:70%;">	   
          <el-form-item :label="$t('form.time.text7')" prop="qrcodeType">
		    		<el-row>
		    			<el-col :span="12">
			    			<el-select v-model="timetype" placeholder="请选择">
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
	    	<el-button type="success" @click="sendOrder">{{$t('btn.sendInvite')}}</el-button><el-button type="default">{{$t('btn.overview')}}</el-button>
	    </div>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import {downInviteMoban} from '@/components/download'
import {uploadInvite} from '@/components/upload'
import { replaceQuotation } from '@/utils/common'
import { formatDate } from '@/utils/index'
export default {
  components: { bomMoban,downInviteMoban,uploadInvite },
  data () {
  	return {
      data: [{
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
      	visitType: '',
      	etype: 0
      },{
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
      	visitType: '',
      	etype: 0
      },{
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
      	visitType: '',
      	etype: 0
      }],
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
  	goDan () {
  	  this.$router.push({name: 'order'})
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
    getUpload (result) {
      this.data = result
    },
    edittype (index) {
      this.$set(this.data[index],'etype',1)
    },
    delettype (index) {
      let cdata = this.data
      this.data.splice(index,1)
    },
    addVisit () {
      let nform = {
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
      	visitType: '',
      	etype: 0
      }
      this.data.push(nform)
    },
  	sendOrder () {
      this.$refs.danform.validate(valid => {
      	if (valid) {
      		let _self = this
		  	let nform = []
		  	this.data.forEach(function(element,index){
		  	  if (element.visitType === 0) {
			    _self.demoban = _self.facemoban
			  } else {
			  	_self.demoban = _self.busmoban
			  }
		  	  let date = formatDate(element.appointmentDate,'yyyy-MM-dd hh:mm:ss')
              let obj = {
		  	  	address: _self.demoban.address,
		      	appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
		      	companyProfile: replaceQuotation(_self.demoban.companyProfile),
		      	empid: getCache('empid'),
		      	inviteContent: replaceQuotation(_self.demoban.inviteContent),
		      	latitude: _self.demoban.latitude,
		      	longitude: _self.demoban.longitude,
		      	name: element.name,
		      	phone: element.phone,
		      	qrcodeConf: _self.timetype === 0 ? '0' : '1',
		      	qrcodeType: _self.form.qrcodeType,
		      	remark: element.remark,
		      	traffic: replaceQuotation(_self.demoban.traffic),
		      	userid: getCache('userid'),
		      	vcompany: element.vcompany,
		      	visitType: element.visitType === 0 ? _self.$t('itype[0].label') : _self.$t('itype[1].label')
		  	   }
		  	   nform.push(obj)
		  	})
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