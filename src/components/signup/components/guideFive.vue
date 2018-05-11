<template>
	<div class="guidewrap">
		<h1 class="guidelogo"><img :src="imgSrc" alt=""></h1>
		<div class="guidecell">			
			<div class="guidetop">
				<div class="guidesteps">
					<step-one :num="5" :total="5"></step-one>
				</div>
				<p class="guide-top-title">{{$t('guide.guide5.title')}}</p>
				<p class="guide-top-desc">{{$t('guide.guide5.desc')}}</p>
			</div>
			<div class="guidebody">
				<el-row>
					<el-col :span="12">
						<ipad></ipad>
					</el-col>
					<el-col :span="12">
						<andorid></andorid>
					</el-col>
				</el-row>
				<div class="fivebom margintop20">
					<p class="desc"><span class="listitem">1</span>{{$t('downtip1')}}</p>
					<p class="desc"><span class="listitem">2</span>{{$t('downtip2')}}</p>
					<p class="desc"><span class="listitem">3</span>{{$t('downtip3')}}</p>
				</div>
			</div>
			<div class="guidebom">
				<el-button type="primary" @click="goNext">{{$t('guide.guide5.btn')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import andorid from './andorid'
import ipad from './ipad'
import stepOne from './stepOne'
export default {
  components: { stepOne,andorid,ipad },
  data () {
  	return {
      imgSrc: require('@/assets/img/guide-logo.png')
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