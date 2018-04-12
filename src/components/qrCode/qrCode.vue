<template>
	<div>
		<div :id="id">
			<img :src="url" alt="">
		</div>
	</div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: ['mid'],
  data () {
  	return {
      id: 'qrcode'+ this.mid,
      url: ''
  	}
  },
  methods: {
  	initQrcode () {
  	  let link = 'http://www.coolvisit.com/wechat/meeting.html?mid=' + this.mid
      QRCode.toDataURL(link).then(url => {
	       this.url = url
  	  }).catch(err => {
  	    console.error(err)
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
