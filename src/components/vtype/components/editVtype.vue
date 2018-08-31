<template>
	<div class="btnsection">
		<el-button :type="bthType" @click="doUpdate"><i class="fa fa-user-plus"></i>{{$t('editVtype')}}</el-button>
		<vtype-win :edit-obj="form" :edit-type="etype" :is-show="dialogVisible" @wclose="handleClose"></vtype-win>
	</div>
</template>
<script>
import vtypeWin from './vtypeWin'
import { getCache } from '@/utils/auth'
import { isEmptyObject } from '@/utils/common'
export default {
  props: {
  	sendData: {
  	  type: Object,
  	  default: function () {
  	  	return {}
  	  }
  	}
  },
  components: {vtypeWin},
  data () {
  	return {
  	  dialogVisible: false,
  	  etype: 1,
  	  form: this.sendData,
  	  bthType: ''
  	}
  },
  watch: {
  	sendData (val) {
  	  this.form = val
  	}
  },
  mounted () {},
  methods: {
  	doUpdate () {
      if (this.sendData.dp == 'root'|| isEmptyObject(this.sendData)) {
        this.$message({
          showClose: true,
          message: this.$t('pleaseSelectVtype'),
          type: 'warning'
        })
      } else {
        this.bthType = 'primary'
        this.dialogVisible = true
      }
  	},
  	handleClose () {
  	  this.bthType = ''
  	  this.dialogVisible = false
  	  this.$emit('done',this.etype)
  	}
  }
}
</script>