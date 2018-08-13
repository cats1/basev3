<template>
	<div>
		  <el-row class="margintop20 marginbom20 ">
	      <p class="lh36">{{$t('moban.ctitle')}}
	      <el-button class="right" @click="goDot"><i class="fa fa-list"></i>{{$t('moban.dot')}}</el-button></p>
	    </el-row>
	    <div class="boxshadow bgwhite paddinglr30 paddingtb20">
	    	<el-form label-position="left" :model="form" :rules="rules" ref="danform" style="width:50%;">
	    	  <h3 class="marginbom20">{{$t('moban.visitMess')}}</h3>
		    	<el-form-item :label="$t('form.name.text')" prop="name">
		    	  <el-input v-model="form.name" :placeholder="$t('visitor.vname')"></el-input>
		    	</el-form-item>
		    	<!-- <el-form-item :label="$t('form.phone.text')" prop="phone">
		    		<el-input v-model="form.phone" :placeholder="$t('visitor.vphone')"></el-input>
		    	</el-form-item> -->
          <el-form-item :label="$t('sendType')" prop="sendValue">
            <el-row class="block">
              <el-col :span="12">
                <el-select v-model="stype" >
                  <el-option key="0" :label="$t('form.phone.text')" :value="0"></el-option>
                  <el-option key="1" :label="$t('form.email.text')" :value="1"></el-option>
              </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="form.sendValue" @change="setSendValue"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
		    	<el-form-item :label="$t('form.time.text6')" prop="appointmentDate">
		    		<el-date-picker
				      v-model="form.appointmentDate" style="width:100%"
				      type="datetime" class="block" :placeholder="$t('visitor.ordertime')" 
              :picker-options="options" :default-time="['14:00:00', '18:00:00']">
				    </el-date-picker>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.visitType.text')">
		    		<el-select v-model="visitType" class="block" style="width:100%">
					    <el-option
					      v-for="item in $t('itype')"
					      :key="item.value"
						  :label="item.label"
						  :value="item.value">
					    </el-option>
					</el-select>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.company.text')">
		    		<el-input v-model="form.vcompany" :placeholder="$t('visitor.vcom')"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.remark.text')">
		    		<el-input v-model="form.remark" :placeholder="$t('form.remark.text')"></el-input>
		    	</el-form-item>
		    	<el-form-item :label="$t('form.time.text7')" prop="qrcodeType">
		    		<el-row class="block">
		    			<el-col :span="12">
			    			<el-select v-model="timetype" >
							    <el-option
							      v-for="item in $t('timetype')"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
			    		</el-col>
			    		<el-col :span="12">
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
        <preview-dialog :obj="form" :mobanFlag="previewFlag"></preview-dialog>
        <!-- <preview-dialog :obj="form" @closekit="getClose" :mobanFlag="previewFlag"></preview-dialog> -->
	</div>
</template>
<script>
import {mobanDialog,previewDialog} from '@/components/dialog'
import { getCache } from '@/utils/auth'
import bomMoban from './bomMoban'
import { replaceQuotation } from '@/utils/common'
import { formatDate } from '@/utils/index'
export default {
  components: { bomMoban,mobanDialog,previewDialog },
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
        vemail: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: '',
        sendValue: ''
      },
      rules: {
      	name: [{ required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
      	sendValue: [{ required: true, message: this.$t('sendTypeIsNull'), trigger: 'blur' }],
      	appointmentDate: [{ required: true, message: this.$t('formCheck.time.tip1'), trigger: 'blur' }],
      	qrcodeType: [
          { required: true, message: this.$t('form.time.text7')},
          { type: 'number', message: 'Number'}]
      },
      timetype: 0,
      visitType: 0,
      mobanShow: false,
      facemoban: {},
      busmoban: {},
      demoban: {},
      stype: 0,
      sendValue: '',
      mobanShow: true,
      mobanFlag: false,
      previewFlag: false,
      options: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
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
    setSendValue (val) {
      console.log(val)
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
  	sendOrder () {
      this.$refs.danform.validate(valid => {
      	if (valid) {
          
      		if (this.visitType === 0) {
		        this.demoban = this.facemoban
		  	  } else {
		  	  	this.demoban = this.busmoban
		  	  }
          if (!this.demoban.latitude && !this.demoban.longitude) {
            this.$message({
              showClose: true,
              type: 'warning',
              message: '邀请函暂无模板，请联系管理员设置邀请函模板'
            })
          } else {
            if (this.stype === 0) {
              this.form.phone = this.form.sendValue
              this.form.vemail = ''
            } else {
              this.form.phone = ''
              this.form.vemail = this.form.sendValue
            }
            let date = formatDate(this.form.appointmentDate,'yyyy-MM-dd hh:mm:ss')
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
              vemail: this.form.vemail,
              qrcodeConf: this.timetype === 0 ? '0' : '1',
              qrcodeType: this.form.qrcodeType,
              remark: this.form.remark,
              traffic: replaceQuotation(this.demoban.traffic),
              userid: getCache('userid'),
              vcompany: this.form.vcompany,
              visitType: this.visitType === 0 ? '面试' : '商务'
            }]
            let MaxCount = this.timetype === 0 ? parseInt(getCache('qrMaxDuration')) : parseInt(getCache('qrMaxCount'))
            if (parseInt(this.form.qrcodeType) > MaxCount) {
              this.$message({
                showClose: true,
                type: 'warning',
                message: this.$t('uptoMax')
              })
              return false
            } else {
              this.$store.dispatch('addAppointment',nform).then(res => {
                let {status} = res
                if (status === 0) {
                  this.mobanFlag = true
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