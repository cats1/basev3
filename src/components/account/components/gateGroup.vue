<template>
	<div>
		<ul>
		  <template v-for="(item,index) in gatelist">
		  	<li><el-checkbox v-model="checkArray[index]">{{item.egname}}</el-checkbox></li>
		  </template>
		</ul>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {
  	  form: {
  	  	userid: getCache('userid')
  	  },
  	  gatelist: [],
  	  checkArray: []
  	}
  },
  methods: {
  	getGateList () {
  	  this.$store.dispatch('getEquipmentGroupByUserid',this.form).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.gatelist = result
  	  	}
  	  })
  	}
  }
}
</script>