<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.sms.title')" :n-desc="$t('notice.sms.desc')" :switch-flag="true"></one-notice>		
	</div>
</template>
<script>
import oneNotice from '@/components/notice/oneNotice'
export default {
  props: ['switchoff'],
  components: { oneNotice },
  data () {
  	return {
  	  switchOn: this.switchoff,
      imgSrc: require('@/assets/img/messv1.png')
  	}
  }
}
</script>