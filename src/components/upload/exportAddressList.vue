<template>
	<div class="btnsection">
		<el-button @click="getExport" :type="bType"><i class="fa fa-address-book-o"></i>{{$t('btn.exportListBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
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
      let subAccount = parseInt(getCache('subAccount')) || 0
      let val = subAccount === 0 ? 2 : 0
  	  this.$emit('exportkit',val)
  	}
  }
}
</script>
