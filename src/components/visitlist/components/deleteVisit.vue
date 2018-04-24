<template>
	<div class="btnsection">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: ['drids'],
  data () {
  	return {
  	  dform: {
  	  	userid: getCache('userid'),
  	  	rids: []
  	  }
  	}
  },
  watch: {
  	drids (val) {
  	  this.dform.rids = val
  	}
  },
  mounted () {
  	console.log(this.drids)
  },
  methods: {
  	deleteEmp () {
      this.$store.dispatch('delResidentVisitor',this.dform).then(res => {
      	let {status} = res
      	if (status === 0) {
          this.$emit('senddkit')
      	}
      })
  	}
  }
}
</script>