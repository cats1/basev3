<template>
	<div :class="{'noedit': !readonly}">
		<m-header class="marginbom20" :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
		<tinymce class="margintop20" :id="contentId" :height=400 ref="ceditor" v-model="inviteContent" @input="getcon"></tinymce>
		<h3 class="margintop20 marginbom20">{{$t('moban.traffic')}}</h3>
		<template v-if="baiduMapShow">
	      <map-component :isshow="mapIsShow" class="marginbom20" :address="address" :sendpot="pot" :mapid="mapid" style="width:80%;" @getpoint="getAddress"></map-component>
	    </template>
		<h3 class="margintop20 marginbom20" >{{$t('moban.traffic')}}</h3>
	    <tinymce :height=100 :toolbar-show="false" :menubar-show="false" :img-show="false" :id="trafficId" ref="teditor" v-model="traffic" @input="gettraffic"></tinymce>
	    <h3 class="margintop20 marginbom20">{{$t('moban.compro')}}</h3>
	    <tinymce :height=100 :toolbar-show="false" :menubar-show="false" :img-show="false" :id="companyProfileId" ref="comeditor" v-model="companyProfile" @input="getcompro"></tinymce>
	    <div class="margintop20">
	      <el-button type="primary" @click="saveMoban">{{$t('btn.saveMobanBtn')}}</el-button>
	    </div>
	</div>
