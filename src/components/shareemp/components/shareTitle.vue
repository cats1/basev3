<template>
	<div class="share-title-wrap">
		<p>{{vTitleText}}</p>
	</div>
</template>
<script>
export default {
  props: {
  	vtitle: null
  },
  data () {
  	return {
  	  vTitleText: this.vtitle
  	}
  },
  watch: {
  	vtitle (val) {
  	  this.vTitleText = val
  	}
  }
}
</script>
<style lang="scss" scoped>
.share-title-wrap{
	p{
		font-size: .42rem;
		color:#000;
	}
}
</style>