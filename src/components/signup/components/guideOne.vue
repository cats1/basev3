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
				  <el-form-item >
				  	<h2 class="left">{{$t('guide.guide1.inputTitle')}}</h2>
				  	<el-input v-model="form.cardText" :placeholder="$t('guide.guide1.inputPlaceholder')"></el-input>
				  	<p>{{$t('guide.guide1.inputDesc')}}</p>
				  </el-form-item>
				  <el-form-item>
				  	<h2 class="left">{{$t('uploadComLogo')}}</h2>
				  	<show-photo class="marginlr20" :img-src="logoSrc" @deletekit="changeDele"></show-photo>
		            <p>{{$t('picTips.logotip')}}</p>
		            <upload-pic-btn class="margintop20" :imgtype="0" @sendkit="getLogoSrc"></upload-pic-btn>
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
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
import {showPhoto} from '@/components/photo'
import stepOne from './stepOne'
export default {
  components: { uploadPicBtn,showPhoto,stepOne },
  data () {
  	return {
      form: {
      	cardText: getCache('cardText') || ''
      },
      imgSrc: require('@/assets/img/guide-logo.png'),
      logoSrc: getCache('logo') || ''
  	}
  },
  methods: {
  	goNext () {
  	  let nform = {
  	  	userid: getCache('userid'),
  	  	cardText: this.form.cardText
  	  }
  	  this.$store.dispatch('UpdateCardText',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.$router.push({path:'guide2'})
        }
      })
  	},
  	changeDele (url){
      this.logoSrc = ''
      this.getLogoSrc('')
    },
  	getLogoSrc (url) {
      let nForm = {
        userid: getCache('userid'),
        logoUrl: url,
      }
      this.$store.dispatch('UpdateLogo',nForm).then(res => {
        let {status} = res
        if (status === 0) {
          this.logoSrc = url
        }
      })
    }
  }
}	
</script>