<template>
	<div class="btnsection">
		<el-button @click="getExport" :type="bType"><i class="fa fa-address-book-o"></i>{{$t('btn.exportListBtn')}}</el-button>
	</div>
</template>
<script>
export default {
  props: {
    btnType: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
      bType: 'default'
    }
  },
  watch: {
    btnType (val) {
      if (val === 0) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  mounted () {
    if (this.btnType === 0) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
  	getExport () {
  	  this.$emit('exportkit',0)
  	}
  }
}
</script>
