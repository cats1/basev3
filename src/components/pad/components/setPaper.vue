<template>
	<div>
		<div class="svtype emailradiowrap">
			<h3>{{$t('notice.vpaper.printType')}}</h3>
			<el-radio-group v-model="printType" @change="updatePrintType">
			    <el-radio class="block" :label="0">{{$t('notice.vpaper.printBlackType')}}</el-radio>
  				<el-radio class="block" :label="1">{{$t('notice.vpaper.printColorType')}}</el-radio>
			</el-radio-group>
		</div>
		<div class="svtype emailradiowrap">
			<h3>{{$t('notice.vpaper.comShow')}}</h3>
			<el-radio-group v-model="cardLogo" @change="updateCardLogo">
				<el-radio class="block" :label="0">{{$t('notice.vpaper.comTextShow')}}</el-radio>
				<el-input v-model="cardText" style="width:220px"></el-input>
				<el-radio class="block" :label="1">{{$t('notice.vpaper.comPicShow')}}</el-radio>
				<div >
	  				<span class="comlogowrap">
	  					<img :src="cardPic" alt="" v-show="cardPic !== ''">
	  				</span>
	  				<upload-pic-btn class="margintop20 inline" @sendkit="getSrc"></upload-pic-btn>
	  			</div>
			</el-radio-group>
		</div>
		<div class="block margintop20 paddingtb20">
		  <h3>{{$t('notice.vpaper.vType')}}</h3>
		  <template v-if="printType === 0">
		  	<black-paper :card-type="cardType" :card-size="cardSize" @stylekit="getCardStyle" @sizekit="getCardSize"></black-paper>
		  </template>
		  <template v-else>
		  	<color-paper></color-paper>
		  </template>
		</div>
		<div class="block margintop20 paddingtb20">
			<el-button type="primary" @click="saveCardSet">{{$t('btn.saveBtn')}}</el-button>
			<el-button>{{$t('btn.overview')}}</el-button>
		</div>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean,chineseFromUtf8Url} from '@/utils/common'
import blackPaper from './blackWhitePaper'
import colorPaper from './colorPaper'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
export default {
  components: { noticeShow, oneNotice, blackPaper, colorPaper,uploadPicBtn },
  data () {
  	return {
      imgSrc: require('@/assets/img/cards.png'),
      isShow: false,
      printType: 0,
      cardLogo: 0,
      cardText: chineseFromUtf8Url(getCache('cardText')),
      cardPic: unescape(getCache('cardPic')),
      cardType: 0,
      cardSize: 0,
      ptype: 0,
      ctype: 0,
      radio2: 0
  	}
  },
  mounted () {
  	this.init()
  	
  },
  methods: {
  	init () {
  	  this.initPrintType()
  	  this.initCardLogo()
  	  this.initCardType()
  	},
  	initPrintType () {
  	  let printType = parseInt(getCache('printType'))
  	  if (printType != '') {
        this.printType = printType - 1
  	  }
  	},
  	initCardLogo () {
  	  console.log(unescape(getCache('cardPic'))) 	  
  	  let cardLogo = parseInt(getCache('cardLogo'))
      if (cardLogo != '') {
        this.cardLogo = cardLogo - 1
        if (cardLogo === 2) {
        	console.log(getCache('cardPic'))
        }
  	  } else {

  	  }
  	},
  	initCardType () {
  	  let cardType = parseInt(getCache('cardType'))
  	  let qrcodeSwitch = parseInt(getCache('qrcodeSwitch')) || 0
  	  if (qrcodeSwitch === 1 && (cardType === 3 || cardType === 4)) {
  	  	this.cardType = 3
  	  } else {
  	  	this.cardType = cardType - 1
  	  }
  	},
  	initCardSize () {
  	  let cardSize = parseInt(getCache('cardSize'))
  	  if (this.printType === 2) {
  	  	this.cardSize = cardSize - 3
  	  } else {
  	  	this.cardSize = cardSize - 1
  	  }
  	},
  	getCardStyle (val) {
      this.cardType = val
  	},
  	getCardSize (type) {
  	  this.cardSize = type
  	},
  	updatePrintType (val) {
  	  this.printType = val
  	},
  	updateCardLogo (val) {
  	  this.cardLogo = val
  	},
  	saveCardSet () {
      let nform = {
  	  	userid: getCache('userid'),
        printType: this.printType,
        cardType: this.cardType + 1,
        cardSize: this.cardSize + 1,
        cardLogo: this.cardLogo + 1,
        cardText: this.cardText,
        cardPic: this.cardPic
  	  }
  	  if (this.cardType === 3) {
        this.updateCardType(nform)
  	  } else {
  	  	this.closeQrCode()
  	  	this.updateCardType(nform)
  	  }
  	  console.log(nform)
  	},
  	closeQrCode () {
  	  let nform = {
  	  	userid: getCache('userid'),
        qrcode: '',
        qrcodeSwitch: 0,
        qrcodeType: 1
  	  }
  	  this.updateQRcode(nform,0)
  	},
  	updateQRcode (nform,type) {
  	  this.$store.dispatch('updateQRcode',nform)
  	},
  	updateCardType (nform) {
  	  this.$store.dispatch('updateCardType',nform)
  	},
    showDown () {
      this.isShow = !this.isShow
    },
    getSrc (url) {}
  }
}
</script>