</template>
<script>
import mHeader from './components/mHeader'
import Tinymce from '@/components/tinymce/tiny'
//import {MapComponent,googleMap} from '@/components/map'
import {MapComponent} from '@/components/map'
import { getCache } from '@/utils/auth'
import { valueToString,replaceQuotation,replaceRemoveQuotation,replaceRemoveReserveQuotation } from '@/utils/common'
export default {
  props: {
    mtype: null,
    mapid: {
      type: String,
      default: ''
    },
    isshow: {
      type: Boolean,
      default: false
    },
    isInit: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  components: { mHeader,Tinymce,MapComponent},
  data () {
    return {
      contentId: 'vue-tinymce-content-' + this.mapid,
      trafficId: 'vue-tinymce-traffic-' + this.mapid,
      companyProfileId: 'vue-tinymce-profile-' + this.mapid,
      isChangeXSS: process.env.isChangeXSS || false,
      empWorkNoCheck: process.env.empWorkNoCheck,
      mapValue: process.env.mapValue || 0,
      baiduMapShow: false,
      googleMapShow: false,
      mapIsShow: this.isshow,
      defaultmoban: {},
      vtype: '',
      inviteContent: '',
      traffic: '',
      companyProfile: '',
      address: '',
      pot: {
        latitude: '',
        longitude: ''
      },
      customTemplateShow: process.env.customTemplateShow || false
    }
  },
  watch: {
    traffic (val, oldval) {},
    isshow (val) {
      this.mapIsShow = val
      if (val) {
        this.init()
      }
    },
    isInit (val) {
      if (val) {
        this.init()
      }
    }
  },
  created () {
    this.vtype = this.mtype
    if (this.isInit && this.customTemplateShow) {
      this.init()
    }
  },
  mounted () {
    if (this.mapValue == 0) {
      this.baiduMapShow = true
      this.googleMapShow = false
    } else if (this.mapValue == 1) {
      this.baiduMapShow = false
      this.googleMapShow = true
    }
  },
  methods: {
  	init () {
  	  this.GetUserInfoMes()
  	  this.getTempByType(this.vtype)
  	},
  	async GetUserInfoMes () {
      if(parseInt(getCache('subaccountId')) !== 0) {
        await this.getSubAccountById()
      }
    },
    getSubAccountById () {
      let nform = {
        id: getCache('subaccountId')
      }
      this.$store.dispatch('getSubAccountById',nform)
    },
    getTempByType (type) {
      if(parseInt(getCache('subaccountId')) !== 0) {
        if (parseInt(getCache('tempEditSwitch')) === 1) {
          this.getUsertemplate(type)
        } else {
          this.getEmptemplateByType(type)
        }
      } else { //联合办公开启
        this.getEmptemplateByType(type)
      }
    },
    getEmptemplateByType (type) {
      let newForm = {
        empid: getCache('empid'),
        visitType: type
      }
      this.$store.dispatch('getEmptemplateByType',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          if(result) {
            this.showDefault(type,result)
          } else {
            if (parseInt(getCache('subaccountId')) === 0) { //子公司id为0，联合办公模式关闭
              if (parseInt(getCache('tempEditSwitch')) === 0) {
                //showAlert('员工编辑模式开启，该员工' + type + '模板未设置,将读取公司模板', -1);
              }
              this.getUsertemplate(type)
            } else { //联合办公开启
              this.getSubAccountTemp(type)
            }
          }
        }
      })
    },
    getSubAccountTemp (type) {
      let newForm = {
        userid: getCache('userid'),
        subaccountId: getCache('subaccountId'),
        templateType: type
      }
      this.$store.dispatch('getSubAccountTemp',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          if (result != null && result != 'null') {
            this.showDefault(type,result)
          } else {
            //showAlert('子公司' + type + '模板未设置,请先设置模板', -1);
            this.getUsertemplate(type)
          }
        }
      })
    },
    getUsertemplate (type) {
      let newForm = {
        userid: getCache('userid'),
        templateType: type
      }
      this.$store.dispatch('getUsertemplate',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          if (result != null && result != 'null') {
            this.showDefault(type,result)
          } else {
            this.showDefault(type,result)
          }
        }
      })
    },
    showDefault (type,result) {
        if (!result) {
          this.getDefaultMoBan(type)
        } else {
          this.showDefaultDom(result)
        }
    },
    getDefaultMoBan () {
      let newForm = {
        empid: getCache('empid')
      }
      this.$store.dispatch('getEmptempByPost',newForm)
    },
    async htmlUnescape (val,type) {
      await this.$store.dispatch('htmlUnescape',
        {'inviteContent': val}).then(res => {
          this[type] = replaceRemoveReserveQuotation(res)
      })
    },
    showDefaultDom (result) {
        if (!result.inviteContent) {
          this.setDefaultMoban() 
        }
        if (this.isChangeXSS) {
        	this.htmlUnescape(replaceRemoveQuotation(result.inviteContent),'inviteContent').then(() => {
	            this.htmlUnescape(replaceRemoveQuotation(result.traffic),'traffic').then(() => {
	              this.htmlUnescape(replaceRemoveQuotation(result.companyProfile),'companyProfile').then(() => {
	                this.pot.latitude = result.latitude
	                this.pot.longitude = result.longitude 
	                this.address = result.address
	                let sendObj = result
	                sendObj.inviteContent = this.inviteContent
	                sendObj.traffic = this.traffic
	                sendObj.companyProfile = this.companyProfile
	                this.$emit('getmoban',sendObj)
	              })
	            })
            })
        } else {
	        this.inviteContent = replaceRemoveQuotation(result.inviteContent)
	        this.traffic = replaceRemoveQuotation(result.traffic)
	        this.companyProfile = replaceRemoveQuotation(result.companyProfile)
	        this.pot.latitude = result.latitude
	        this.pot.longitude = result.longitude 
	        this.address = result.address
	        this.$emit('getmoban',result)
        }
    },
    getcon (val) {
      let obj = {
      	inviteContent: val,
      	traffic: this.traffic,
      	companyProfile: this.companyProfile,
      	latitude: this.pot.latitude,
      	longitude: this.pot.longitude,
      	address: this.address,
      	templateType: this.vtype
      }
      this.$emit('getmoban',obj)
    },
    getAddress (point,address) {
      this.pot.latitude = point.latitude
      this.pot.longitude = point.longitude
      this.address = address
      let obj = {
      	inviteContent: this.inviteContent,
      	traffic: this.traffic,
      	companyProfile: this.companyProfile,
      	latitude: point.latitude,
      	longitude: point.longitude,
      	address: address,
      	templateType: this.vtype
      }
      this.$emit('getmoban',obj)
    },
    gettraffic (val) {
      let obj = {
      	inviteContent: this.inviteContent,
      	traffic: val,
      	companyProfile: this.companyProfile,
      	latitude: this.pot.latitude,
      	longitude: this.pot.longitude,
      	address: this.address,
      	templateType: this.vtype
      }
      this.$emit('getmoban',obj)
    },
    getcompro (val) {
      let obj = {
      	inviteContent: this.inviteContent,
      	traffic: this.traffic,
      	companyProfile: val,
      	latitude: this.pot.latitude,
      	longitude: this.pot.longitude,
      	address: this.address,
      	templateType: this.vtype
      }
      this.$emit('getmoban',obj)
    },
    saveMoban () {
      let nform = {
        address: this.address,
        companyProfile: replaceQuotation(this.companyProfile),
        empEmail: '',
        empPhone: getCache('empPhone'),
        inviteContent: replaceQuotation(this.inviteContent),
        latitude: this.pot.latitude,
        longitude: this.pot.longitude,
        templateType: this.vtype,
        traffic: replaceQuotation(this.traffic),
        userid: getCache('userid')
      }
      if (this.empWorkNoCheck) {
        nform = {
          address: this.address,
          companyProfile: replaceQuotation(this.companyProfile),
          empEmail: '',
          empNo: getCache('empNo'),
          inviteContent: replaceQuotation(this.inviteContent),
          latitude: this.pot.latitude,
          longitude: this.pot.longitude,
          templateType: this.vtype,
          traffic: replaceQuotation(this.traffic),
          userid: getCache('userid')
        }
      }
      this.$store.dispatch('addEmptemplate',nform)
    }
  }
}
</script>