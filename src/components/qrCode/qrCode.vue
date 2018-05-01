<template>
	<div>
		<!-- <div :id="id">
      <img :src="url" alt="">
    </div> -->
    <canvas class="canvascode" :id="id" :width="width" :height="height"></canvas>
	</div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: {
    mid: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 120
    }
  },
  data () {
  	return {
      id: 'qrcode'+ this.mid,
      url: ''
  	}
  },
  methods: {
  	initQrcode () {
  	  let link = 'http://www.coolvisit.com/wechat/meeting.html?mid=' + this.mid
      /*QRCode.toDataURL(link).then(url => {
	       this.url = url
  	  }).catch(err => {
  	    console.error(err)
  	  })*/
      QRCode.toCanvas(document.getElementById(this.id), link,function (error) {
        if (error) console.error(error)
      })
	  }
  },
  mounted () {
  	this.$nextTick(function () {
      this.initQrcode()
    })
  }
}
</script>
<style lang="scss" scoped>
.canvascode{
  width:35px;
  height: 35px;
}
</style>
