<template>
	<div>
    <template v-if="!isMobile">
      <el-row class="margintop20 marginbom20 ">
        <template v-if="inviteMoreShow">
          <p class="lh36">填写审批相关信息</p>
        </template>
        <template v-else>
          <p class="lh36">{{$t('moban.ctitle')}}
          <el-button class="right" @click="goDot">
            <i class="fa fa-list"></i>{{$t('moban.dot')}}
          </el-button></p>
        </template>
        
      </el-row>
    </template>
		  <div class="boxshadow bgwhite paddinglr30 paddingtb20">
	    	<el-form label-position="left" :model="form" :rules="rules" ref="danform" style="width:80%;" :style="{'width': isMobile ? '100%' : '80%'}">
          <template v-if="inviteMoreShow">
            <h3 class="marginbom20">审批信息</h3>
          </template>
          <template v-else>
            <h3 class="marginbom20">{{$t('moban.visitMess')}}</h3>
          </template>
	    	  
          <template v-if="inviteMoreShow">             
              <template v-if="form.vType == '普通访客'">
                <template v-for="(item,index) in formMore">
                  <el-row :gutter="20">
                    <el-col :span="1" >
                      <template v-if="index != 0">
                        <img :src="minusImg" alt="" style="margin-top: 40px;" @click="deleteVisitor(index)">
                      </template>
                      <template v-else>
                        <i style="width:22px;display:inline-block;"></i>
                      </template>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item :label="$t('form.name.text')" >
                        <el-input v-model="item.name" :placeholder="$t('visitor.vname')"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17">
                      <el-form-item :label="$t('sendType')" >
                        <el-row class="block" :gutter="20">
                          <el-col :span="8">
                            <el-select v-model="item.stype" >
                              <el-option key="0" :label="$t('form.phone.text')" :value="0"></el-option>
                              <el-option key="1" :label="$t('form.email.text')" :value="1"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="16">
                            <template v-if="internalPhoneShow">
                              <template v-if="internalPhoneShow">
                                <country-number @sendcode="getPhoneNumberMore"></country-number>
                              </template>
                              <template v-else>
                                <el-input v-model="item.sendValue" ></el-input>
                              </template>
                            </template>
                            <template v-else>
                              <el-input v-model="item.sendValue" ></el-input>
                            </template>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
                <el-row>
                  <el-col :span="2" ><img :src="addImg" alt="" @click="doAddVisitor"></el-col>
                  <el-col :span="10" @click="doAddVisitor">添加来访者</el-col>
                  <el-col :span="12" style="text-align:right;">
                    <down-invite-moban :dtype="1" :btype="1"></down-invite-moban>
                    <upload-invite e-type="primary" @sendkit="getUpload"></upload-invite>
                  </el-col>
                </el-row>
              </template>
              <template v-else>
                <el-row :gutter="20">
                    <el-form-item :label="$t('form.name.text')" prop="name">
                      <el-input v-model="formMore[0].name" :placeholder="$t('visitor.vname')" @change="setFormName"></el-input>
                    </el-form-item>
                </el-row>
              </template>
              <el-row :gutter="20">
                <el-form-item :label="$t('visitTypeText')" prop="vType">
                  <el-select class="block" v-model="form.vType" @change="getvType">
                    <el-option v-for="item in typelist" :key="item.vType" :label="item.vType" :value="item.vType"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>            
              <template v-if="form.vType == 'VIP'">
                <el-row :gutter="20" class="marginbom20" style="text-align:right;">
                  <el-button type="primary" @click="insertVip"><img :src="inputImg" alt="" style="margin-right:10px;" >填写VIP贵宾单</el-button>
                </el-row>
                <vip :clock-show="vipShow" :clear-form="clearForm" @getf="getVip" v-show="vipShow"></vip>
              </template>
              <template v-else-if="form.vType == '文涛仓'">
                <el-row :gutter="20" class="marginbom20" style="text-align:right;">
                  <el-button type="primary" @click="insertEsl"><img :src="inputImg" alt="" style="margin-right:10px;" >填写文书仓库依赖票</el-button>
                </el-row>
                <esl :esl-show="eslShow" :clear-form="clearForm" @eslform="getEsl" v-show="eslShow"></esl>
              </template>
          </template>
          <template v-else>
            <template v-if="vTypeShow">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item :label="$t('form.name.text')" prop="name">
                    <el-input v-model="form.name" :placeholder="$t('visitor.vname')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('visitTypeText')" >
                    <el-select class="block" v-model="form.vType" >
                      <el-option v-for="item in typelist" :key="item.vType" :label="item.vType" :value="item.vType"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-form-item :label="$t('form.name.text')" >
                <el-input v-model="form.name" :placeholder="$t('visitor.vname')"></el-input>
              </el-form-item>
            </template>
            <template v-if="empEmailSendClose">
              <el-form-item :label="$t('form.phone.text')" prop="sendValue">
                <el-input v-model="form.sendValue" :placeholder="$t('visitor.vphone')"></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-row :gutter="20">
                <el-form-item :label="$t('sendType')" prop="sendValue">
                  <el-row class="block" :gutter="20">
                    <el-col :span="6">
                      <el-select v-model="stype" >
                        <el-option key="0" :label="$t('form.phone.text')" :value="0"></el-option>
                        <el-option key="1" :label="$t('form.email.text')" :value="1"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="18">
                      <template v-if="internalPhoneShow">
                        <template v-if="internalPhoneShow">
                          <country-number @sendcode="getPhoneNumber"></country-number>
                        </template>
                        <template v-else>
                          <el-input v-model="form.sendValue" @change="setSendValue"></el-input>
                        </template>
                      </template>
                      <template v-else>
                        <el-input v-model="form.sendValue" @change="setSendValue"></el-input>
                      </template>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-row>
            </template>      
          </template>
          <template v-if="(inviteMoreShow&&form.vType=='普通访客')||!inviteMoreShow">
            <el-row :gutter="20">
              <el-form-item :label="$t('form.time.text6')" prop="appointmentDate">
                <el-date-picker
                  v-model="form.appointmentDate" style="width:100%"
                  type="datetime" class="block" :placeholder="$t('form.time.text3')" 
                  :picker-options="options" :default-time="['14:00:00', '18:00:00']">
                </el-date-picker>
              </el-form-item>
            </el-row>
            <el-form-item :label="$t('form.visitType.text')">
              <template v-if="customTemplateShow">
                <el-select v-model="visitType" class="block" style="width:100%" @change="getVtypeTemp">
                  <el-option
                    v-for="item in visitList"
                    :key="item.title"
                    :label="item.title"
                    :value="item.title">
                  </el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="visitType" class="block" style="width:100%" @change="getVtypeTemp">
                  <el-option
                    v-for="item in $t('itype')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
            <template v-if="empSendComRequired">
              <el-form-item :label="$t('form.company.text')" prop="vcompany">
                <el-input v-model="form.vcompany" :placeholder="$t('visitor.vcom')"></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item :label="$t('form.company.text')">
                <el-input v-model="form.vcompany" :placeholder="$t('visitor.vcom')"></el-input>
              </el-form-item>
            </template>
            <el-form-item :label="$t('form.remark.text')">
              <el-input v-model="form.remark" :placeholder="$t('form.remark.text')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.time.text7')" prop="qrcodeType">
              <el-row class="block" :gutter="20">
                <el-col :span="6">
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
                <el-col :span="18">
                  <el-input v-model.number="form.qrcodeType" :placeholder="qrcodePlace" @change="setQrcodeType"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </template>
		    </el-form>
        <template v-if="(inviteMoreShow&&form.vType == '普通访客') || !inviteMoreShow">
          <template v-if="customTemplateShow">
            <bom-moban v-show="customTemplateShow" :list="visitList" :default-type="visitType" @getmoban="getEmpCon" ></bom-moban>
          </template>
          <template v-else>
            <bom-moban v-show="!customTemplateShow" :default-type="visitType" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro" @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></bom-moban>
          </template>
        </template>
	    </div>
	    <div class="margintop20">
	    	<el-button type="success" @click="sendOrder">
          <template v-if="inviteMoreShow">发送审批</template>
          <template v-else>{{$t('btn.sendInvite')}}</template></el-button>
	    	<el-button type="default" @click="previewOrder" v-show="!isMobile">{{$t('btn.overview')}}</el-button>
	    </div>
        <moban-dialog :mobanFlag="mobanFlag" :ptip="$t('moban.tip1')" @closekit="getClose"></moban-dialog>
        <preview-dialog :obj="form" :mobanFlag="previewFlag"></preview-dialog>
	</div>
