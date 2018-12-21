<template>
	<div class="boxshadow paddinglr30 paddingtb20" style="min-height:276px;">
		<line-chart :piedata="typeArray" id="rightline"></line-chart>
	</div>
</template>
<script>
import lineChart from '@/components/charts/lineChart'
export default {
  props: {
    ldata: null
  },
  components: {lineChart},
  data () {
  	return {
  	  typeArray: []
  	}
  },
  watch: {
    ldata (val) {
      if (val.constructor == Array) {
        this.typeArray = val
      } else {
        this.typeArray = val.list
      }
    } 
  },
  mounted () {
  	if (this.ldata.constructor == Array) {
        this.typeArray = this.ldata
      } else {
        this.typeArray = this.ldata.list
      }
  }
}
</script>