<template>
	<div class="btnsection">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: ['semp'],
  data () {
  	return {
  	  deform: {
        empids: [],
        userid: getCache('userid')
      },
  	}
  },
  watch: {
  	semp (val) {
      let arrays = []
      val.forEach(function(element, index) {
        arrays.push(element.empid)
      })
      this.deform.empids = arrays
  	}
  },
  mounted () {},
  methods: {
  	deleteEmp () {
      if (this.deform.empids.length > 0) {
        this.$store.dispatch('batchDelEmployee',this.deform).then(res => {
          let {status} = res
          if (status === 0) {
            this.$emit('delekit')
          }
        })
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('selectEmpTip')
        })
      }
  	}
  }
}
</script>