<template>
	<el-dialog
	  :title="$t('overviewVCard')"
	  :visible.sync="dialogVisible"
	  width="50%"
	  :before-close="handleClose">
	  <template v-if="printType === 0">
	  	<div class="ocardwrap card0" v-if="ctype === 0">
	  		<img :src="imgSrc1" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card1" v-else-if="ctype === 1">
	  		<img :src="imgSrc2" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card2" v-else-if="ctype === 2">
	  		<img :src="imgSrc3" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card3" v-else-if="ctype === 3">
	  		<img :src="imgSrc4" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card4" v-else-if="ctype === 4">
	  		<img :src="imgSrc6" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card5" v-else-if="ctype === 5">
	  		<img :src="imgSrc7" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card6" v-else-if="ctype === 6">
	  		<img :src="imgSrc8" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  	<div class="ocardwrap card7" v-else-if="ctype === 7">
	  		<img :src="imgSrc9" alt="">
	  		<p>{{cvalue}}</p>
	  	</div>
	  </template>
	  <template v-else>
	  	<div class="ocardwrap card8">
	  		<img :src="imgSrc5" alt="">
	  	</div>
	  </template>
	</el-dialog>
</template>
<script>
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import blackCardStyle from './blackCardStyle'
import blackCardSize from './blackCardSize'
export default {
  props: {
  	printType: {
      type: Number,
      default: 0
    },
    cardType: {
      type: Number,
      default: 0
    },
    overviewShow: {
      type: Boolean,
      default: false
    },
    cvalue: {
      type: String,
      default: ''
    }
  },
  components: { blackCardStyle,blackCardSize },
  data () {
  	return {
      imgSrc1: require('@/assets/img/card/c1.jpg'),
      imgSrc2: require('@/assets/img/card/c2.jpg'),
      imgSrc3: require('@/assets/img/card/c3.jpg'),
      imgSrc4: require('@/assets/img/card/c4.jpg'),
      imgSrc6: require('@/assets/img/card/c6.jpg'),
      imgSrc7: require('@/assets/img/card/c7.jpg'),
      imgSrc8: require('@/assets/img/card/c8.jpg'),
      imgSrc9: require('@/assets/img/card/c9.jpg'),
      imgSrc5: require('@/assets/img/card/c5.jpg'),
      isShow: false,
      ptype: 0,
      ctype: this.cardType,
      dialogVisible: this.overviewShow
  	}
  },
  watch: {
  	overviewShow (val) {
  	  this.dialogVisible = val
  	},
  	cardType (val) {
  	  this.ctype = val
  	}
  },
  methods: {
    handleClose (type) {
      this.dialogVisible = false
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.ocardwrap{
  width: 500px;
  height: 310px;
  position:relative;
  overflow:hidden;
  margin:0 auto;
  img{
  		width: 100%;
  	}
  &.card0{
  	p {
      width:50%;
      position:absolute;
      bottom: 10px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card1{
  	p {
      width:50%;
      position:absolute;
      bottom: 80px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card2{
  	p {
      width:50%;
      position:absolute;
      bottom: 50px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card3{
  	p {
      width:50%;
      position:absolute;
      bottom: 50px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card4,&.card5{
  	p {
      width:50%;
      position:absolute;
      bottom: 50px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card6,&.card7{
  	p {
      width:50%;
      position:absolute;
      bottom: 50px;
      line-height:36px;
      left:10px;
      z-index:999;
      text-align:center;
  	}
  }
  &.card8{
  	width: 300px;
  	height:auto;
  }
}
</style>