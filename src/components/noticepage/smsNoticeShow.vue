<template>
	<div class="marginbom20">
    <notice-show >
      <div slot="header" class="clearfix">
        <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.sms.title')" :n-desc="$t('notice.sms.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
        <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
          {{$t('youUsed')}}{{smsUseCount}}{{$t('item')}}{{$t('notice.sms.title')}},{{$t('youCanUse')}}{{smsLeftCount}}{{$t('item')}}
        </div>
      </div>
    </notice-show>		
	</div>
</template>
<script>
import {oneNotice,noticeShow} from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { oneNotice,noticeShow },
  data () {
  	return {
      imgSrc: require('@/assets/img/messv1.png'),
      isShow: false,
      switchOn: numberToBoolean(getCache('smsNotify'))
  	}
  },
  computed: {
    smsCount: {
      get () {
        return parseInt(getCache('smsCount')) || 0
      },
      set () {}
    },
    appSmsCount: {
      get () {
        return parseInt(getCache('appSmsCount')) || 0
      },
      set () {}
    },
    wxSmsCount: {
      get () {
        return parseInt(getCache('wxSmsCount')) || 0
      },
      set () {}
    },
    smsTotal: {
      get () {
        return parseInt(getCache('smsTotal')) || 0
      },
      set () {}
    },
    smsUseCount: {
      get () {
        return this.smsCount + this.appSmsCount + this.wxSmsCount
      },
      set () {}
    },
    smsLeftCount: {
      get () {
        return this.smsTotal - this.smsUseCount
      },
      set () {}
    }
  },
  watch: {
    switchOn (val,old) {
      this.isShow = val
    }
  },
  created () {
    if (this.switchOn) {
      this.isShow = true
    }
  },
  methods: {
    updateWeixin () {
      let newForm = {
        userid: getCache('userid'),
        smsNotify: booleanToNumber(this.switchOn)
      }
      this.$store.dispatch('updateSMSConf', newForm)
    },
    getSwitchValue (value) {
      this.isShow = value
      this.switchOn = value
      this.updateWeixin()
    }
  }
}
</script>