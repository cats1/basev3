<template>
	<div class="thumbwrap" :style="thumStyle">
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
  	  clipWidth: 100,
      clipHeight: 100,
      clipTop: 0,
      clipLeft: 0,
      clipStyle: {},
      thumStyle: {}
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
         if (w > h) {
           _self.clipWidth = h
           _self.clipHeight = h
           _self.clipLeft = (w - _self.clipWidth)/2
           _self.clipTop = 0
         } else if (w < h) {
           _self.clipWidth = w
           _self.clipHeight = w
           _self.clipLeft = 0
           _self.clipTop = (h - _self.clipHeight)/2
         } else {
           _self.clipWidth = w
           _self.clipHeight = w
           _self.clipLeft = 0
           _self.clipTop = 0
         }
         let ctop = _self.clipTop + 'px'
         let cright = (_self.clipLeft + _self.clipWidth) + 'px'
         let cbom = (_self.clipTop + _self.clipHeight) + 'px'
         let cleft = _self.clipLeft + 'px'
         let scaleX =  110 / _self.clipHeight
         let setScale = 'scale('+scaleX+','+scaleX+')'
         let ml = (_self.clipWidth - 110 ) / 2
         _self.clipStyle = {
         	position: 'absolute',
         	left: '-' + cleft,
         	top: '-' + ctop,
         	clip: 'rect('+ctop+','+cright+','+cbom+','+cleft+')'
         }
         _self.thumStyle = {
           'width': _self.clipHeight + 'px',
           'height': _self.clipHeight + 'px',
           'transform': setScale,
           '-ms-transform': setScale,  /* IE 9 */
           '-moz-transform':setScale,  /* Firefox */
           '-webkit-transform': setScale, /* Safari 和 Chrome */
           '-o-transform': setScale,  /* Opera */
           'margin-left': '-'+ml+'px',
           'margin-top': '-'+ml+'px'
         }
　　   }
      
  	}
  }
}
</script>
<style lang="scss" scoped>
.thumbwrap {
  border-radius: 6px;
  overflow:hidden;
}
</style>