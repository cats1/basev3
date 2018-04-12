<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.dd.title')" :n-desc="$t('notice.dd.desc')" :switch-flag="true"></one-notice>
      <p class="tiplink">{{$t('notice.dd.tip')}}</p>	
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
      imgSrc: require('@/assets/img/ddv1.png')
  	}
  }
}
</script>