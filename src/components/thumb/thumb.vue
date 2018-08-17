<template>
	<div class="thumbwrap" >
		<img :src="src" :style="clipStyle">
	</div>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
  	src: null,
  	width: {
  	  type: Number,
  	  default: 100
  	}, 
  	height: {
  	  type: Number,
  	  default: 100
  	}, 
  	options: {
  	  type: Object,
  	  default: function () {
  	  	return {}
  	  }
  	}
  },
  data () {
  	return {
  	  clipWidth: this.width,
      clipHeight: this.height,
      clipTop: 0,
      clipLeft: 0,
      clipStyle: {}
  	}
  },
  watch: {
  	src (val) {
  	  this.loadImg(val)
  	}
  },
  mounted () {
  	this.loadImg(this.src)
  },
  methods: {
  	init () {},
  	loadImg (src) {
  	  let nImg = new Image()
      nImg.src = src
      let _self = this
　　   nImg.onload = function () {
　　　　  let w = parseInt(nImg.width)
　　　　  let h = parseInt(nImg.height)
         if (w >= _self.clipWidth) {
           _self.clipLeft = (w - _self.clipWidth)/2
         }
         if (h >= _self.clipHeight) {
           _self.clipTop = (h - _self.clipHeight)/2
         }
         let ctop = _self.clipTop + 'px'
         let cright = (_self.clipLeft + _self.clipWidth) + 'px'
         let cbom = (_self.clipTop + _self.clipHeight) + 'px'
         let cleft = _self.clipLeft + 'px'
         _self.clipStyle = {
         	position: 'absolute',
         	left: '-' + cleft,
         	top: '-' + ctop,
         	clip: 'rect('+ctop+','+cright+','+cbom+','+cleft+')'
         }
　　   }
      
  	}
  }
}
</script>
<style lang="scss" scoped></style>