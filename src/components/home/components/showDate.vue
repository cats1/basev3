<template>
	<div >
		<el-date-picker
	      v-model="value10"
	      type="date"
	      placeholder="选择日期"
	      format="yyyyMMdd" @onClick="getPick" @change="onChange" @blur="onBlur" @focus="onFocus">
	    </el-date-picker>
	</div>
</template>
<script>
export default {
  data () {
  	return {
  	  value10: ''
  	}
  },
  created () {
  	this.getDate()
  },
  methods: {
  	getDate () {
  		console.log(888)
  	},
  	onChange () {
  		console.log('change')
  	},
  	onBlur () {
  		console.log('blur')
  	},
  	onFocus () {
  		console.log('focus')
  	},
  	getPick () {
  		console.log('pick')
  	}
  }
}
</script>