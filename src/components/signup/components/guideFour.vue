<template>
	<div class="guidewrap">
		<h1 class="guidelogo"><img :src="imgSrc" alt=""></h1>
		<div class="guidecell">			
			<div class="guidetop">
				<div class="guidesteps">
					<step-one :num="4" :total="5"></step-one>
				</div>
				<p class="guide-top-title">{{$t('guide.guide4.title')}}</p>
				<p class="guide-top-desc">{{$t('guide.guide4.desc')}}</p>
			</div>
			<div class="guidebody">
				<rtx class="bgwhite" :link-is-show="false"></rtx>
				<email class="bgwhite"></email>
				<weixin class="bgwhite"></weixin>
				<dd-notice class="bgwhite" :link-is-show="false"></dd-notice>
				<sms-notice class="bgwhite"></sms-notice>
			</div>
			<div class="guidebom">
				<p class="desc">{{$t('guide.guide4.next')}}</p>
				<el-button type="primary" @click="goNext">{{$t('guide.guide4.btn')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import stepOne from './stepOne'
import {email,weixin,smsNotice,ddNotice,rtx} from '@/components/noticepage'
export default {
  components: { stepOne,email,weixin,smsNotice,ddNotice,rtx },
  data () {
  	return {
  	  threeset: false,
      imgSrc: require('@/assets/img/guide-logo.png')
  	}
  },
  methods: {
  	goNext () {
  	  this.$router.push({path:'done'})
  	}
  },
  created () {}
}	
</script>
<style lang="scss" scoped>
.guidebodymask{
	height: 613px;
	position:relative;
	background: url('../../../assets/img/pad-g.png') center center no-repeat;
	.mask{
		width: 100%;
	    height: 160px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    text-align:center;
		background: url('../../../assets/img/mask-g.png') center center repeat-x;
		.el-button {
			margin-top:80px;
		}
	}
}
</style>