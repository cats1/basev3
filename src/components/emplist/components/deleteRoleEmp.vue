<template>
	<div class="btnsection">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: ['semp','parent'],
  data () {
  	return {
  	  form: {
        empids: [],
        rid: ''
      },
  	}
  },
  watch: {
    parent (val) {
      this.form.rid = val.pid
    },
  	semp (val) {
      let arrays = []
      val.forEach(function(element, index) {
        arrays.push(element.empid)
      })
      this.form.empids = arrays
  	}
  },
  mounted () {
  	console.log(this.semp)
  },
  methods: {
  	deleteEmp () {
      this.$store.dispatch('delRoleEmp',this.form).then(res => {
          let {status} = res
          if (status === 0) {
            this.$emit('delekit')
          }
      })
  	}
  }
}
</script>