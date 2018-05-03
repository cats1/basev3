<template>
	<div class="dphotowrap" :class="{'cbg': imgSrc !== ''}" @mouseover="deHover" @mouseout="outHove">
		<img class="dphoto-img" :src="defaultSrc" alt="" v-if="imgSrc === ''">
		<img class="dphoto-img" :src="imgSrc" alt="" >
		<transition name="el-fade-in-linear">
			<div class="dphotomask" v-show="maskShow" @click="deletePhoto">
				<i class="fa fa-trash-o fa-4x"></i>
			</div>
	  </transition>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
export default {
  props: {
  	imgSrc: {
  	  type: String,
  	  default: ''
  	},
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
  	  defaultSrc: require('@/assets/img/placeholder1.png'),
  	  maskShow: false
  	}
  },
  methods: {
  	deHover () {
  	  if (this.imgSrc !== '') {
  	  	this.maskShow = true
  	  }
  	},
  	outHove () {
  	  this.maskShow = false
  	},
  	deletePhoto () {
  	  this.maskShow = false
  	  this.$emit('deletekit',this.imgSrc,this.index)
  	}
  }
}
</script>