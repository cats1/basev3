<template>
	<transition name="el-fade-in-linear">
        <div class="img-view" v-show="imgShow" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img-layer" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)"></div>
            <span class="img-close" @click="closeImg"><i class="fa fa-window-close fa-2x"></i></span>
            <div class="img" v-show="!loading">
                <img :src="imgSrc" ref="showimg" :style="{'margin-left': marginleft,
                'margin-top': margintop,'width': imgWidth,'height': imgHeight}">
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  props: ['imgSrc','boxShow'],
  data () {
  	return {
  	  margintop: '',
  	  marginleft: '',
  	  imgShow: this.boxShow,
  	  loading: true,
  	  timeout: null,
      imgWidth: 'auto',
      imgHeight: 'auto'
  	}
  },
  watch: {
  	imgSrc (val) {
      var image = new Image()
      let _self = this
      image.onload = function(){
          var clientWidth = document.body.clientWidth
          var width = image.width  
          var height = image.height
          var fileSize = image.fileSize
          clearTimeout(_self.timeout)
          _self.timeout = setTimeout(() => {
            _self.loading = false
          }, 3000 * Math.random())
          if (width > clientWidth) {
            _self.imgWidth = clientWidth * 0.8 + 'px'
            _self.imgHeight = height * clientWidth * 0.8 / width + 'px'
            height = height * clientWidth * 0.8 / width
            width = clientWidth * 0.8            
            _self.margintop = '-' + 0.5 * height + 'px'
            _self.marginleft = '-' + 0.5 * width + 'px'
          } else {
            _self.imgWidth = width * 0.8 + 'px'
            _self.imgHeight = height + 'px'
            _self.margintop = '-' + 0.5 * height + 'px'
            _self.marginleft = '-' + 0.5 * width + 'px'
          }   
      }  
      image.src = val
  	},
  	boxShow (val) {
  	  this.imgShow = val
  	}
  },
  methods: {
    bigImg() {
        this.$emit('clickit')
    },
    closeImg () {
    	this.imgShow = false
    	this.$emit('closekit')
    }
  }
}
</script>
<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}


/* bigimg */

.img-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.img-close{
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 9999;
	color: #fff;
}
/*不限制图片大小，实现居中*/
.img-view .img{
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  left: 0;
  top:0;
  overflow: auto; 
}
.img-view .img img {
    max-width: 100%;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: auto;
    z-index: 1000;
}
</style>