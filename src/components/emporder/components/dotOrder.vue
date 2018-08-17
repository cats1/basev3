<template>
	<div>
		  <el-row class="margintop20 marginbom20">
	      <p class="lh36">{{$t('moban.ctitle')}}
          <el-button class="right" @click="goDan"><i class="fa fa-dot-circle-o"></i>{{$t('moban.single')}}</el-button>
        </p>
	    </el-row>
	    <div class="boxshadow bgwhite paddinglr30 paddingtb20">
	    	<h3>{{$t('moban.visitMess')}}
          <div class="right">
            <down-invite-moban :dtype="1" :btype="1"></down-invite-moban>
            <upload-invite e-type="primary" @sendkit="getUpload"></upload-invite>
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
				      <el-input v-model="scope.row.name" :placeholder="$t('visitor.vname')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="vphone" :label="$t('form.phone.text')" width="180">
					<template slot-scope="scope">
				      <el-input v-model="scope.row.phone" :placeholder="$t('visitor.vphone')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
				    </template>
				</el-table-column>
        <el-table-column prop="vemail" :label="$t('form.email.text')" width="180">
          <template slot-scope="scope">
              <el-input v-model="scope.row.vemail" :placeholder="$t('form.email.text')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
            </template>
        </el-table-column>
				<el-table-column prop="visitType" :label="$t('tablehead[7]')" width="180">
					<template slot-scope="scope">
				      <el-select v-model="scope.row.visitType" class="block" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)">
    						<el-option style="width:180px"
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
					    <el-date-picker :disabled="!numberToBoolean(scope.row.etype)"
					      v-model="scope.row.appointmentDate"
					      type="datetime" @change="updateType(scope.$index)"
					      :placeholder="$t('formCheck.time.tip1')">
					    </el-date-picker>
				    </template>
				</el-table-column>
				<el-table-column prop="company" :label="$t('form.company.text2')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.vcompany" :placeholder="$t('visitor.vcom')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="remark" :label="$t('form.remark.text')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark" :placeholder="$t('form.remark.text')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
				    </template>
				</el-table-column>
				<el-table-column prop="status" :label="$t('btn.edit1')" width="100">
					<template slot-scope="scope">
					  <el-button type="danger" size="small" v-if="numberToBoolean(scope.row.etype)" @click="delettype" icon="el-icon-delete">{{$t('btn.deleteBtn')}}</el-button>
				    <el-button type="primary" size="small" v-else @click="edittype(scope.$index)" icon="el-icon-edit">{{$t('btn.addBtn')}}</el-button>
				    </template>
				</el-table-column>
			</el-table>
			<div class="margintop20">
		      <el-button @click="addVisit" type="primary"><i class="fa fa-plus"></i>{{$t('btn.addVisitorBtn')}}</el-button>
		    </div>
	    	<el-form class="margintop20" :model="form" :rules="rules" ref="danform" style="width:70%;">	   
          <el-form-item label-position="left" :label="$t('form.time.text7')" prop="qrcodeType">
		    		<el-row>
		    			<el-col :span="8">
			    			<el-select v-model="timetype" >
							    <el-option
							      v-for="item in $t('timetype')"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
			    		</el-col>
			    		<el-col :span="4">
			    			<el-input v-model.number="form.qrcodeType" :placeholder="qrcodePlace" @change="setQrcodeType"></el-input>
			    		</el-col>
		    		</el-row>
		    	</el-form-item>
		    </el-form>
		    <bom-moban @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"
		    @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></bom-moban>
	    </div>
	    <div class="margintop20">
	    	<el-button type="success" @click="sendOrder">{{$t('btn.sendInvite')}}</el-button>
        <el-button type="default" @click="previewOrder">{{$t('btn.overview')}}</el-button>
	    </div>
      <moban-dialog :mobanFlag="mobanFlag" :ptip="$t('moban.tip1')" @closekit="getClose"></moban-dialog>
      <preview-dialog :obj="data[0]" @closekit="getClose" :mobanFlag="previewFlag"></preview-dialog>
	</div>
