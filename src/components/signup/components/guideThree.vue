<template>
	<div class="guidewrap">
		<h1 class="guidelogo"><img :src="imgSrc" alt=""></h1>
		<div class="guidecell">			
			<div class="guidetop">
				<div class="guidesteps">
					<step-one :num="3" :total="5"></step-one>
				</div>
				<p class="guide-top-title">{{$t('guide.guide3.title')}}</p>
				<p class="guide-top-desc">{{$t('guide.guide3.desc')}}</p>
			</div>
			<div class="guidebody guidebodymask" v-if="!threeset">
				<div class="mask">
					<el-button type="success" @click="perSet">个性化设置</el-button>
				</div>
			</div>
			<div class="guidebody" v-else>
				<el-input style="margin-bottom:30px;" :placeholder="$t('yourName')"></el-input>
				<el-input style="margin-bottom:30px;" :placeholder="$t('visitcause')"></el-input>
				<el-input style="margin-bottom:30px;" :placeholder="$t('yourPhone')"></el-input>
				<el-input style="margin-bottom:30px;" :placeholder="$t('yourVisitor')"></el-input>
			</div>
			<div class="guidebom">
				<p class="desc">{{$t('guide.guide3.next')}}</p>
				<el-button type="primary" @click="goNext">{{$t('guide.guide3.btn')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import stepOne from './stepOne'
export default {
  components: { stepOne },
  data () {
  	return {
  	  threeset: false,
      imgSrc: require('@/assets/img/guide-logo.png')
  	}
  },
  methods: {
  	perSet () {
      this.threeset = true
  	},
  	goNext () {
  	  this.$router.push({path:'guide4'})
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