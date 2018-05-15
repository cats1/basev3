<template>
	<div class="photo-item-wrap" @mouseover.prevent="deHover" @mouseout.prevent="outHove" @click="doAdd">
    <div class="photo-item-img" >
      <img class="photo-item-img" :src="defaultSrc" alt="" v-if="dSrc === ''">
      <img class="photo-item-img" :src="dSrc" alt="" >
    </div>
    <transition name="el-fade-in">
      <div v-show="maskShow" class="photo-item-mask" @click.prevent="deletePhoto">
        <i class="fa fa-trash-o fa-4x"></i>
      </div>
    </transition>
    <transition name="el-fade-in">
      <span v-show="dSrc !== ''" class="photo-edit" @click.prevent="deUpdate">{{$t('editPhoto')}}</span>
    </transition>
    <el-collapse-transition>
      <default-avatar ref="defaultavatar" :index="index" v-show="defaultShow" @getdkit="getDPhoto" @blur="doFade" @update="updateUrl"></default-avatar>
    </el-collapse-transition>
	</div>
</template>
<script>
import defaultAvatar from './defaultAvater'
import { getCache,setCache } from '@/utils/auth'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  components: {defaultAvatar},
  props: {
    sarray: {
      type: Array,
      default: []
    },
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
      defaultSrc: require('@/assets/img/add-avatar.png'),
      dSrc: this.imgSrc,
  	  maskShow: false,
  	  defaultShow: false,
  	  photoArray: this.sarray
  	}
  },
  watch: {
    sarray (val) {
      this.photoArray = val
    },
    imgSrc (val) {
      this.dSrc = val
    }
  },
  methods: {
    doAdd () {
      if (!this.imgSrc) {
        this.defaultShow = true
      }
    },
  	deHover () {
  	  if (this.imgSrc) {
        this.maskShow = true
  	  }
  	},
  	outHove () {
  	  if (this.imgSrc) {
        this.maskShow = false
  	  }
  	},
  	deUpdate () {
  	  this.defaultShow = true
  	  document.onclick = (e) => {
  	    //this.defaultShow = false
  	  }
  	},
  	doFade () {
  	  if (this.defaultShow) {
        this.defaultShow = false
  	  }
  	},
    updateUrl (url) {
      this.$emit('replacekit',url,this.index)
    },
  	deletePhoto () {
  	  this.dSrc = ''
      this.defaultShow = false
      this.maskShow = false
  	  this.$emit('deletekit',this.dSrc,this.index)
  	},
  	getDPhoto (val) {
      let valFlag = false
      this.defaultShow = false
  	  this.sarray.forEach(function(ele,index){
  	  	if (ele === val) {
          valFlag = true
  	  	}
  	  })
  	  if (valFlag) {
        this.$message({
          message: '该头像已经被选定为缺省',
          type: 'warning'
        })
  	  } else {
        this.dSrc = val
        this.$emit('replacekit',val,this.index)
  	  }
  	}
  }
}
</script>
<style lang="scss" scoped>

</style>