</template>
<script>
import {mobanDialog,previewDialog} from '@/components/dialog'
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import {downInviteMoban} from '@/components/download'
import {uploadInvite} from '@/components/upload'
import { replaceQuotation,booleanToNumber,numberToBoolean } from '@/utils/common'
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
        vemail: '',
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
        vemail: '',
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
        vemail: '',
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
        vemail: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: ''
      },
      rules: {
      	name: [{ required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
      	phone: [{ required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
      	appointmentDate: [{ required: true, message: this.$t('formCheck.time.tip1'), trigger: 'blur' }],
      	qrcodeType: [{ required: true, message: this.$t('form.time.text7'), trigger: 'blur' }]
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
  computed: {
    qrcodePlace: {
      get () {
        if (this.timetype === 0) {
          return this.$t('daysRange') + '：1-' + getCache('qrMaxDuration')
        } else {
          return this.$t('timesRange') + '：1-' + getCache('qrMaxCount')
        }
      },
      set () {}
    }
  },
  methods: {
    numberToBoolean:numberToBoolean,
    setQrcodeType (val) {
      if (this.timetype === 0) {
        if (val > getCache('qrMaxDuration')) {
          this.$message({
            type: 'warning',
            message: this.$t('daysUpTip')
          })
        }
      } else {
        if (val > getCache('qrMaxCount')) {
          this.$message({
            type: 'warning',
            message: this.$t('timesUpTip')
          })
        }
      }
    },
    updateType (val) {
      this.data[val].etype = 1
    },
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
      this.data = result
      let _self = this
      this.data.forEach(function(ele,index){
        _self.$set(ele,'etype',1)
      })
    },
    edittype (index) {
      this.data[index].etype = 1
    },
    delettype (index) {
      if (this.data.length > 1) {
        this.data.splice(index,1)
      } else {
        this.data[index] = {
            address: '',
            appointmentDate: '',
            companyProfile: '',
            empid: '',
            inviteContent: '',
            latitude: '',
            longitude: '',
            name: '',
            phone: '',
            vemail: '',
            qrcodeConf: '',
            qrcodeType: '',
            remark: '',
            traffic: '',
            userid: '',
            vcompany: '',
            visitType: '',
            etype: 0
          }
        this.$message({
          type: 'error',
          message: this.$t('moban.tip5')
        })
      }
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
        vemail: '',
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
          if (element.name !== '' && element.phone !== '' && element.visitType !== '' && element.appointmentDate !== '') {
                let date = new Date(element.appointmentDate)
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
                  vemail: element.vemail,
                  qrcodeConf: _self.timetype === 0 ? '0' : '1',
                  qrcodeType: _self.form.qrcodeType,
                  remark: element.remark,
                  traffic: replaceQuotation(_self.demoban.traffic),
                  userid: getCache('userid'),
                  vcompany: element.vcompany,
                  visitType: _self.visitType === 0 ? '面试' : '商务'
                }
                nform.push(obj)
          }    
      	})
          let MaxCount = _self.timetype === 0 ? parseInt(getCache('qrMaxDuration')) : parseInt(getCache('qrMaxCount'))
          if (parseInt(_self.form.qrcodeType) > MaxCount) {
            _self.$message({
              type: 'warning',
              message: _self.$t('uptoMax')
            })
            return false
          } else {
            if (nform.length === 0) {
              this.$message({
                type: 'warning',
                message: this.$t('moban.tip6')
              })
            } else {
              this.$store.dispatch('addAppointment',nform).then(res => {
                let {status} = res
                if (status === 0) {
                  this.mobanFlag = true
                  this.$refs.danform.resetFields()
                  this.$refs.danform.clearValidate()
                }
              })
            }
          }
      	}
      })
  	},
  	editMoban () {
  	  this.mobanShow = !this.mobanShow
  	},
    getClose () {
      this.mobanFlag = false
      this.previewFlag = false
    },
    previewOrder () {
      this.previewFlag = true
    }
  }
}
</script>