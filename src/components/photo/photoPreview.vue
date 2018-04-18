<template>
	<div class="photo-item-wrap" @mouseover="deHover" @mouseout="outHove" :ref="photoitem">
		<div class="photo-item-img" >
			<img :src="src" alt="">
		</div>
		<transition name="el-fade-in">
      <div v-show="maskShow" class="photo-item-mask" @click="deletePhoto"><i class="fa fa-trash-o fa-5x"></i></div>
    </transition>
	</div>
</template>
<script>
import { getCache,setCache } from '@/utils/auth'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  props: ['imgsrc','index','imgtype'],
  data () {
  	return {
  	  maskShow: false,
      photoitem: 'photoitem' + this.imgtype,
      bgPicUrl: stringToArray(getCache('backgroundPic'))
    }
  },
  computed: {
    src: {
      get: function () {
        return this.imgsrc
      },
      set: function () {
        if (this.imgsrc && this.imgsrc !== null) {
          return this.imgsrc
        } else {
          if (this.imgtype === '0') {
            this.imgsrc = require('@/assets/img/placeholder1.png')
          } else if (this.imgtype === '1') {
            this.imgsrc = require('@/assets/img/placeholder2.png')
          } else if (this.imgtype === '2') {
            this.imgsrc = require('@/assets/img/com-default.jpg')
          } else {
            this.imgsrc = require('@/assets/img/placeholder1.png')
          }
        }
      }
    }
  },
  watch: {
    imgsrc (val,oldval) {
      console.log(val)
    }
  },
  mounted () {
    console.log(this.src === null)
  },
  methods: {
  	deHover () {
  	  this.maskShow = true
  	},
  	outHove () {
  	  this.maskShow = false
  	},
  	deletePhoto () {
  	  if (this.imgtype === 0) {//
        let nForm = {
          userid: getCache('userid')
        }
        this.$store.dispatch('UpdateLogo',nForm).then(res => {
          let {status} = res
          if (status === 0) {
            this.imgsrc = require('@/assets/img/placeholder1.png')
            this.$emit('resdele','',this.index)
          }
        })
      } else if (this.imgtype === 1){
        this.bgPicUrl.splice(this.index,1)
        let nForm = {
          bgPicUrl: arrayToString(this.bgPicUrl),
          userid: getCache('userid')
        }
        this.$store.dispatch('UploadBackgroundPic',nForm).then(res => {
          let {status} = res
          if (status === 0) {
            this.imgsrc = require('@/assets/img/placeholder2.png')
            this.$emit('resdele',this.imgsrc,this.index)
          }
        })
      } else if (this.imgtype === 2){
        console.log(8989)
      }
  	}
  }
}
</script>
<style lang="scss" scoped>
.photo-item-wrap{
	background: #fff;
    float: left;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    display: inline-block;
    width: 164px;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    border: 1px solid transparent;
    .photo-item-img{
    	width: 162px;
        height: 162px;
        img{
        	max-width:100%;
          min-width:100%;
          min-height: 100%;
          max-height: 100%;
        }
    }
    .photo-edit{
    	cursor: pointer;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    background: rgba(0,0,0,.7);
	    line-height: 35px;
	    height: 35px;
	    color: #fff;
	    text-align: center;
	    font-size: 16px;
	    z-index: 999;
    }
    .photo-item-mask{
	    width: 162px;
	    height: 162px;
	    background: rgba(0,0,0,.25);
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 990;
	    color: #f13333;
	    text-align: center;
	    i{
	    	//margin-top: 40px;
	    }
    }
}
</style>