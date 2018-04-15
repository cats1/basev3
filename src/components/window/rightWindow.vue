<template>
	<div class="right-window-wrap">
		<div class="window-header" v-if="$slots.header || header">
			<slot name="header">{{ header }}</slot>
		</div>
		<div class="window-body" v-else>
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
  data () {
  	return {}
  }
}
</script>
<style lang="scss" scoped>
.right-window-wrap{
	width:auto;
	height: 100%;
	overflow: hidden;
	.window-header{
		line-height: 36px;
		color: red;
	}
	.window-body{
		height: auto;
		max-height: 90%;
		overflow: auto;
	}
}
</style>