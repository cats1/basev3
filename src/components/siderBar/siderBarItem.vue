<template>
	<div class="sider-bar-item">
		<router-link :to="index" active-class="item-active"><slot></slot></router-link>
	</div>
</template>
<script>
export default {
  props: {
  	index: {
  		type: String,
  		default: ''
  	}
  },
  name: 'siderBarItem'
}
</script>
<style lang="scss" scoped>
.item-active{
  color:red
}
</style>