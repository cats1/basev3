<template>
  <div>
    <m-header :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
    <tinymce class="margintop20" :height=400 ref="ceditor" v-model="defaultmoban.inviteContent" @input="getcon"></tinymce>
    <h3 class="margintop20 marginbom20">{{$t('moban.address')}}</h3>
    <!-- <baidu-map class="marginbom20" :isshow="isshow" :address="defaultmoban.address" :sendpot="pot" :mapid="mapid" style="width:80%;"></baidu-map> -->
    <map-component class="marginbom20" :isshow="isshow" :address="defaultmoban.address" :sendpot="pot" :mapid="mapid" style="width:80%;" @getpoint="getAddress"></map-component>
    <h3 class="margintop20 marginbom20">{{$t('moban.traffic')}}</h3>
    <tinymce :height=100 :toolbarShow="false" :menubarShow="false" ref="teditor" v-model="defaultmoban.traffic" @input="getTraffic"></tinymce>
    <h3 class="margintop20 marginbom20">{{$t('moban.compro')}}</h3>
    <tinymce :height=100 :toolbarShow="false" :menubarShow="false" ref="comeditor" v-model="defaultmoban.companyProfile" @input="getCom"></tinymce>
    <div class="margintop20">
      <el-button type="primary" @click="saveMoban">{{$t('btn.saveMobanBtn')}}</el-button>
      <el-button type="success" @click="sendMoban">{{$t('btn.overview')}}</el-button>
    </div>
  </div>
</template>
<script>
import mHeader from './components/mHeader'
import {MapComponent} from '@/components/map'
import { getCache } from '@/utils/auth'
import Tinymce from '@/components/tinymce/tiny'
import { valueToString, replaceQuotation,replaceRemoveQuotation,replaceRemoveReserveQuotation } from '@/utils/common'
export default {
  props: ['mtype','isshow','mapid'],
  components: { mHeader, MapComponent, Tinymce },
  data () {
  	return {
  	  traffic: '',
  	  companyProfile: '',
  	  inviteContent: this.$t('moban.interview.defaultMoban'),
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
      form: {},
      isChangeXSS: process.env.isChangeXSS || false
  	}
  },
  computed: {},
  watch: {
  	traffic (val, oldval) {}
  },
  mounted () {
    this.init()
  },
  methods: {
    getcon () {},
    getTraffic () {},
    getCom () {},
  	init () {
  		this.getInterViewMoBan()
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
    htmlUnescape (val,type) {
      this.$store.dispatch('htmlUnescape',
        {'inviteContent': val}).then(res => {
          this.defaultmoban[type] = replaceRemoveReserveQuotation(res)
          //this.inviteContent = replaceRemoveReserveQuotation(res)
      })
    },
  	getInterViewMoBan () {
  		let newForm = {
  			userid: getCache('userid'),
  			templateType: this.mtype
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
          } else {
            this.setDefaultMoban() 
          }
          
  			}
  		})
  	},
    saveMoban () {
      this.$emit('savekit',this.form)
      this.$store.dispatch('addUserTemplate',this.defaultmoban)
    },
    sendMoban () {
      this.defaultmoban.empid = this.defaultmoban.empid      
      this.$emit('sendkit',this.form)
    },
    getAddress (point,address) {
      this.defaultmoban.latitude = point.latitude
      this.defaultmoban.longitude = point.longitude
      this.defaultmoban.address = address
    }
  }
}
</script>