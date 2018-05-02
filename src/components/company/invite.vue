<template>
	<div>
		<h3 class="marginbom20">{{$t('empnav[0].name')}}
		<small class="marginlr20">{{$t('moban.ctitle')}}</small></h3>
		<div class="boxshadow paddinglr30 paddingtb20">
		  <h3>{{$t('moban.cdesc')}}</h3>
		  <company-moban :isshow="isshow" class="margintop20"></company-moban>
		</div>
	</div>
</template>
<script>
import companyMoban from './companyMoban'
export default {
  components: { companyMoban },
  data () {
  	return {
  	  isshow: true
  	}
  }
}
</script>