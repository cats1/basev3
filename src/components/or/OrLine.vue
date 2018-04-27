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

</style>