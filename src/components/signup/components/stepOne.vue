<template>
	<div class="guide-steps-one">
		<strong>{{num}}</strong>/<strong>{{total}}</strong>
	</div>
</template>
<script>
export default {
  props: ['total','num'],
  data () {
  	return {}
  }
}
</script>
<style lang="scss" scoped>
$bgimg: '@/assets/img/dr.png';
.guide-steps-one{
	background: url('../../../assets/img/dr.png') no-repeat right;
	width: 86px;
    height: 70px;
    color: #fff;
    font-size: 20px;
    padding: 10px 0 0 0;
    strong{
    	font-weight:300;
    }
}
</style>