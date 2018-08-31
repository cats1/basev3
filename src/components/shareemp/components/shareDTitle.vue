<template>
	<div class="share-dtitle-wrap">
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
.share-dtitle-wrap{
  p{
    color: #1660ac;
    font-size:.28rem;
    line-height: .38rem;
  }
}
</style>