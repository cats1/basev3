<template>
	<div class="guidewrap">
		<h1 class="guidelogo"><img :src="imgSrc" alt=""></h1>
		<div class="guidecell">			
			<div class="guidetop">
				<div class="guidesteps">
					<step-one :num="1" :total="5"></step-one>
				</div>
				<p class="guide-top-title">{{$t('guide.guide1.title')}}</p>
				<p class="guide-top-desc">{{$t('guide.guide1.desc')}}</p>
			</div>
			<div class="guidebody">
				<el-form :model="form">
				  <h2 class="left">{{$t('guide.guide1.inputTitle')}}</h2>
				  <el-form-item prop="company">
				  	<el-input v-model="form.company" :placeholder="$t('guide.guide1.inputPlaceholder')"></el-input>
				  	<p>{{$t('guide.guide1.inputDesc')}}</p>
				  </el-form-item>
				</el-form>
			</div>
			<div class="guidebom">
				<p class="desc">{{$t('guide.guide1.next')}}</p>
				<el-button type="primary" @click="goNext">{{$t('guide.guide1.btn')}}</el-button>
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
      form: {
      	company: ''
      },
      imgSrc: require('@/assets/img/guide-logo.png')
  	}
  },
  methods: {
  	goNext () {
  	  this.$router.push({path:'two'})
  	}
  }
}	
</script>