<template>
  <div class="marginbom20">
    <notice-show >
      <div slot="header" class="clearfix">
        <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.team.title')" :n-desc="$t('notice.team.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue" ></one-notice>
        <div class="showbody marginlr20 paddingtb20 paddingl80" v-show="isShow">
          hahahha
        </div>
      </div>
    </notice-show>
  </div>
</template>
<script>
import { oneNotice,noticeShow } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { oneNotice,noticeShow },
  data () {
    return {
      imgSrc: require('@/assets/img/team.png'),
      isShow: false,
      switchOn: numberToBoolean(getCache('comeAgain')),
      form: {
        secureProtocol: getCache('secureProtocol'),
        userid: getCache('userid')
      }
    }
  },
  created () {
    if (numberToBoolean(getCache('comeAgain'))) {
      this.isShow = true
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      this.showDown()
    },
    saveSetting () {
      this.$store.dispatch('updateSecureProtocol',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.quillcons{
  overflow: hidden;
  min-height: 385px;
} 
</style>