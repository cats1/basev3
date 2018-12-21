<template>
    <el-dialog class="mobandialog"
	  :visible.sync="isShow" :modal="false"
	  width="40%" @close="getKnow">
	   <div slot="title" class="mobanwinstop">
	   	<img :src="iconsrc" alt="">
	   	<template v-if="inviteMoreShow">
        <p>{{$t('ApproveSuccess')}}</p>
      </template>
      <template v-else>
        <p>{{$t('moban.tip')}}</p>
      </template>
	   </div>
	   <div class="mobanwins">
	   	 <p>{{pdesc}}</p>
	   	 <el-button type="success" @click="getKnow">{{$t('moban.tip2')}}</el-button>
	   </div>
    </el-dialog>
</template>
<script>
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
  	}
  },
  data () {
  	return {
  	  isShow: this.mobanFlag,
  	  iconsrc: require('@/assets/img/plane1.png'),
  	  pdesc: '',
      inviteMoreShow: process.env.inviteMoreShow || false,
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