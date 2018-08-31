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
	  				<upload-pic-btn :cwidth="168" :cheight="42" class="margintop20 inline" @sendkit="getSrc"></upload-pic-btn>
	  			</div>
			</el-radio-group>
		</div>
		<div class="block margintop20 paddingtb20">		  
      <template v-if="papernew">
        <template v-if="printType === 0">
          <new-black-paper :card-type="cardType" :card-size="cardSize" @getmode="setMode"></new-black-paper>
        </template>
        <template v-else>
          <color-paper></color-paper>
        </template>
      </template>
      <template v-else>
        <h3>{{$t('notice.vpaper.vType')}}</h3>
        <template v-if="printType === 0">
          <black-paper :card-type="cardType" :card-size="cardSize" @stylekit="getCardStyle" @sizekit="getCardSize"></black-paper>
        </template>
        <template v-else>
          <color-paper></color-paper>
        </template>
      </template>
		</div>
		<div class="block margintop20 paddingtb20">
			<el-button type="primary" @click="saveModeCardSet">{{$t('btn.saveBtn')}}</el-button>
			<!-- <el-button @click="doOverview">{{$t('btn.overview')}}</el-button> -->
		</div>
    <overview-dialog :print-type="printType" :overview-show="overviewShow" :card-type="cardType" :cvalue="cardText" @close="closeOverview"></overview-dialog>
	</div>
</template>
<script>
import overviewDialog from './overviewDialog'
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean,chineseFromUtf8Url,checkIsNull} from '@/utils/common'
import newBlackPaper from './newBlackPaper'
import blackPaper from './blackWhitePaper'
import colorPaper from './colorPaper'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
export default {
  components: { noticeShow, oneNotice, newBlackPaper, blackPaper, colorPaper,uploadPicBtn,overviewDialog },
  data () {
  	return {
      papernew: true,
      imgSrc: require('@/assets/img/cards.png'),
      isShow: false,
      printType: 1,
      cardLogo: 0,
      cardText: chineseFromUtf8Url(getCache('cardText')),
      cardPic: unescape(getCache('cardPic')),
      cardType: 0,
      cardSize: 0,
      ptype: 0,
      ctype: 0,
      radio2: 0,
      overviewShow: false,
      modeform: {
        badgeMode: parseInt(getCache('badgeMode')) || 0,
        brandType: parseInt(getCache('brandType')) || 0,
        brandPosition: getCache('brandPosition') || 0,
        brandText: getCache('cardText'),
        showAvatar: numberToBoolean(parseInt(getCache('showAvatar'))),
        avatarType: parseInt(getCache('avatarType')),
        fixAvatarUrl: checkIsNull(getCache('qrcode').split('#')[1]),
        qrcodeText: checkIsNull(getCache('qrcode').split('#')[0]),
        customText: getCache('customText'),
        badgeCustom: checkIsNull(getCache('badgeCustom')),
        brandImageUrl: ''
      }
  	}
  },
  mounted () {
  	this.init()
  	
  },
  methods: {
    setMode (data) {
      this.modeform = data
    },
    doOverview () {
      this.overviewShow = true
    },
    closeOverview () {
      this.overviewShow = false
    },
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
    saveModeCardSet () {
      let nform    
      if (this.printType === 0) {
        nform = {
          userid: getCache('userid'),
          printType: this.printType + 1,
          cardType: this.cardType + 1,
          cardSize: this.cardSize + 1,
          cardLogo: this.cardLogo + 1,
          cardText: this.cardText,
          cardPic: this.cardPic,
          badgeMode: this.modeform.badgemode,
          badgeCustom: this.modeform.badgeCustom,
          brandType: this.modeform.brandType,
          brandPosition: this.modeform.brandPosition,
          showAvatar: booleanToNumber(this.modeform.showAvatar),
          avatarType: this.modeform.avatarType,
          customText: this.modeform.customText
        }
        let links = this.modeform.qrcodeText + '#' + this.modeform.fixAvatarUrl
        this.updateCardStyle(nform)
        if (this.modeform.avatarType !== 0) {
          let nform = {
            userid: getCache('userid'),
            qrcode: links,
            qrcodeSwitch: 1,
            qrcodeType: 2
          }
          this.updateQRcode(nform)
        } else {
          let nform = {
            userid: getCache('userid'),
            qrcode: links,
            qrcodeSwitch: 0,
            qrcodeType: 2
          }
          this.updateQRcode(nform)
        }
      } else {
        nform = {
          userid: getCache('userid'),
          printType: this.printType + 1,
          cardType: this.cardType + 1,
          cardSize: this.cardSize + 1,
          cardLogo: this.cardLogo + 1,
          cardText: this.cardText,
          cardPic: this.cardPic
        }
        this.closeQrCode()
        this.updateCardType(nform)
      }
    },
  	saveCardSet () {
      let nform = {
  	  	userid: getCache('userid'),
        printType: this.printType + 1,
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
  	},
  	closeQrCode () {
  	  let nform = {
  	  	userid: getCache('userid'),
        qrcode: '',
        qrcodeSwitch: 0,
        qrcodeType: 1
  	  }
  	  this.updateQRcode(nform)
  	},
  	updateQRcode (nform) {
  	  this.$store.dispatch('updateQRcode',nform)
  	},
  	updateCardType (nform) {
  	  this.$store.dispatch('updateCardType',nform)
  	},
    updateCardStyle (nform) {
      this.$store.dispatch('updateCardStyle',nform)
    },
    showDown () {
      this.isShow = !this.isShow
    },
    getSrc (url) {
      this.cardPic = url
    }
  }
}
</script>