<template>
	<div class="meetingmoban">
    <h3 class="marginbom20">{{$t('moban.tip3')}}</h3>
    <div class="editor-container">
      <!-- <tinymce-test :height=400 ref="editor" v-model="defaultmoban.inviteContent"></tinymce-test> -->
		  <tinymce :height=400 ref="editor" v-model="defaultmoban.inviteContent" @input="getcon"></tinymce>
    </div>
    <h3 class="margintop20 marginbom20">{{$t('moban.tip3')}}</h3>
    <baidu-map :isshow="isshow" class="marginbom20" :address="defaultmoban.address" :sendpot="pot" mapid="mapmeeting" style="width:80%;"></baidu-map>
    <div class="margintop20">
      <el-button type="primary" @click="saveMoban">{{$t('btn.saveMobanBtn')}}</el-button>
      <el-button type="success" @click="sendMoban">{{$t('btn.sendInvite')}}</el-button>
    </div>
	</div>
</template>
<script>
import Tinymce from '@/components/tinymce'
import tinymceTest from '@/components/tinymce/test'
import {BaiduMap} from '@/components/map'
import { getCache } from '@/utils/auth'
import { valueToString, replaceQuotation,replaceRemoveQuotation } from '@/utils/common'
export default {
  props: ['mtype','isshow','mid','mdata'],
  components: { Tinymce,BaiduMap,tinymceTest },
  data () {
  	return {
      pot: {
        latitude: '',
        longitude: ''
      },
      defaultmoban: {
        address: '',
        companyProfile: '',
        inviteContent: '',
        latitude: '',
        longitude: ''
      },
      marray: [],
      mform: {
        address: getCache('saddress'),
        companyProfile: '',
        inviteContent: '',
        latitude: getCache('latitude'),
        longitude: getCache('longitude'),
        mdate: '',
        mid: this.mid,
        remark: '',
        sponsor: '',
        subject: '',
        traffic: ''
      }
  	}
  },
  computed: {},
  watch: {
    mobj (val) {},
    mdata (val) {
      this.marray = val
    }
  },
  created () {
    this.init()
  },
  methods: {
  	init () {
  		this.getMeetingById()
  	},
    setDefaultMoban () {
      let vhtml = '<p>尊敬的客户，您好！</p>\
              <p>南京移动将于2016年5月13日（周五）下午13:45在紫东创意园会议中心1号会议室举办南京（栖霞）企业信息化推介会，与栖霞区重点园区、企业分享企业信息化建设成功案例，现场最低可享60%业务优惠，更有礼品、万元业务抵金券赠送，诚邀您的光临！\
              </p>\
              <br />\
              <p class="ql-align-bg"><p style="text-align:center;background:url(https://www.coolvisit.com/assets/img/v1/bg/bg1.png) center center no-repeat;color:#40b4c4;font-size:1.2em;">\
                <strong>签到步骤</strong>\
              </p></p>\
              <br />\
              <span style="font-family:SimSun;line-height:1;"> \
              <ul>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;">Step1：到达会场后出示二维码</span> \
                </li>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;">Step2：工作人员扫码显示座位</span> \
                </li>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;">Step3：根据工作人员引导入座</span> \
                </li>\
              </ul>\
              </span>\
              <p>\
                <span style="font-size:12px;font-family:SimSun;">&nbsp;&nbsp;&nbsp;&nbsp;</span><strong><span style="font-size:18px;font-family:SimSun;"></span></strong>\
              </p>\
              <p style="text-align:center;background:url(https://www.coolvisit.com/assets/img/v1/bg/bg1.png) center center no-repeat;color:#40b4c4;font-size:1.2em;">\
                <strong>会议流程</strong>\
              </p>\
              <br />\
              <p>\
                推介会现场分享园区、企业信息化提升的成功案例，针对不同园区、企业提供基于“云、管、端”的全方位针对性信息化解决方案，南京移动本着让利园区和企业，助力政府推动企业信息化水平的原则，推出空前优惠活动，与会园区、企业最高可享受60%的业务优惠，赠送万元信息化业务抵金券，具体会议流程如下：\
              </p>\
              <ul>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;font-family:SimSun;">会议签到（13:40—14:00）</span> \
                </li>\
                <li>\
                  <span></span><span style="line-height:1.5;font-size:12px;font-family:SimSun;">领导致辞（14:00—14:15）</span> \
                </li>\
                <li>\
                  <span></span><span style="line-height:1.5;font-size:12px;font-family:SimSun;">企业信息化产品介绍（14:15—15：00）</span><span></span> \
                </li>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;font-family:SimSun;">企业成功经验分享（15:00—15:40）</span><span></span> \
                </li>\
                <li>\
                  <span style="line-height:1.5;font-size:12px;font-family:SimSun;">签约区答疑签约（15:40—16:00）</span> \
                </li>\
              </ul>\
              <p>\
                <span style="line-height:1;font-size:12px;font-family:SimSun;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:18px;line-height:1;font-family:SimSun;"><strong></strong></span>\
              </p>\
              <p style="text-align:center;background:url(https://www.coolvisit.com/assets/img/v1/bg/bg1.png) center center no-repeat;color:#40b4c4;font-size:1.2em;">\
                <strong>公司简介</strong>\
              </p>\
              <br />\
              <p>\
                <span style="font-size:12px;font-family:SimSun;">示例1</span> \
              </p>\
              <p>\
                <span style="line-height:1;font-size:12px;font-family:SimSun;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:18px;line-height:1;font-family:SimSun;"><strong></strong></span>\
              </p>\
              <p style="text-align:center;background:url(https://www.coolvisit.com/assets/img/v1/bg/bg1.png) center center no-repeat;color:#40b4c4;font-size:1.2em;">\
                <strong class="test">交通信息</strong>\
              </p>\
              <br />\
              <p>\
                <span style="font-size:12px;font-family:SimSun;">示例1</span> \
              </p>'
      this.defaultmoban.inviteContent = replaceRemoveQuotation(vhtml)
    },
    getMeetingById () {
      let newForm = {
        mid: this.mid
      }
      this.$store.dispatch('getMeetingById',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          this.defaultmoban = result
          this.defaultmoban.address = result.address
          this.mform.mdate = result.mdate
          this.mform.remark = result.remark
          this.mform.sponsor = result.sponsor
          this.mform.subject = result.subject
          this.defaultmoban.inviteContent = replaceRemoveQuotation(result.inviteContent)
          if (result.inviteContent === '') {
            this.setDefaultMoban()
          }
          this.pot.latitude = result.latitude
          this.pot.longitude = result.longitude
        }
      })
    },
    saveMoban () {
      this.mform.address = getCache('saddress')
      this.mform.latitude = getCache('latitude')
      this.mform.longitude = getCache('longitude')
      this.$emit('savekit',this.mform)
    },
    sendMoban () {
      this.mform.address = getCache('saddress')
      this.mform.latitude = getCache('latitude')
      this.mform.longitude = getCache('longitude')
      this.mform.empid = this.defaultmoban.empid
      
      this.$emit('sendkit',this.mform)
    },
    getcon (val) {
      this.mform.inviteContent = replaceQuotation(val)
    }
  }
}
</script>
<style lang="scss" scoped>
  .meetingmoban{
    .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
    }
  }
</style>