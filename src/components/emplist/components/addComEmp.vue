<template>
  <div class="btnsection">
  	<el-button :type="bType" @click="addEmp"><i class="fa fa-user-plus"></i>{{$t('btn.addEmpBtn')}}</el-button>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
    btnType: {
      type: Number,
      default: 1
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default'
  	}
  },
  watch: {
    btnType (val) {
      if (val === 1) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  mounted () {
    if (this.btnType === 1) {
      this.bType = 'primary'
    } else {
        this.bType = 'default'
      }
  },
  methods: {
    addEmp () {
      this.$emit('addkit',1)
    }
  }
}
</script>