<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.coms.title')" :n-desc="$t('notice.coms.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <com-group></com-group>
          </div>
        </div>        
    </notice-show>
      		
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import comGroup from './comGroup'
export default {
  components: { noticeShow,oneNotice,comGroup },
  data () {
  	return {
  	  switchOn: numberToBoolean(getCache('subAccount')),
      imgSrc: require('@/assets/img/webchatv1.png')
  	}
  },
  computed: {
    isShow: {
      get(){
        return this.switchOn
      },
      set(){}
    }
  },
  methods: {
    updateSetting (value) {
      let newForm = {
        userid: getCache('userid'),
        subAccount: booleanToNumber(value)
      }
      this.$store.dispatch('updateSASwitch', newForm).then(res => {
        let {status,result} = res
        if (status === 0) {
          if (this.switchOn) {
            this.isShow = true
          } else {
            this.isShow = false
          }
          
        }
      })
    },
    getSwitchValue (value) {
      this.switchOn = value
      this.updateSetting(value)
    }
  },
  created () {},
  mounted () {}
}
</script>