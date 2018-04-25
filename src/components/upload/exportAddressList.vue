<template>
	<div class="btnsection">
		<el-button @click="getExport"><i class="fa fa-address-book-o"></i>{{$t('btn.exportListBtn')}}</el-button>
	</div>
</template>
<script>
export default {
  data () {
  	return {}
  },
  methods: {
  	getExport () {
  	  this.$emit('exportkit')
  	}
  }
}
</script>