</template>
<script>
import vip from './vip'
import esl from './esl'
import {downInviteMoban} from '@/components/download'
import {uploadInvite} from '@/components/upload'
import countryNumber from '@/components/countrynumber/countryNumber'
import {mobanDialog,previewDialog} from '@/components/dialog'
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import { mobile_device_detect,replaceQuotation,replaceRemoveQuotation,replaceRemoveReserveQuotation,checkIsNull } from '@/utils/common'
import { formatDate } from '@/utils/index'
export default {
  components: { bomMoban,mobanDialog,previewDialog,countryNumber,downInviteMoban,uploadInvite,esl,vip },
  data () {
  	return {
      addImg: require('@/assets/img/add1.png'),
      minusImg: require('@/assets/img/minus.png'),
      inputImg: require('@/assets/img/insert.png'),
      vTypeShow: process.env.vTypeShow || false,
      timetypeShow: process.env.timetypeShow || 0,
      vipShow: false,
      eslShow: false,
      formMore: [{
        name: '',
        phone: '',
        vemail: '',
        stype: 0,
        sendValue: ''
      }],
      form: {
      	address: '',
      	appointmentDate: new Date(),
      	companyProfile: '',
      	empid: '',
      	inviteContent: '',
      	latitude: '',
      	longitude: '',
      	name: '',
      	phone: '',
        vemail: '',
      	qrcodeConf: '',
      	qrcodeType: 1,
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: '',
        sendValue: '',
        vType: ''
      },
      rules: {
      	name: [{ required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        vType: [{ required: true, message: this.$t('pleaseSelectVtype'), trigger: 'blur' }],
      	sendValue: [{ required: true, message: this.$t('sendTypeIsNull'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
      	appointmentDate: [{ required: true, message: this.$t('formCheck.time.tip1'), trigger: 'blur' }],
        vcompany: [{ required: true, message: this.$t('formCheck.validCompany.tip1'), trigger: 'blur' }],
      	qrcodeType: [
          { required: true, message: this.$t('form.time.text7')},
          { type: 'number', message: 'Number'}]
      },
      timetype: 0,
      visitType: null,
      mobanShow: false,
      facemoban: {},
      busmoban: {},
      demoban: {
        address: '',
        companyProfile: '',
        inviteContent: '',
        latitude: '',
        longitude: '',
        traffic: '',
        templateType: ''
      },
      stype: 0,
      sendValue: '',
      mobanShow: true,
      mobanFlag: false,
      previewFlag: false,
      options: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      typelist: [],
      isMobile: false,
      internalPhoneShow: process.env.internalPhoneShow || false,
      customTemplateShow: process.env.customTemplateShow || false,
      mobanObj: {},
      visitList: [],
      inviteMoreShow: process.env.inviteMoreShow || false,
      vipForm: {},
      bookForm: {},
      empEmailSendClose: process.env.empEmailSendClose || false,
      clearForm: false,
      empSendComRequired: process.env.empSendComRequired || false
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
  watch: {
    isMobile (val) {}
  },
  created () {
    let _self = this
    this.isMobile = mobile_device_detect()
    window.onresize = function(){
      _self.isMobile = mobile_device_detect()
    }    
  },
  mounted () {
      let _self = this
      this.$nextTick().then(function () {
        if (_self.vTypeShow) {
          _self.getTypeList()
        }
        if (_self.customTemplateShow) {
          if (!_self.inviteMoreShow) {
            _self.GetAllTemplateType()
          }
        } else {
          _self.visitType = 1
        }
    })
  },
  methods: {
    setFormName (val) {
      this.form.name = val
    },
    getvType (val) {
      this.vipShow = false
      this.eslShow = false
      if (val == '普通访客') {
        this.GetAllTemplateType()
      }
    },
    insertVip () {
      this.vipShow = !this.vipShow
      this.eslShow = false
    },
    insertEsl () {
      this.vipShow = false
      this.eslShow = !this.eslShow
    },
    getUpload (result) {
      let _self = this
      let varray = []
      result.forEach(function(ele,index){
        let obj = {
          name: ele.name,
          phone: '',
          vemail: '',
          stype: 0,
          sendValue: ''
        }
        if ((ele.vemail && ele.vemail != '')||(ele.vemail && ele.phone)) {
          obj.sendValue = ele.vemail
          obj.stype = 1
        } else {
          obj.sendValue = ele.phone
        }
        varray.push(obj)
      })
      this.formMore = varray
    },
    getEsl (val) {
      this.bookForm = val
    },
    getVip (val) {
      this.vipForm = val
    },
    deleteVisitor (index) {
      this.formMore.splice(index,1)
    },
    doAddVisitor () {
      let form = {
        name: '',
        phone: '',
        vemail: '',
        stype: 0,
        sendValue: ''
      }
      this.formMore.push(form)
    },
    getEmpCon (val) {
      this.mobanObj = val
    },
    getVtypeTemp (val) {
      this.visitType = val
    },
    setSendValue (val) {},
    getPhoneNumberMore (first,code,phone) {
      this.form.sendValue = first + code + phone
    },
    getPhoneNumber (first,code,phone) {
      this.form.sendValue = first + code + phone
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
    setQrcodeType (val) {
      if (this.timetype === 0) {
        if (val > getCache('qrMaxDuration')) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('daysUpTip')
          })
        }
      } else {
        if (val > getCache('qrMaxCount')) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('timesUpTip')
          })
        }
      }
    },
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
              _self.visitType = '面试'
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
  	sendOrder () {
      this.$refs.danform.validate(valid => {
      	if (valid) {
          if (this.customTemplateShow) {
            if ((this.inviteMoreShow&&this.form.vType == '普通访客') || !this.inviteMoreShow) {
              this.demoban = this.mobanObj[this.visitType]
            } else {
              this.demoban = {
                address: '',
                companyProfile: '',
                inviteContent: '',
                latitude: '',
                longitude: '',
                traffic: '',
                templateType: ''
              }
            }
            
          } else {
            if (this.visitType === 0) {
              this.demoban = this.facemoban
            } else if (this.visitType === 1){
              this.demoban = this.busmoban
            } else {
              this.demoban = {
                address: '',
                companyProfile: '',
                inviteContent: '',
                latitude: '',
                longitude: '',
                traffic: '',
                templateType: ''
              }
            }
          }
          if ((this.inviteMoreShow&&this.form.vType == '普通访客') || !this.inviteMoreShow) {
            if (!this.demoban.latitude && !this.demoban.longitude) {
              this.$message({
                showClose: true,
                type: 'warning',
                message: '邀请函暂无模板，请联系管理员设置邀请函模板'
              })
              return false
            }
          }
          
            if (this.stype === 0) {
              this.form.phone = this.form.sendValue
              this.form.vemail = ''
            } else {
              this.form.phone = ''
              this.form.vemail = this.form.sendValue
            }
            let date = formatDate(this.form.appointmentDate,'yyyy-MM-dd hh:mm:ss')
            let visitType
            let _self = this
            if (this.customTemplateShow) {
              visitType = this.demoban.templateType
            } else {
              visitType = this.visitType === 0 ? '面试' : '商务'
            }
            let nform 
            if (this.inviteMoreShow) {
              let farray = []
              nform = {
                alist: [],
                vf: this.vipForm,
                df: {}
              }
              if (this.form.vType == 'VIP') {
                nform = {
                  atlist: [],
                  vf: {
                    empid: getCache('empid'),
                    empName: getCache('empName'),
                    deptid: this.vipForm.deptid,
                    deptName: this.vipForm.deptName,
                    submitDate: new Date(this.vipForm.submitDate),
                    receptionDate: new Date(this.vipForm.receptionDate),
                    receptionPlace: this.vipForm.receptionPlace,
                    vCount: this.vipForm.vCount,
                    subReason: this.vipForm.subReason,
                    typeA: this.vipForm.typeA,
                    typeB: this.vipForm.typeB,
                    typeC: this.vipForm.typeC,
                    dependenceItem: this.vipForm.dependenceItem
                  }
                }
              } else if (this.form.vType == '文涛仓') {
                nform = {
                  atlist: [],
                  df: this.bookForm
                }
              } else {
                nform = {
                  atlist: []
                }
              }
              this.formMore.forEach(function(element, index) {
                if (element.name) {
                  if (element.stype == 0) {
                    element.phone = element.sendValue
                  } else {
                    element.vemail = element.sendValue
                  }
                  let nobj = {
                    address: _self.demoban.address,
                    appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
                    companyProfile: replaceQuotation(_self.demoban.companyProfile),
                    empid: getCache('empid'),
                    inviteContent: replaceQuotation(_self.demoban.inviteContent),
                    latitude: _self.demoban.latitude,
                    longitude: _self.demoban.longitude,
                    name: element.name,
                    phone: element.phone,
                    vemail: element.vemail,
                    qrcodeConf: _self.form.qrcodeType || 1,
                    qrcodeType: _self.timetype === 0 ? '0' : '1',
                    remark: _self.form.remark,
                    traffic: replaceQuotation(_self.demoban.traffic),
                    userid: getCache('userid'),
                    vcompany: _self.form.vcompany,
                    visitType: visitType
                  }
                  if (_self.vTypeShow) {              
                    nobj = {
                      address: _self.demoban.address,
                      appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
                      companyProfile: replaceQuotation(_self.demoban.companyProfile),
                      empid: getCache('empid'),
                      inviteContent: replaceQuotation(_self.demoban.inviteContent),
                      latitude: _self.demoban.latitude,
                      longitude: _self.demoban.longitude,
                      name: element.name,
                      phone: element.phone,
                      vemail: element.vemail,
                      qrcodeConf: _self.form.qrcodeType,
                      qrcodeType: _self.timetype === 0 ? '0' : '1',
                      remark: _self.form.remark,
                      traffic: replaceQuotation(_self.demoban.traffic),
                      userid: getCache('userid'),
                      vcompany: _self.form.vcompany,
                      visitType: visitType,
                      vType: _self.form.vType
                    }
                  }
                  farray.push(nobj)
                }
              })
              nform.atlist = farray
            } else {
              nform = [{
                address: this.demoban.address,
                appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
                companyProfile: replaceQuotation(this.demoban.companyProfile),
                empid: getCache('empid'),
                inviteContent: replaceQuotation(this.demoban.inviteContent),
                latitude: this.demoban.latitude,
                longitude: this.demoban.longitude,
                name: this.form.name,
                phone: this.form.phone,
                vemail: this.form.vemail,
                qrcodeConf: this.form.qrcodeType,
                qrcodeType: this.timetype === 0 ? '0' : '1',
                remark: this.form.remark,
                traffic: replaceQuotation(this.demoban.traffic),
                userid: getCache('userid'),
                vcompany: this.form.vcompany,
                visitType: visitType
              }]
              if (this.vTypeShow) {           
                nform = [{
                  address: this.demoban.address,
                  appointmentDate: new Date(Date.parse(date.replace(/-/g, '/'))),
                  companyProfile: replaceQuotation(this.demoban.companyProfile),
                  empid: getCache('empid'),
                  inviteContent: replaceQuotation(this.demoban.inviteContent),
                  latitude: this.demoban.latitude,
                  longitude: this.demoban.longitude,
                  name: this.form.name,
                  phone: this.form.phone,
                  vemail: this.form.vemail,
                  qrcodeConf: this.form.qrcodeType,
                  qrcodeType: this.timetype === 0 ? '0' : '1',
                  remark: this.form.remark,
                  traffic: replaceQuotation(this.demoban.traffic),
                  userid: getCache('userid'),
                  vcompany: this.form.vcompany,
                  visitType: visitType,
                  vType: this.form.vType
                }]
              }
            }
            
            let MaxCount = this.timetype === 0 ? parseInt(getCache('qrMaxDuration')) : parseInt(getCache('qrMaxCount'))
            if (parseInt(this.form.qrcodeType) > MaxCount) {
                this.$message({
                  showClose: true,
                  type: 'warning',
                  message: this.$t('uptoMax')
                })
                return false
            } else {
              this.doaddAppointment(nform)
            }
          
      	}
      })
  	},
    doaddAppointment (nform) {
      this.$store.dispatch('addAppointment',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.clearForm = true
          this.formMore = [{
            name: '',
            phone: '',
            vemail: '',
            stype: 0,
            sendValue: ''
          }]
          if (!this.isMobile) {
            this.mobanFlag = true
          } else {
            this.$message({
              message: this.$t('moban.tip'),
              type: 'success',
              showClose: false
            })
          }
          this.form = {
            address: '',
            appointmentDate: new Date(),
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
            sendValue: ''
          }
          if (this.vTypeShow) {
            this.form = {
              address: '',
              appointmentDate: new Date(),
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
              vType: nform.vType
            }
          }
          this.$refs.danform.resetFields()
          this.$refs.danform.clearValidate()
          if (this.inviteMoreShow) {
            if (this.vTypeShow) {
              this.form.vType = nform.atlist[0].vType
            }
          }
          this.vipShow = false
          this.eslShow = false
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