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
				<el-table-column prop="vname" :label="$t('form.name.text')" width="180">
					<template slot-scope="scope">
				      <el-input v-model="scope.row.name"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="vphone" :label="$t('form.phone.text')" width="180">
					<template slot-scope="scope">
				      <el-input v-model="scope.row.phone"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="visitType" :label="$t('tablehead[7]')" width="120">
					<template slot-scope="scope">
				      <el-select v-model="scope.row.visitType" class="block">
						<el-option style="width:200px"
						    v-for="item in $t('itype')"
						    :key="item.value"
  							:label="item.label"
  							:value="item.value">
						</el-option>
					  </el-select>
				    </template>
				</el-table-column>
				<el-table-column prop="appointmentDate" :label="$t('form.time.text6')" width="220">
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
				<el-table-column prop="status" :label="$t('btn.edit1')" width="100">
					<template slot-scope="scope">
					  <el-button type="error" v-if="!scope.row.etype" @click="delettype">{{$t('btn.deleteBtn')}}</el-button>
				      <el-button type="primary" v-else @click="edittype">{{$t('btn.addBtn')}}</el-button>
				    </template>
				</el-table-column>
			</el-table>
			<div class="margintop20">
		      <el-button @click="addVisit">{{$t('btn.addVisitorBtn')}}</el-button>
		    </div>
	    	<el-form class="margintop20" :model="form" :rules="rules" ref="danform" label-width="100px" style="width:70%;">	   
          <el-form-item label-position="left" :label="$t('form.time.text7')" prop="qrcodeType">
		    		<el-row>
		    			<el-col :span="8">
			    			<el-select v-model="timetype" placeholder="请选择">
							    <el-option
							      v-for="item in $t('timetype')"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
			    		</el-col>
			    		<el-col :span="4">
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
      <moban-dialog :mobanFlag="mobanFlag" :ptip="$t('moban.tip1')" @closekit="getClose"></moban-dialog>
      <preview-dialog :obj="form" :mobanFlag="previewFlag"></preview-dialog>
	</div>
</template>
<script>
import {mobanDialog,previewDialog} from '@/components/dialog'
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import {downInviteMoban} from '@/components/download'
import {uploadInvite} from '@/components/upload'
import { replaceQuotation } from '@/utils/common'
import { formatDate } from '@/utils/index'
export default {
  components: { bomMoban,downInviteMoban,uploadInvite,mobanDialog,previewDialog },
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
      demoban: {},
      mobanShow: true,
      mobanFlag: false,
      previewFlag: false
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
      console.log(val)
      this.facemoban = val
    },
    getinitbus (val) {
      console.log(val)
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
		  	  if (element.visitType === 0 || element.visitType === '面试') {
  			    _self.demoban = _self.facemoban
  			  } else {
  			  	_self.demoban = _self.busmoban
  			  }
          let date = new Date(element.appointmentDate)
          /*if (element.appointmentDate.indexOf('/') >0) {
            date = Date.parse(element.appointmentDate.replace(/-/g, '/'))
          } else {
            date = new Date(element.appointmentDate)
          }*/
          let obj = {
      		  	  	address: _self.demoban.address,
      		      	appointmentDate: date,
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
      		      	visitType: element.visitType
      		  	   }
      		  	   nform.push(obj)
      		})
  	  		this.$store.dispatch('addAppointment',nform).then(res => {
  	  		  let {status} = res
  	  		  if (status === 0) {
              this.mobanFlag = true
            }
  	  		})
      	}
      })
  	},
  	editMoban () {
  	  this.mobanShow = !this.mobanShow
  	},
    getClose () {
      console.log('8989')
    }
  }
}
</script>