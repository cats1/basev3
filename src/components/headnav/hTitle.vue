<template>
	<div class="htitltwrap">
		<span class="htitle-icon">////</span><slot></slot><span class="htitle-icon">////</span>
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
.htitltwrap{
	background:#545c64;
	text-align: center;
    margin-bottom: 15px;
    font-size: 24px;
    color: #fff;
    .htitle-icon{
	    font-weight: lighter;
	    line-height: 40px;
	    &:first-child{
	    	margin-right:5px;
	    }
	    &:last-child{
	    	margin-left:5px;
	    }
    }
}
</style>