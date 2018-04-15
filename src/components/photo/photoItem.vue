<template>
	<div class="photo-item-wrap" >
		<div class="photo-item-img" @mouseover="deHover" @mouseout="outHove">
			<img :src="src" alt="">
		</div>
		<transition name="el-fade-in">
		  <span v-show="!defaultShow" class="photo-edit" @click="deUpdate">修改头像</span>
	    </transition>
		<transition name="el-fade-in">
          <div v-show="maskShow" class="photo-item-mask" @click="deletePhoto"><i class="fa fa-trash-o fa-5x"></i></div>
        </transition>
        <el-collapse-transition>
        	<default-avatar ref="defaultavatar" :index="index" v-show="defaultShow" @getdkit="getDPhoto" @blur="doFade"></default-avatar>
        </el-collapse-transition>
	</div>
</template>
<script>
import defaultAvatar from './defaultAvater'
import { getCache,setCache } from '@/utils/auth'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  components: {defaultAvatar},
  props: ['imgsrc','index'],
  data () {
  	return {
  	  src: this.imgsrc || require('@/assets/img/add-avatar.png'),
  	  maskShow: false,
  	  defaultShow: false,
  	  photoArray: stringToArray(getCache('defaultPhoto'))
  	}
  },
  mounted () {
  	/*document.onclick = () => {
	  this.defaultShow = false
	}*/
  },
  methods: {
  	deHover () {
  	  if (this.imgsrc) {
        this.maskShow = true
  	  }
  	},
  	outHove () {
  	  if (this.imgsrc) {
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
  	deletePhoto () {
  	  this.photoArray.splice(this.index,1)
  	  this.UpdateDefaultPhoto()
  	},
  	UpdateDefaultPhoto () {
  		let nForm = {
        	userid: getCache('userid'),
        	defaultPhoto: arrayToString(this.photoArray)
        }
        this.$store.dispatch('UpdateDefaultPhoto',nForm).then(res => {
        	let {status} = res
        	if (status === 0) {
        		this.defaultShow = false
        		this.src = val
        	}
        })
  	},
  	getDPhoto (val) {
  	  let valFlag = false
  	  this.photoArray.forEach(function(ele,index){
  	  	if (ele === val) {
          valFlag = true
  	  	}
  	  })
  	  if (valFlag) {
        this.$message({
          message: '该头像已经被选定为缺省',
          type: 'error'
        })
  	  } else {
        if (this.imgsrc) {
          this.photoArray[this.index] = val
        } else {
          this.photoArray.push(val)
        }
        this.UpdateDefaultPhoto()
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