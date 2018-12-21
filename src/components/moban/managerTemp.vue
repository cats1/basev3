<template>
	<div>
		<m-header :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
		<tinymce class="margintop20" :id="contentId" :height=400 ref="ceditor" v-model="defaultmoban.inviteContent" ></tinymce>
		<h3 class="margintop20 marginbom20">{{$t('moban.address')}}</h3>
		<template v-if="baiduMapShow">
	      <map-component class="marginbom20" :isshow="mapIsShow" :address="defaultmoban.address" :sendpot="pot" :mapid="showMapId" style="width:80%;" @getpoint="getAddress"></map-component>
	  </template>
		<h3 class="margintop20 marginbom20">{{$t('moban.traffic')}}</h3>
		<tinymce class="margintop20" :id="trafficId" :height=100 :toolbarShow="false" :menubarShow="false" ref="teditor" v-model="defaultmoban.traffic" ></tinymce>
		<h3 class="margintop20 marginbom20">{{$t('moban.compro')}}</h3>
		<tinymce class="margintop20" :id="comproId" :height=100 :toolbarShow="false" :menubarShow="false" ref="comeditor" v-model="defaultmoban.companyProfile" ></tinymce>
		<div class="margintop20">
	      <el-button type="primary" @click="saveMoban">{{$t('btn.saveMobanBtn')}}</el-button>
	      <!-- <el-button type="success" @click="sendMoban">{{$t('btn.overview')}}</el-button> -->
	    </div>
	</div>
</template>
<script>
import mHeader from './components/mHeader'
import Tinymce from '@/components/tinymce/tiny'
import {MapComponent} from '@/components/map'
import { getCache } from '@/utils/auth'
import { valueToString, replaceQuotation,replaceRemoveQuotation,replaceRemoveReserveQuotation,checkIsNull } from '@/utils/common'
export default {
  props: ['mtype','isshow','mapid','newadd','isDone','isInit'],
  components: { mHeader,Tinymce,MapComponent },
  data () {
  	return {
  	  contentId: 'vue-tinymce-content-' + this.mapid,
  	  trafficId: 'vue-tinymce-traffic-' + this.mapid,
  	  comproId: 'vue-tinymce-compro-' + this.mapid,
  	  mapIsShow: false,
      showMapId: this.mapid,
  	  inviteContent: '',
  	  defaultmoban: {
        address: '',
        companyProfile: '',
        inviteContent: '',
        latitude: '',
        longitude: '',
        traffic: '',
        userid: getCache('userid'),
        templateType: this.mtype
      },
      pot: {
        latitude: '',
        longitude: ''
      },
      mapValue: process.env.mapValue || 0,
      baiduMapShow: false,
      googleMapShow: false,
      isChangeXSS: process.env.isChangeXSS || false,
      customTemplateShow: process.env.customTemplateShow || false
  	}
  },
  watch: {
  	traffic (val, oldval) {},
    isshow (val) {
      this.mapIsShow = (val&&this.isDone)||(val&&this.isInit)
      if ((val&&this.isDone)||(val&&this.isInit)) {
        this.init()
      }
    },
    mapid (val) {
      this.showMapId = val
    },
    newadd (val) {
      console.log(val)
    },
    mtype (val) {
      console.log(val)
    }
  },
  created () {
  	if (this.mapValue == 0) {
      this.baiduMapShow = true
      this.googleMapShow = false
    } else if (this.mapValue == 1) {
      this.baiduMapShow = false
      this.googleMapShow = true
    }
  },
  mounted () {
  	this.$nextTick(function () {
      this.mapIsShow = (this.isshow&&this.isDone)||(this.isshow&&this.isInit)
      if ((this.isshow&&this.isDone)||(this.isshow&&this.isInit)) {
        this.init()
      }
    })
  },
  methods: {
  	init () {
  		this.getInterViewMoBan(this.mtype)
  	},
  	getInterViewMoBan (mtype) {
  		let newForm = {
  			userid: getCache('userid'),
  			templateType: mtype
  		}
  		this.$store.dispatch('getUsertemplate',newForm).then(res => {
  			let { status, result } = res
  			if (status === 0) {
          if (result) {
            //this.defaultmoban = result
            this.pot.latitude = result.latitude
            this.pot.longitude = result.longitude
            if (!result.inviteContent) {
              this.setDefaultMoban() 
            }
            if (this.isChangeXSS) {
              this.htmlUnescape(replaceRemoveQuotation(result.inviteContent),'inviteContent')
              this.htmlUnescape(replaceRemoveQuotation(result.traffic),'traffic')
              this.htmlUnescape(replaceRemoveQuotation(result.companyProfile),'companyProfile')
            } else {
              this.defaultmoban.inviteContent = replaceRemoveQuotation(result.inviteContent)
              this.defaultmoban.traffic = replaceRemoveQuotation(result.traffic)
              this.defaultmoban.companyProfile = replaceRemoveQuotation(result.companyProfile)
            }
            this.defaultmoban.address = result.address
            this.defaultmoban.latitude = result.latitude
            this.defaultmoban.longitude = result.longitude
          } else {
            if (this.customTemplateShow && mtype != '面试' && mtype != '商务') {
              this.getInterViewMoBan('商务')
            } else {
              this.setDefaultMoban()
            }
          }
  			}
  		})
  	},
  	htmlUnescape (val,type) {
      this.$store.dispatch('htmlUnescape',
        {'inviteContent': val}).then(res => {
          this.defaultmoban[type] = replaceRemoveReserveQuotation(res)
          //this.inviteContent = replaceRemoveReserveQuotation(res)
      })
    },
    setDefaultMoban () {
      let vhtml = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
      let vhtml2 = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
      if (this.mtype === '面试') {
        this.defaultmoban.inviteContent = replaceRemoveQuotation(vhtml)
      } else {
        this.defaultmoban.inviteContent = replaceRemoveQuotation(vhtml2)
      } 
    },
    saveMoban () {
      this.$emit('savekit',this.form)
      if (checkIsNull(this.defaultmoban.inviteContent) == '') {
        this.$message({
          showClose: true,
          message: '请填写模板内容',
          type: 'warning'
        })
      } else if (checkIsNull(this.defaultmoban.address) == '') {
        this.$message({
          showClose: true,
          message: '请填写地址信息',
          type: 'warning'
        })
      } else if (checkIsNull(this.defaultmoban.longitude) == '' || checkIsNull(this.defaultmoban.latitude) == '') {
        this.$message({
          showClose: true,
          message: '请填写地址信息',
          type: 'warning'
        })
      } else if (checkIsNull(this.defaultmoban.traffic) == '') {
        this.$message({
          showClose: true,
          message: '请填写停车信息',
          type: 'warning'
        })
      } else if (checkIsNull(this.defaultmoban.companyProfile) == '') {
        this.$message({
          showClose: true,
          message: '请填写公司简介',
          type: 'warning'
        })
      } else {
        this.defaultmoban.templateType = this.mtype
        this.$store.dispatch('addUserTemplate',this.defaultmoban)
      }
    },
    sendMoban () {
      this.defaultmoban.empid = this.defaultmoban.empid      
      this.$emit('sendkit',this.form)
    },
    getGoogleAddress (point,address) {
      this.defaultmoban.latitude = point.latitude
      this.defaultmoban.longitude = point.longitude
      this.defaultmoban.address = address
    },
    getAddress (point,address) {
      this.defaultmoban.latitude = point.latitude
      this.defaultmoban.longitude = point.longitude
      this.defaultmoban.address = address
    }
  }
}
</script>