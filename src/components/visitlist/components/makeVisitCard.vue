<template>
	<div class="btnsection">
		<el-button @click="makeCard"><i class="fa fa-vcard-o"></i>{{$t('btn.cardBtn')}}</el-button>
	</div>
</template>
<script>
//import $ from 'jquery'
import {getCache} from '@/utils/auth'
import qrCode from '@/components/qrCode/qrCode'
import QRCode from 'qrcode'
export default {
  props: ['cardarray'],
  components: {qrCode},
  data () {
  	return {
  	  cards: this.cardarray,
  	  comUrl: require('@/assets/img/com.png')
  	}
  },
  watch: {
  	cardarray (val) {
  	  this.cards = val
  	}
  },
  mounted () {
  	console.log(this.cardarray)
  },
  methods: {
  	makeCard () {
  	  let _self = this
  	  this.cards.forEach(function(element, index) {
  	  	let nRid = element.rid.replace(/^(C|c)/g, '')
  	  	let nform = {
  	  	  'userid': getCache('userid'),
          'rid': nRid
  	  	}
  	  	_self.$store.dispatch('getRvQrcode',nform).then(res => {
  	  	  let {status,result} = res
  	  	  if (status === 0) {
            _self.creatCard(element, index,result)
  	  	  }
  	  	})
  	  })
  	},
  	creatCard (item,i,result) {
  	  let avatarSrc = item.avatar ? require('@/assets/img/default.png') : item.avatar
        avatarSrc = avatarSrc.replace('http:', window.location.protocol)
      let comUrl = require('@/assets/img/com.png')
      let visitorUrl = require('@/assets/img/visitor.png')
      let phoneUrl = require('@/assets/img/phone.png')
      let areaUrl = require('@/assets/img/area.png')
      let dateUrl = require('@/assets/img/date.png')
      let directionHtml = $('<div class="directpage1" id="directpage' + i + '">\
                                <div class="pagecardleft">\
                                    <span class="cardpic"><img src="' + avatarSrc + '" alt=""></span>\
                                    <span class="logopic">' + getCache("company") + '</span>\
                                </div>\
                                    <div class="pagecardright">\
                                        <h2>' + item.name + '</h2>\
                                        <p><img src="'+comUrl+'" />' + item.company + '</p>\
                                        <p><img src="'+visitorUrl+'" />' + item.leader + '负责接待</p>\
                                        <p><img src="'+phoneUrl+'" />' + item.phone + '</p>\
                                        <p><img src="'+areaUrl+'" />' + item.area + '</p>\
                                        <p><img src="'+dateUrl+'" />' + item.endDate + '</p>\
                                        <div class="cardcodewrap"><div id="qrcode' + i + '"></div></div>\
                                    </div>\
                                </div>')
      
      $('body').append($(directionHtml))
      let qrcode = new QRCode(document.getElementById('qrcode' + i), {  
        width: 196,  
        height: 196, // 高度  
        text: result // 二维码内容   
      })
  	}
  }
}
</script>