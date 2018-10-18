<template>
  <div :class="{'noedit': !readonly}">
    <m-header class="marginbom20" :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
    <tinymce class="margintop20" :id="contentId" :height=400 ref="ceditor" v-model="inviteContent" @input="getcon"></tinymce>
    <h3 class="margintop20 marginbom20">{{$t('moban.traffic')}}</h3>
    <template v-if="baiduMapShow">
      <map-component :isshow="mapIsShow" class="marginbom20" :address="address" :sendpot="pot" :mapid="mapid" style="width:80%;" @getpoint="getAddress"></map-component>
    </template>
    <template v-else-if="googleMapShow">
      <google-map :isshow="mapIsShow" class="marginbom20" :address="address" :latitude="pot.latitude" :longitude="pot.longitude" :sendpot="pot" :mapid="mapid" style="width:80%;" @getpoint="getGoogleAddress"></google-map>
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
    mtype: {
      type: Number,
      default: 0
    },
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
  components: { mHeader,Tinymce,MapComponent},//,googleMap },
  data () {
    return {
      contentId: 'vue-tinymce-content-' + this.mapid,
      trafficId: 'vue-tinymce-traffic-' + this.mapid,
      companyProfileId: 'vue-tinymce-profile-' + this.mapid,
      profileToolbar: [''],
      traffic: '',
      companyProfile: '',
      inviteContent: '',//this.$t('moban.interview.defaultMoban'),
      pot: {
        latitude: '',
        longitude: ''
      },
      address: '',
      defaultmoban: {},
      vtype: '',
      mapShow: false,
      getResult: {},
      isChangeXSS: process.env.isChangeXSS || false,
      empWorkNoCheck: process.env.empWorkNoCheck,
      mapValue: process.env.mapValue || 0,
      baiduMapShow: false,
      googleMapShow: false,
      mapIsShow: this.isshow
    }
  },
  computed: {},
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
    this.vtype = this.mtype === 0 ? '面试' : '商务'
    if (this.isInit) {
      //this.init()
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
      this.getTempByType(this.vtype)
      this.GetUserInfo()
    },
    setDefaultMoban () {
      let vhtml = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
      let vhtml2 = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
      if (this.mtype === 0) {
        this.inviteContent = replaceRemoveQuotation(vhtml)
      } else {
        this.inviteContent = replaceRemoveQuotation(vhtml2)
      }
      
    },
    getcon (val) {
      if (this.mtype === 0) {
        this.$emit('getcon',val)
      } else {
        this.$emit('getbcon',val)
      }
    },
    gettraffic (val) {
      if (this.mtype === 0) {
        this.$emit('gettraffic',val)
      } else {
        this.$emit('getbtraffic',val)
      }
    },
    getcompro (val) {
      if (this.mtype === 0) {
        this.$emit('getcompro',val)
      } else {
        this.$emit('getbcompro',val)
      }
    },
    GetUserInfo () {
      if(parseInt(getCache('subaccountId')) !== 0) {
        this.getSubAccountById()
      }
    },
    getSubAccountById () {
      let nform = {
        id: getCache('subaccountId')
      }
      this.$store.dispatch('getSubAccountById',nform)
    },
    getDefaultMoBan () {
      let newForm = {
        empid: getCache('empid')
      }
      this.$store.dispatch('getEmptempByPost',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          //this.defaultmoban = result
        }
      })
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
    getUsertemplate (type) {
      let newForm = {
        userid: getCache('userid'),
        templateType: type
      }
      this.$store.dispatch('getUsertemplate',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          /*this.getResult = result
          this.defaultmoban = result*/
          if (result != null && result != 'null') {
            this.showDefault(type,result)
          } else {
            //showAlert('公司' + type + '模板未设置,请先设置模板', -1);
            this.showDefault(type,result)
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
          /*this.getResult = result
          this.defaultmoban = result*/
          if (result != null && result != 'null') {
            this.showDefault(type,result)
          } else {
            //showAlert('子公司' + type + '模板未设置,请先设置模板', -1);
            this.getUsertemplate(type)
          }
        }
      })
    },
    getEmptemplateByType (type) {
      let newForm = {
        empid: getCache('empid'),
        visitType: type
      }
      this.$store.dispatch('getEmptemplateByType',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          //this.getResult = result
          //this.defaultmoban = result
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
    async htmlUnescape (val,type) {
      await this.$store.dispatch('htmlUnescape',
        {'inviteContent': val}).then(res => {
          this[type] = replaceRemoveReserveQuotation(res)
          //this.inviteContent = replaceRemoveReserveQuotation(res)
      })
    },
    showDefault (type,result) {
        //let result = this.getResult
        if (!result) {
          this.getDefaultMoBan(type)
          //result = this.defaultmoban
        } else {
          this.showDefaultDom(result)
        }
        
    },
    showDefaultDom (result) {
      //let result = this.getResult
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
                this.$emit('initmoban',sendObj)
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
          this.$emit('initmoban',result)
        }
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
    },
    getGoogleAddress (point,address) {
      this.pot.latitude = point.latitude
      this.pot.longitude = point.longitude
      this.address = address
    },
    getAddress (point,address) {
      this.pot.latitude = point.latitude
      this.pot.longitude = point.longitude
      this.address = address
    }
  }
}
</script>