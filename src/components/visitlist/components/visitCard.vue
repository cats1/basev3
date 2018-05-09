<template>
	<div class="directpage1" v-show="isShow" :id="id" ref="id">
		<div class="pagecardleft">
            <span class="cardpic">
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
            	<qr-code :mid="codeString" :ctype="1" :width="196" :height="196"></qr-code>
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
import {downMoban} from '@/utils/common'
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
      codeString: ''
  	}
  },
  computed: {
  	avatarSrc: {
  	  get () {
  	  	let avatarSrc = this.cards.avatar ? require('@/assets/img/default.png') : this.cards.avatar
        avatarSrc = avatarSrc.replace('http:', window.location.protocol)
        return avatarSrc
  	  },
  	  set () {}
  	}
  },
  watch: {
  	vitem (val) {
  	  this.cards = val
  	},
  	index (val) {
  	  this.id = 'vcard_' + val
  	},
  	cardShow (val) {
  	  this.isShow = val
  	  if (val) {
  	  	this.makeCard()
  	  }
  	}
  },
  mounted () {
  	this.init()
  	if (this.isShow) {
  	  this.makeCard()
  	}
  },
  methods: {
  	init () {
  	  document.body.appendChild(this.$refs.id)
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
      html2canvas(document.getElementById(this.id)).then(canvas => {
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