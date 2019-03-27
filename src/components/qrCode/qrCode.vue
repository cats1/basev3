<template>
	<div>
		<template v-if="ctype === 0">
      <canvas :class="className" :id="id" :style="{'width':width+'!important'}" :width="width" :height="height"></canvas>
    </template>
    <template v-else-if="ctype === 1">
      <div :id="id"></div>
    </template>
	</div>
</template>
<script>
import QRCode from 'qrcode'
import Qrcode from 'qrcodejs2'
export default {
  props: {
    mid: null,
    mindex:{
      type: Number,
      default: -1
    },
    link: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 120
    },
    ctype:{
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'canvascode'
    }
  },
  data () {
  	return {
      id: 'qrcode' + this.mindex,
      url: '',
      code: this.mid
  	}
  },
  watch: {
    mid (val) {
      this.code = val
      this.id = 'qrcode'+ this.mindex
      this.initQrcode(val)
    },
    mindex (val) {
      console.log(val)
    },
    link (val) {
      this.initQrcode(val)
    }
  },
  methods: {
  	initQrcode (val) {
      if (this.ctype === 0) {
        let link = 'http://www.coolvisit.com/wechat/meeting.html?mid=' + this.mid
        QRCode.toCanvas(document.getElementById(this.id), link,function (error) {
           if (error) console.error(error)
        })
      } else if (this.ctype === 3) {
        QRCode.toCanvas(document.getElementById(this.id), this.link,function (error) {
           if (error) console.error(error)
        })
      } else {
        let qrcode = new Qrcode(this.id, {  
          width: 196,  
          height: 196, // 高度  
          text: val // 二维码内容  
        }) 
      }
	  }
  },
  mounted () {
    if (this.isShow) {
      this.initQrcode(this.link)
    }
  }
}
</script>
<style lang="scss" scoped>
.canvascode{
  width:35px;
  height: 35px;
}
</style>
