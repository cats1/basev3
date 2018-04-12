<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.rtx.title')" :n-desc="$t('notice.rtx.desc')" :switch-flag="true"></one-notice>
      <p class="tiplink">{{$t('notice.rtx.tip')}}</p>	
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
      imgSrc: require('@/assets/img/rtxv1.png')
  	}
  }
}
</script>