<template>
  <div class="btnsection">
  	<el-button :type="bType" @click="addEmp"><i class="fa fa-user-secret"></i>{{$t('btn.editSpecial')}}</el-button>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
    btnType: {
      type: Number,
      default: 3
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
      if (val === 3) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    }
  },
  mounted () {
    if (this.btnType === 3) {
      this.bType = 'primary'
    } else {
        this.bType = 'default'
      }
  },
  methods: {
    addEmp () {
      this.$emit('addkit',3)
    }
  }
}
</script>