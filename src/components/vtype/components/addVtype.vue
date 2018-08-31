<template>
	<div class="btnsection">
		<el-button :type="bthType" @click="doAdd"><i class="fa fa-user-plus"></i>{{$t('addVtype')}}</el-button>
		<vtype-win :edit-obj="form" :edit-type="etype" :is-show="dialogVisible" @wclose="doClose"></vtype-win>
	</div>
</template>
<script>
import vtypeWin from './vtypeWin'
import { getCache } from '@/utils/auth'
export default {
  components: {vtypeWin},
  data () {
  	return {
  	  dialogVisible: false,
  	  etype: 0,
  	  form: {},
  	  bthType: ''
  	}
  },
  mounted () {},
  methods: {
  	doAdd () {
  	  this.bthType = 'primary'
  	  this.dialogVisible = true
  	},
  	doClose () {
  	  this.bthType = ''
  	  this.dialogVisible = false
  	  this.$emit('done',this.etype)
  	}
  }
}
</script>