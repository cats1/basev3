<template>
	<div class="sider-bar-item">
		<div class="sider-bar-item-head">
			{{header}}
		</div>
		<slot></slot>
	</div>
</template>
<script>
export default {
  props: {
  	header: {
  		type: String,
  		default: ''
  	}
  },
  name: 'siderBarItem'
}
</script>
<style></style>