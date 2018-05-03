<template>
    <el-dialog :visible.sync="isShow" title="邀请短信模板"
	  width="40%" @close="getKnow">
      <div class="previewwrap">
        <div class="messagedetail">
          <div class="messtop">
            <img src="assets/img/talk_top.png" alt=""></div>
          <div class="messmid" id="messagedetail">{{obj.name}}{{$t('moban.hello')}}{{company}}{{$t('moban.hello1')}}{{obj.visitType}},{{$t('moban.hello2')}}：{{link}}</div>
          <div class="messbom">
            <img src="assets/img/talk_bom.png" alt=""></div>
        </div>
      </div>
      <p class="tips">提示:添加多条来访者信息时，只能预览第一条记录</p>
	   <!-- <div class="mobanwins">
	   	 <p>{{pdesc}}</p>
	   	 <el-button type="success" @click="getKnow">{{$t('moban.tip2')}}</el-button>
	   </div> -->
    </el-dialog>
</template>
<script>
import { getCache } from '@/utils/auth'
export default {
  props: {
  	mobanFlag: {
  	  type: Boolean,
  	  default: false
  	},
  	icon: {
  	  type: String,
  	  default: ''
  	},
  	ptip:{
  	  type: String,
  	  default: ''
  	},
    obj: {
      type: Object,
      default: {
        name: 'XXX',
        visitType: '面试'
      }
    }
  },
  data () {
  	return {
  	  isShow: this.mobanFlag,
  	  iconsrc: require('@/assets/img/plane1.png'),
  	  pdesc: '',
      link: process.env.HOST,
      company: getCache('company')
  	}
  },
  watch: {
  	mobanFlag (val) {
  	  this.isShow = val
  	},
  	icon (val) {
  	  this.iconsrc = val
  	},
  	ptip (val) {
  	  this.pdesc = val
  	}
  },
  methods: {
  	getKnow () {
  	  this.isShow = false
  	  this.$emit('closekit')
  	}
  }
}
</script>
<style lang="scss" scoped>

</style>