<template>
	<div class="showblock paddingbom20">
		<i class="el-icon-time"></i>{{text}} <el-input style="width:60px;" v-model="value"></el-input>{{danwei}}
	</div>
</template>
<script>
export default {
  props: {
  	text: {
  	  type: String,
  	  default: ''
  	},
  	danwei: {
  	  type: String,
  	  default: ''
  	},
  	cValue: {
  	  type: String,
  	  default: 0
  	}
  },
  data () {
  	return {
  	  value: this.cValue
  	}
  },
  watch: {
  	value: function (val,oldval) {
  		this.$emit('svalue',val)
  	}
  }
}
</script>