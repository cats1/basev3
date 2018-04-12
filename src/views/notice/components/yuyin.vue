<template>
	<div class="marginbom20">
      <one-notice :n-icon="imgSrc" :n-title="$t('notice.yuyin.title')" :n-desc="$t('notice.yuyin.desc')" :switch-flag="true"></one-notice>		
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
      imgSrc: require('@/assets/img/telephone.png')
  	}
  }
}
</script>