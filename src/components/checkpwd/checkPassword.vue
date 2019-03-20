<template>
	<div class="pw-wrap" :style="{'color':pcolor}">
	    <el-input type="password" v-model="pwdValue" :placeholder="$t('passText')"></el-input>
	    <div class="pw-bar">
	  	  <template v-if="scoreType == 0"></template>
		  <template v-else-if="scoreType == 1">
		  	<i class="el-icon-warning"></i>{{$t('pwdWeak')}}
		  </template>
		  <template v-else-if="scoreType == 2">
		  	<i class="el-icon-warning"></i>{{$t('pwdMedium')}}
		  </template>
		  <template v-else>
		  	<i class="el-icon-success"></i>{{$t('pwdStrong')}}
		  </template>
	    </div>
	</div>
</template>
<script>
import {checkStrong,pwStrength} from '@/utils/pwd.js'
export default {
  props: {
  	pValue: null
  },
  data () {
  	return {
  	  pwdValue: '',
  	  scoreType: 0,
  	  pcolor: '#eeeeee'
  	}
  },
  watch: {
  	pValue (val) {
	  this.scoreType = checkStrong(val)
  	  this.pcolor = pwStrength(val)
  	},
  	pwdValue (val) {
  	  this.scoreType = checkStrong(val)
  	  this.pcolor = pwStrength(val)
  	  this.$emit('sendv',this.pwdValue,this.scoreType)
  	}
  }
}
</script>
<style lang="scss" scoped>
.pw-wrap{
	position:relative;
	.pw-bar{
	position:absolute;
	right:10px;
	top: 36px;
	i{
	margin-right:5px;
}
}
}	
</style>