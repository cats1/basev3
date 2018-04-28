<template>
	<div class="boxshadow paddinglr30 paddingtb20" style="min-height:276px;">
		<line-chart :piedata="typeArray" id="rightline"></line-chart>
	</div>
</template>
<script>
import lineChart from '@/components/charts/lineChart'
export default {
  props: {
    ldata: {
      type: Array,
      default: []
    }
  },
  components: {lineChart},
  data () {
  	return {
  	  typeArray: []
  	}
  },
  watch: {
    ldata (val) {
      this.typeArray = val
    } 
  },
  mounted () {
  	this.typeArray = this.ldata
    console.log(process)
  }
}
</script>