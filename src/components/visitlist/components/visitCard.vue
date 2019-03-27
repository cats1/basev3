<template>
	<div class="directpage1" v-show="isShow" :id="id" ref="id">
		<div class="pagecardleft">
            <span class="cardpic">
            	<!-- <img :src="avatarSrc" alt=""> -->
              <img :src="avatarSrc" alt="">
            </span>
            <span class="logopic">{{company}}</span>
        </div>
        <div class="pagecardright">
            <h2>{{cards.name}}</h2>
            <p><img :src="comUrl" alt="">{{cards.company}}</p>
            <p><img :src="visitorUrl" alt="">{{cards.leader}}负责接待</p>
            <p><img :src="phoneUrl" alt="">{{cards.phone}}</p>
            <p><img :src="areaUrl" alt="">{{cards.area}}</p>
            <p><img :src="dateUrl" alt="">{{cards.endDate}}</p>
            <div class="cardcodewrap">
            	<qr-code :mindex="index" :mid="codeString" :ctype="1" :width="196" :height="196"></qr-code>
            </div>
        </div>
	</div>
</template>
<script>
import $ from 'jquery'
import {getCache} from '@/utils/auth'
import qrCode from '@/components/qrCode/qrCode'
import visitCard from './visitCard'
import html2canvas from 'html2canvas'
import {downMoban,checkIsNull} from '@/utils/common'
export default {
  props: {
  	vitem: {
  	  type: Object,
  	  default: {}
  	},
  	index: {
  	  type: Number,
  	  default: 0
  	},
  	cardShow: {
  	  type: Boolean,
  	  default: false
  	}
  },
  components: {qrCode,visitCard},
  data () {
  	return {
  	  cards: this.vitem,
  	  id: 'vcard_' + this.index,
  	  comUrl: require('@/assets/img/com.png'),
  	  isShow: false,
  	  company: getCache('company'),
  	  comUrl: require('@/assets/img/com.png'),
  	  visitorUrl: require('@/assets/img/visitor.png'),
      phoneUrl: require('@/assets/img/phone.png'),
      areaUrl: require('@/assets/img/area.png'),
      dateUrl: require('@/assets/img/date.png'),
      codeId: 0,
      codeString: '',
      avatarSrc: require('@/assets/img/default.png')
  	}
  },
  computed: {
  	/*avatarSrc: {
  	  get () {
        console.log(this.cards.avatar)
  	  	let avatarSrc = this.cards.avatar ? require('@/assets/img/default.png') : this.cards.avatar
        avatarSrc = avatarSrc.replace('http:', window.location.protocol)
        console.log(avatarSrc)
        return avatarSrc
  	  },
  	  set () {}
  	}*/
  },
  watch: {
  	vitem (val) {
      this.cards = val
      if (checkIsNull(val.avatar) !== '') {
        this.avatarSrc = val.avatar
      } else {
        this.avatarSrc = require('@/assets/img/default.png')
      }
  	},
  	index (val) {
  	  this.id = 'vcard_' + val
  	},
  	cardShow (val) {
  	  this.isShow = val
  	  if (val) {
        if (checkIsNull(this.cards.avatar) !== '') {
          this.avatarSrc = this.cards.avatar
        } else {
          this.avatarSrc = require('@/assets/img/default.png')
        }
        let _self = this
        this.checkImgLoad()
  	  	//this.makeCard()
  	  }
  	}
  },
  mounted () {
  	this.init()
  	if (this.isShow) {
      if (checkIsNull(this.cards.avatar) !== '') {
        this.avatarSrc = this.cards.avatar
      } else {
        this.avatarSrc = require('@/assets/img/default.png')
      }
  	  this.checkImgLoad()
  	}
  },
  methods: {
  	init () {
  	  document.body.appendChild(this.$refs.id)
  	},
    checkImgLoad (callback) {
      var newImg = new Image()
      let _self = this
      newImg.src = this.avatarSrc
      let flag = false
      newImg.onerror = () => { // 图片加载错误时的替换图片
        newImg.src = require('@/assets/img/default.png')
      }
      newImg.onload = () => { // 图片加载成功后把地址给原来的img
        _self.avatarSrc = newImg.src
        flag = true
        _self.makeCard()
        callback && callback(true)
      }
    },
  	makeCard () {
  	  let nRid = this.vitem.rid.replace(/^(C|c)/g, '')
  	  let nform = {
  	  	'userid': getCache('userid'),
        'rid': nRid
  	  }
  	  this.$store.dispatch('getRvQrcode',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.codeString = result
          this.makeCanvas()
  	  	}
  	  })
  	},
  	makeCanvas () {
  	  let _self = this
      html2canvas(document.getElementById(this.id),{useCORS:true}).then(canvas => {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            var blob = canvas.msToBlob()　　　　
            window.navigator.msSaveBlob(blob, _self.vitem.name + ".jpg")
        } else {
            var url = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")
            var triggerDownload = $("<a>").attr("href", url).attr("download", _self.vitem.name + ".jpg").appendTo("body")
                triggerDownload[0].click()
                triggerDownload.remove()
        }
        _self.isShow = false
        this.$emit('makekit',this.index)
      })
  	}
  }
}
</script>