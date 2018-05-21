<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('approve.title')" :n-desc="$t('approve.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { noticeShow, oneNotice },
  data () {
  	return {
      imgSrc: require('@/assets/img/approve.png'),
      isShow: false
  	}
  },
  methods: {
    showDown (val) {
      this.$router.push({'path':'approve'})
    }
  }
}
</script>