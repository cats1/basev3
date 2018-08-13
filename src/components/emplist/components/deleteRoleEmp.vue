<template>
	<div class="btnsection">
		<el-button type="redline" @click="deleteEmp"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
    vemp: {
      type: Array,
      default: []
    },
    parent: null
  },
  data () {
  	return {
  	  form: {
        empids: [],
        rid: ''
      },
      sArray: this.vemp
  	}
  },
  watch: {
    parent (val) {
      this.form.rid = val.pid
    },
  	vemp (val) {
      this.sArray = val
      this.initEmp()
  	}
  },
  mounted () {
    this.initEmp()
  },
  methods: {
    initEmp () {
      this.form.rid = this.parent.pid
      let arrays = []
      this.sArray.forEach(function(element, index) {
        arrays.push(element.empid)
      })
      this.form.empids = arrays
    },
  	deleteEmp () {
      if (this.vemp.length === 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('selectEmpTip')
        })
      } else {
        this.$store.dispatch('delRoleEmp',this.form).then(res => {
          let {status} = res
          if (status === 0) {
            this.$emit('delekit')
          }
        })
      }
  	}
  }
}
</script>