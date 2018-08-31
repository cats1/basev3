<template>
	<div class="btnsection">
		<el-button type="success" @click="doExport"><i class="fa fa-file-excel-o"></i>{{$t('exportEmpList')}}</el-button>
	</div>
</template>
<script>
import {exportEmpDoc} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  data () {
  	return {}
  },
  methods: {
  	doExport () {
      let params = '?userid=' + getCache('userid') + '&token=' + getCache('token')
      exportEmpDoc(params)
  	}
  }
}
</script>