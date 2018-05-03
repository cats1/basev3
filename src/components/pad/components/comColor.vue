<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.themecolor.title')" :n-desc="$t('notice.themecolor.desc')" ></one-notice>
          <div class="showbody marginlr20 paddingtb20 paddingl80" >
            <color :color="getColor" @getcolor="setColor"></color>
          </div>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import color from '@/components/color/color'
export default {
  components: { noticeShow, oneNotice, color },
  data () {
  	return {
      imgSrc: require('@/assets/img/color.png'),
      isShow: false,
      getColor: getCache('themecolor')
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    setColor (color) {
      let nForm = {
        userid: getCache('userid'),
        themecolor: color
      }
      this.$store.dispatch('UpdateThemeColor',nForm).then(res => {
        let {status} = res
        if (status === 0) {
          this.getColor = color
        }
      })
    }
  }
}
</script>