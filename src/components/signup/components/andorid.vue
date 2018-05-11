<template>
	<div class="codedownwrap">
		<div class="circlewrap">
			<el-button type="white">{{$t('qrcodeDown')}}</el-button>
			<el-button type="whiteline">{{$t('localDown')}}</el-button>
		</div>
		<div class="dcodewrap">
			<qr-code mid="ipad" class-name="downcode" :link="link" :width="100" :height="100" :ctype="3" :is-show="true"></qr-code>
		</div>
	</div>
</template>
<script>
import qrCode from '@/components/qrCode/qrCode'
import stepOne from './stepOne'
export default {
  components: { stepOne,qrCode },
  data () {
  	return {
      imgSrc: require('@/assets/img/guide-logo.png'),
      link: 'http://www.qicool.cn/qcappup/laifangtong/latest'
  	}
  },
  methods: {
  	goNext () {
  	  window.location.href = 'index.html'
  	}
  },
  created () {
  	if (this.$route.params.id === 'set') {
      this.threeset = true
  	}
  }
}	
</script>