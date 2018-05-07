<template>
	<div class="or-line-wrap">
		<hr>
		<span class="or-value">{{$t('login.or')}}</span>
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