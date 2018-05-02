<template>
	<div>
		<m-header class="marginbom20" :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
		<mo-quill class="marginbom20" style="width:80%;" :content="inviteContent" @getcon="getcon"></mo-quill>
    <baidu-map :isshow="isshow" class="marginbom20" :address="address" :sendpot="pot" mapid="mapface" style="width:80%;"></baidu-map>
		<traffic class="marginbom20" style="width:80%;" :content="traffic" @gettraffic="gettraffic"></traffic>
		<compro class="marginbom20" style="width:80%;" :content="companyProfile" @getcompro="getcompro"></compro>
	</div>
</template>
<script>
import mHeader from './components/mHeader'
import moQuill from './components/moQuill'
import {BaiduMap} from '@/components/map'
import traffic from './components/traffic'
import compro from './components/compro'
import { getCache } from '@/utils/auth'
import { valueToString, replaceRemoveQuotation } from '@/utils/common'
export default {
  props: ['mtype','isshow'],
  components: { mHeader,moQuill,BaiduMap,traffic,compro },
  data () {
  	return {
  	  traffic: '',
  	  companyProfile: '',
  	  inviteContent: this.$t('moban.interview.defaultMoban'),
      pot: {
        latitude: '',
        longitude: ''
      },
      address: '',
      defaultmoban: {}
  	}
  },
  computed: {},
  watch: {
  	traffic (val, oldval) {}
  },
  created () {
    this.init()
  },
  methods: {
  	init () {
  		this.getTempByType(this.mtype)
      this.GetUserInfo()
  	},
    getcon (val) {
      if (this.mtype === '面试') {
        this.$emit('getcon',val)
      } else {
        this.$emit('getbcon',val)
      }
    },
    gettraffic (val) {
      if (this.mtype === '面试') {
        this.$emit('gettraffic',val)
      } else {
        this.$emit('getbtraffic',val)
      }
    },
    getcompro (val) {
      if (this.mtype === '面试') {
        this.$emit('getcompro',val)
      } else {
        this.$emit('getbcompro',val)
      }
    },
    GetUserInfo () {
      this.$store.dispatch('GetUserInfo').then(res => {
        if(parseInt(getCache('subaccountId')) !== 0) {
          this.getSubAccountById()
        }
      })
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
  				this.defaultmoban = result
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
          if (result != null && result != 'null') {
            this.showDefault(result,type)
          } else {
            //showAlert('公司' + type + '模板未设置,请先设置模板', -1);
            this.showDefault(result, type)
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
            this.showDefault(result,type)
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
          if(result) {
            this.showDefault(result,type)
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
    showDefault (result,type) {
      if (!result) {
        result = this.defaultmoban
      }
      this.inviteContent = replaceRemoveQuotation(result.inviteContent)
      this.traffic = replaceRemoveQuotation(result.traffic)
      this.companyProfile = replaceRemoveQuotation(result.companyProfile)
      this.pot.latitude = result.latitude
      this.pot.longitude = result.longitude
      this.address = result.address
      this.$emit('initmoban',result)
    }
  }
}
</script>