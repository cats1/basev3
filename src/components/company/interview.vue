<template>
  <div>
    <m-header :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
    <tinymce class="margintop20" :id="contentId" :height=400 ref="ceditor" v-model="defaultmoban.inviteContent" @input="getcon"></tinymce>
    <h3 class="margintop20 marginbom20">{{$t('moban.address')}}</h3>
    <map-component class="marginbom20" :isshow="isshow" :address="defaultmoban.address" :sendpot="pot" :mapid="mapid" style="width:80%;" @getpoint="getAddress"></map-component>
    <h3 class="margintop20 marginbom20">{{$t('moban.traffic')}}</h3>
    <tinymce :height=100 :toolbar-show="false" :menubar-show="false" :img-show="false" :id="trafficId" ref="teditor" v-model="defaultmoban.traffic" @input="getTraffic"></tinymce>
    <h3 class="margintop20 marginbom20">{{$t('moban.compro')}}</h3>
    <tinymce :height=100 :toolbar-show="false" :menubar-show="false" :img-show="false" :id="companyProfileId" ref="comeditor" v-model="defaultmoban.companyProfile" @input="getCom"></tinymce>
    <div class="margintop20">
      <el-button type="primary" @click="saveMoban">{{$t('btn.saveMobanBtn')}}</el-button>
    </div>
  </div>
</template>
<script>
import mHeader from '@/components/moban/components/mHeader'
import {MapComponent} from '@/components/map'
import { getCache } from '@/utils/auth'
import Tinymce from '@/components/tinymce/tiny'
import { valueToString, replaceQuotation,replaceRemoveQuotation } from '@/utils/common'
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
  	}
  },
  components: { mHeader, MapComponent, Tinymce },
  data () {
  	return {
  	  contentId: 'vue-tinymce-content-' + this.mapid,
  	  trafficId: 'vue-tinymce-traffic-' + this.mapid,
  	  companyProfileId: 'vue-tinymce-profile-' + this.mapid,
  	  profileToolbar: [''],
      defaultmoban: {
        address: '',
        companyProfile: '',
        inviteContent: '',
        latitude: '',
        longitude: '',
        traffic: ''
      },
      pot: {
        latitude: '',
        longitude: ''
      },
      vtype: ''
  	}
  },
  watch: {
  	isInit (val) {
  	  if (val) {
	  	this.init()
	  }
  	}
  },
  mounted () {
  	this.vtype = this.mtype === 0 ? '面试' : '商务'
  	if (this.isInit) {
  	  this.init()
  	}
  },
  methods: {
    getcon (val) {
      this.defaultmoban.inviteContent = replaceQuotation(val)
    },
    getTraffic (val) {
      this.defaultmoban.traffic = replaceQuotation(val)
    },
    getCom (val) {
      this.defaultmoban.companyProfile = replaceQuotation(val)
    },
  	init () {
  	  this.getInterViewMoBan(this.vtype)
  	},
    setDefaultMoban () {
      let vhtml = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">这里是{company}，感谢您对我公司的信任和选择。通过对您简历的认真审核，我们认为您已具备进入下一轮筛选的资格。为了进一步了解，现邀请您参加面试，具体安排如下：</p><br/>'
      let vhtml2 = '<p>尊敬的{visitor}：</p><p style="text-indent:24px">您好！</p><p style="text-indent:24px">我是{company}的{empid}，很高兴代表我司与您联系。为更好的沟通交流工作事宜，诚挚希望与您进行会面，期待您的来访！</p><br/>'
      if (this.mtype === '面試') {
        this.defaultmoban.inviteContent = replaceRemoveQuotation(vhtml)
      } else {
        this.defaultmoban.inviteContent = replaceRemoveQuotation(vhtml2)
      }
      
    },
  	getInterViewMoBan (type) {
  		let newForm = {
  			userid: getCache('userid'),
  			subaccountId: getCache('subaccountId'),
  			templateType: type
  		}
  		this.$store.dispatch('getSubAccountTemp',newForm).then(res => {
  			let { status, result } = res
  			if (status === 0) {
	          if (result) {
	            this.defaultmoban = result
	            this.pot.latitude = result.latitude
	            this.pot.longitude = result.longitude
	            this.defaultmoban.inviteContent = replaceRemoveQuotation(result.inviteContent)
	            if (!result.inviteContent) {
	              this.setDefaultMoban() 
	            }
	          } else {
	            this.setDefaultMoban() 
	          }
  			}
  		})
  	},
    saveMoban () {
      let nform = {
        address: this.defaultmoban.address,
        companyProfile: this.defaultmoban.companyProfile,
        inviteContent: this.defaultmoban.inviteContent,
        latitude: this.pot.latitude,
        longitude: this.pot.longitude,
        subaccountId: getCache('subaccountId'),
        templateType: this.mtype === 0 ? '面试' : '商务',
        traffic: this.defaultmoban.traffic,
        userid: getCache('userid')
      }
      this.$store.dispatch('addSubAccountTemp',nform)
    },
    getAddress (point,address) {
      this.pot.latitude = point.latitude
      this.pot.longitude = point.longitude
      this.defaultmoban.address = address
    }
  }
}
</script>