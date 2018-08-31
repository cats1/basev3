<template>
  <div class="share-img-wrap">
  	<img :src="imgUrl" alt="" :style="imgStyle">
  </div>
</template>
<script>
export default {
  props: {
  	imgSrc: null,
    width: null
  },
  data () {
  	return {
  	  imgUrl: this.imgSrc,
      imgStyle: {
        'width': this.width ? this.width : '100%'
      }
  	}
  },
  watch: {
  	imgSrc (val) {
  	  this.imgUrl = val
  	},
    width (val) {
      console.log(val)
      this.imgStyle = {
        width: val
      }
    }
  },
  mounted () {
    /*this.imgStyle = {
      'width': this.width ? this.width : '100%'
    }*/
  }
}
</script>
<style lang="scss" scoped>
.share-img-wrap{
  text-align: center;
  img{
  	width: auto;
  	max-width: 100%;
  	height: auto;
  }
}
</style>