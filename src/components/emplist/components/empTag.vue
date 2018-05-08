<template>
	<el-tag class="marginr10" :type="bType">
		<span @click="checkThis">{{empObj.empName}}</span>
	</el-tag>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
  	eObj: {
  	  type: Object,
  	  default: {}
  	},
  	index: {
  	  type: Number,
  	  default: 0
  	}
  },
  data () {
  	return {
      bType: 'info',
      visitType: this.vtype,
      empObj: this.eObj
  	}
  },
  watch: {
  	eObj (val) {
  	  this.empObj = val
  	}
  },
  mounted () {

  },
  methods: {
  	checkThis () {
  	  if (this.bType === 'info') {
  	  	this.bType = 'success'
  	  } else {
        this.bType = ''
  	  }
  	  this.$emit('checkkit',this.bType,this.index)
  	}
  }
}
</script>