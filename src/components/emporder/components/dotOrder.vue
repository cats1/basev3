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
          <template v-if="vTypeShow">
            <el-table-column prop="vType" :label="$t('visitTypeText')" width="180">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.vType" :disabled="!numberToBoolean(scope.row.etype)">
                      <el-option v-for="item in typelist" :key="item.vType" :label="item.vType" :value="item.vType"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
            </el-table-column>
          </template>        
  				<el-table-column prop="vphone" :label="$t('form.phone.text')" width="180">
  					<template slot-scope="scope">
  				      <el-input v-model="scope.row.phone" :placeholder="$t('visitor.vphone')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
  				    </template>
  				</el-table-column>
          <template v-if="!empEmailSendClose">
            <el-table-column prop="vemail" :label="$t('form.email.text')" width="180">
              <template slot-scope="scope">
                  <el-input v-model="scope.row.vemail" :placeholder="$t('form.email.text')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
                </template>
            </el-table-column>
          </template>        
  				<el-table-column prop="visitType" :label="$t('tablehead[7]')" width="180">
  					<template slot-scope="scope">
              <template v-if="customTemplateShow">
                <el-select v-model="scope.row.visitType" class="block" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)">
                  <el-option
                    v-for="item in visitList"
                    :key="item.title"
                    :label="item.title"
                    :value="item.title">
                  </el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="scope.row.visitType" class="block" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)">
                  <el-option style="width:180px"
                      v-for="item in $t('itype')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </template>				      
  				  </template>
  				</el-table-column>
          <template v-if="tagShow">
            <el-table-column label="标签" width="220">
              <template slot-scope="scope">
                <el-select class="block" v-model="scope.row.tag" multiple placeholder="请选择" :disabled="!numberToBoolean(scope.row.etype)">
                  <el-option
                    v-for="item in tagList"
                    :key="item.tagName"
                    :label="item.tagName"
                    :value="item.tagName">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </template>
  				<el-table-column prop="appointmentDate" :label="$t('form.time.text6')" width="220">
  					<template slot-scope="scope">
  					    <el-date-picker :disabled="!numberToBoolean(scope.row.etype)"
  					      v-model="scope.row.appointmentDate"
  					      type="datetime" :picker-options="options" @change="updateType(scope.$index)"
  					      :placeholder="$t('formCheck.time.tip1')">
  					    </el-date-picker>
  				    </template>
  				</el-table-column>
  				<el-table-column prop="company" :label="$t('form.company.text2')" width="220">
  					<template slot-scope="scope">
  						<el-input v-model="scope.row.vcompany" :placeholder="$t('visitor.vcom')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
  				    </template>
  				</el-table-column>
  				<el-table-column prop="remark" :label="$t('form.remark.text')" width="220">
  					<template slot-scope="scope">
  						<el-input v-model="scope.row.remark" :placeholder="$t('form.remark.text')" @change="updateType(scope.$index)" :disabled="!numberToBoolean(scope.row.etype)"></el-input>
  				    </template>
  				</el-table-column>
  				<el-table-column prop="status" :label="$t('btn.edit1')" width="100">
  					<template slot-scope="scope">
  					  <el-button type="danger" size="small" v-if="numberToBoolean(scope.row.etype)" @click="delettype(scope.$index)" icon="el-icon-delete">{{$t('btn.deleteBtn')}}</el-button>
  				    <el-button type="primary" size="small" v-else @click="edittype(scope.$index)" icon="el-icon-edit">{{$t('btn.addBtn')}}</el-button>
  				    </template>
  				</el-table-column>
			  </el-table>
			  <div class="margintop20">
		      <el-button @click="addVisit" type="primary"><i class="fa fa-plus"></i>{{$t('btn.addVisitorBtn')}}</el-button>
		    </div>
	    	<el-form class="margintop20" :model="form" :rules="rules" ref="danform" style="width:70%;">
          <template v-if="tagShow">
            <template v-show="ccShow">
              <el-form-item label="抄送人员">
                <el-select class="block" v-model="empValue"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入抄送人员姓名"
                    :remote-method="remoteMethod"
                    :loading="loading" @change="getSearchEmp">
                    <el-option
                      v-for="item in empList"
                      :key="item.empid"
                      :label="item.empName"
                      :value="item.empid">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="接待事项">
                  <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="form.ccRemark">
                  </el-input>
              </el-form-item>
            </template>
          </template>	   
          <el-form-item label-position="left" :label="$t('form.time.text7')" prop="qrcodeType">            
		    		<el-row>
		    			<el-col :span="8">
			    			<el-select v-model="timetype" >
							    <template v-if="timetypeShow == 0">
                    <el-option
                      :key="$t('timetype')[0].value"
                      :label="$t('timetype')[0].label"
                      :value="$t('timetype')[0].value">
                    </el-option>
                  </template>
                  <template v-else-if="timetypeShow == 1">
                    <el-option
                      :key="$t('timetype')[1].value"
                      :label="$t('timetype')[1].label"
                      :value="$t('timetype')[1].value">
                    </el-option>
                  </template>
                  <template v-else>
                    <el-option
                      v-for="item in $t('timetype')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </template>
							</el-select>
			    		</el-col>
			    		<el-col :span="4">
			    			<el-input v-model.number="form.qrcodeType" :placeholder="qrcodePlace" @change="setQrcodeType"></el-input>
			    		</el-col>
		    		</el-row>
		    	</el-form-item>
		    </el-form>
        <template v-if="customTemplateShow">
          <bom-moban :list="visitList" :default-type="visitType" @getmoban="getEmpCon" ></bom-moban>
        </template>
        <template v-else>
          <bom-moban :is-all="true" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"
          @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></bom-moban>
        </template>
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
      empEmailSendClose: process.env.empEmailSendClose || false,
      vTypeShow: process.env.vTypeShow || false,
      typelist: [],
      timetypeShow: 0,
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
      	etype: 0,
        vType: '',
        tag: []
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
      	etype: 0,
        vType: '',
        tag: []
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
      	etype: 0,
        vType: '',
        tag: []
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
      	visitType: '',
        vType: '',
        ccNotify: '',
        ccRemark: ''
      },
      rules: {
      	name: [{ required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
      	phone: [{ required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
      	appointmentDate: [{ required: true, message: this.$t('formCheck.time.tip1'), trigger: 'blur' }],
      	qrcodeType: [{ required: true, message: this.$t('form.time.text7'), trigger: 'blur' }]
      },
      timetype: 0,
      visitType: 1,
      mobanShow: false,
      facemoban: {},
      busmoban: {},
      demoban: {},
      mobanShow: true,
      mobanFlag: false,
      previewFlag: false,
      options: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      visitList: [],
      customTemplateShow: process.env.customTemplateShow || false,
      mobanObj: {},
      inviteMoreShow: process.env.inviteMoreShow || false,
      tagShow: process.env.tagShow || false,
      tagList: [],
      tagValue: [],
      empValue: [],
      empList: [],
      ccShow: true,
      loading: false
  	}
  },
  computed: {
    qrcodePlace: {
      get () {
        if (this.timetype === 0) {
          if (getCache('qrMaxDuration') == 1) {
            this.form.qrcodeType = 1
            return ''
          } else {
            return this.$t('daysRange') + '：1-' + (getCache('qrMaxDuration') || '1')
          }
        } else {
          return this.$t('timesRange') + '：1-' + (getCache('qrMaxCount') || '1')
        }
      },
      set () {}
    }
  },
  created () {
    if (this.vTypeShow) {
      this.getTypeList()
    }
    if (this.customTemplateShow) {
      this.GetAllTemplateType()
    }
    if (this.tagShow) {
      this.getTags()
    }
  },
  methods: {
    numberToBoolean:numberToBoolean,
    getEmpCon (val) {
      this.mobanObj = val
    },
    GetAllTemplateType () {
      let newForm = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetAllTemplateType',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          this.visitList = []
          let _self = this
          result.forEach(function(element, index) {
            let idName = ''
            let showValue = false
            let closable = true
            if (element.templateType == '面试') {
              idName = 'face'
              showValue = true
              closable = false
              _self.initShowValue = element.name
              _self.editableTabsValue = index.toString()
              _self.tabIndex = index
            } else if (element.templateType == '商务') {
              idName = 'bus'
              closable = false
              showValue = false
            } else {
              idName = 'new' + index
              showValue = false
            }
            let obj = {
              title: element.templateType,
              name: index.toString(),
              id: idName,
              showValue: showValue,
              closable: closable
            }
            _self.visitList.push(obj)
          })
        }
      })
    },
    getTypeList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getVisitorType',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.typelist = result
        }
      })
    },
    getTags () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getTags',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.tagList = result
        }
      })
    },
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.searchEmp(query)
        }, 200);
      } else {
        this.empList = []
      }
    },
    getSearchEmp (val) {
      this.form.ccNotify = val.join(',')
    },
    searchEmp (val) {
      let nform = {
        name: val,
        userid: getCache('userid')
      }
      this.$store.dispatch('getEmpByName',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.empList = result
        }
      })
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
      let _self = this
      this.data.forEach(function(ele,index){
        _self.$set(ele,'etype',1)
        _self.$set(ele,'tag', [])
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
            etype: 0,
            vType: ''
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
      	etype: 0,
        vType: ''
      }
      this.data.push(nform)
    },
  	sendOrder () {
      this.$refs.danform.validate(valid => {
      	if (valid) {
      		let _self = this
		  	  let nform = []
		  	  this.data.forEach(function(element,index){
            if (element.etype) {
    		  	  let demoban
              if (_self.customTemplateShow) {
                demoban = _self.mobanObj[element.visitType]
              } else {
                if (parseInt(element.visitType) === 0 || element.visitType === '面试') {
                  demoban = _self.facemoban
                } else if (parseInt(element.visitType) === 1 || element.visitType === '商务') {
                  demoban = _self.busmoban
                }
              }
              let visitType
              if (_self.customTemplateShow) {
                visitType = demoban.templateType
              } else {
                visitType = parseInt(element.visitType) === 0 ? '面试' : '商务'
              }
              if (element.name !== '' && element.phone !== '' && element.visitType !== '' && element.appointmentDate !== '') {
                  let date = new Date(element.appointmentDate)
                  let obj = {
                    address: demoban.address,
                    appointmentDate: date,
                    companyProfile: replaceQuotation(demoban.companyProfile),
                    empid: getCache('empid'),
                    inviteContent: replaceQuotation(demoban.inviteContent),
                    latitude: demoban.latitude,
                    longitude: demoban.longitude,
                    name: element.name,
                    phone: element.phone,
                    vemail: element.vemail,
                    qrcodeConf: _self.form.qrcodeType,
                    qrcodeType: _self.timetype === 0 ? '0' : '1',
                    remark: element.remark,
                    traffic: replaceQuotation(demoban.traffic),
                    userid: getCache('userid'),
                    vcompany: element.vcompany,
                    visitType: visitType
                  }
                  if (_self.vTypeShow) {
                    obj = {
                      address: demoban.address,
                      appointmentDate: date,
                      companyProfile: replaceQuotation(demoban.companyProfile),
                      empid: getCache('empid'),
                      inviteContent: replaceQuotation(demoban.inviteContent),
                      latitude: demoban.latitude,
                      longitude: demoban.longitude,
                      name: element.name,
                      phone: element.phone,
                      vemail: element.vemail,
                      qrcodeConf: _self.form.qrcodeType,
                      qrcodeType: _self.timetype === 0 ? '0' : '1',
                      remark: element.remark,
                      traffic: replaceQuotation(demoban.traffic),
                      userid: getCache('userid'),
                      vcompany: element.vcompany,
                      visitType: visitType,
                      vType: element.vType
                    }
                    if (_self.tagShow) {
                      let ccNotify = ''
                      let ccRemark = ''
                      if (element.vType == 'VVIP') {
                        ccNotify = _self.form.ccNotify
                        ccRemark = _self.form.ccRemark
                      }
                      obj = {
                        address: demoban.address,
                        appointmentDate: date,
                        companyProfile: replaceQuotation(demoban.companyProfile),
                        empid: getCache('empid'),
                        inviteContent: replaceQuotation(demoban.inviteContent),
                        latitude: demoban.latitude,
                        longitude: demoban.longitude,
                        name: element.name,
                        phone: element.phone,
                        vemail: element.vemail,
                        qrcodeConf: _self.form.qrcodeType,
                        qrcodeType: _self.timetype === 0 ? '0' : '1',
                        remark: element.remark,
                        traffic: replaceQuotation(demoban.traffic),
                        userid: getCache('userid'),
                        vcompany: element.vcompany,
                        visitType: visitType,
                        vType: element.vType,
                        tag: element.tag.join(','),
                        ccNotify: ccNotify,
                        ccRemark: ccRemark
                      }
                    }
                  }

                  nform.push(obj)
              }
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
              this.doaddAppointment(nform)
            }
          }
      	}
      })
  	},
    doaddAppointment (nform) {
      let formObj
      if (this.inviteMoreShow) {
        formObj = {
          atlist: nform
        }
      } else {
        formObj = nform
      }
      this.$store.dispatch('addAppointment',formObj).then(res => {
        let {status} = res
        if (status === 0) {
          this.mobanFlag = true
                  this.form = {
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
                    sendValue: '',
                    vType: ''
                  }
                  this.data = [{
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
                    etype: 0,
                    vType: '',
                    tag: []
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
                    etype: 0,
                    vType: '',
                    tag: []
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
                    etype: 0,
                    vType: '',
                    tag: []
                  }]
                  this.empValue = []
                  this.form.ccNotify = ''
                  this.form.ccRemark = ''
                  this.$refs.danform.resetFields()
                  this.$refs.danform.clearValidate()
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