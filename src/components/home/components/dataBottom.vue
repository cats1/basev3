<template>
	<div class="boxshadow margintop20 paddinglr30 paddingtb20">
		<el-table :data="vdata"></el-table>
	</div>
</template>
<script>
export default {
  props: {
  	vdata: {
  	  type: Array,
  	  default: []
  	}
  },
  data () {
  	return {
  	  data: []
  	}
  }
}
</script>