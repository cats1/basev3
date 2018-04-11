<template>
	<div class="or-line-wrap">
		<hr>
		<span class="or-value">{{text}}</span>
	</div>
</template>
<script>
export default {
  props: {
  	value: String,
  	default: ''
  },
  data () {
  	return {
      text: this.value
  	}
  }
}
</script>
<style lang="scss" scoped>
.or-line-wrap{
	position:relative;
	hr{
		border: 0;
        border-top: 1px solid #fff;
        position:absolute;
        top:20px;
        width:100%;
        z-index:1;
	}
	.or-value{
		display:inline-block;
		padding: 0 20px;
		height:40px;
		line-height:40px;
		position:relative;
		z-index:10;
	}
}
</style>