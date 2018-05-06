<template>
  <div class="boxshadow margintop20 paddingtb20 paddinglr30">
  	<h3>编辑专用账号</h3>
  	<template v-if="step === 0">
  	  <special-one @nextkit="getNext"></special-one>
  	</template>
  	<template v-if="step === 1">
  	  <special-two></special-two>
  	</template>
  </div>
</template>
<script>
import specialOne from './specialOne'
import specialTwo from './specialTwo'
import {getCache} from '@/utils/auth'
export default {
  props: {},
  components: {specialOne,specialTwo},
  data () {
  	return {
  	  dialogVisible: false,
      step: 0
  	}
  },
  watch: {},
  mounted () {},
  methods: {
    addEmp () {
      this.$emit('addkit',3)
    },
    getNext (val) {
      this.step = val
    }
  }
}
</script>