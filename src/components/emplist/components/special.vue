<template>
  <div class="boxshadow margintop20 paddingtb20 paddinglr30">
  	<h3>编辑专用账号</h3>
    <ul class="processlist">
      <li :class="{'active': step === 0}">1、关联拜访事由</li>
      <li :class="{'active': step === 1}">2、选择员工</li>  
      <li :class="{'active': step === 2}">3、选择抄送</li>
    </ul>
  	<template v-if="step === 0">
  	  <special-one :vtype="visitType" @nextkit="getNext"></special-one>
  	</template>
  	<template v-else-if="step === 1">
  	  <special-two :eArray="slist" :vtype="visitType" @removekit="getRemove" @prevkit="getTwoPrev" @nextkit="getTwoNext"></special-two>
  	</template>
    <template v-else-if="step === 2">
      <special-three :eArray="slist" :vtype="visitType" @prevkit="getThreePrev" @nextkit="getThreeNext"></special-three>
    </template>
  </div>
</template>
<script>
import specialOne from './specialOne'
import specialTwo from './specialTwo'
import specialThree from './specialThree'
import {getCache} from '@/utils/auth'
export default {
  props: {
    slist: {
      type: Array,
      default: []
    }
  },
  components: {specialOne,specialTwo,specialThree},
  data () {
  	return {
  	  dialogVisible: false,
      step: 0,
      visitType: ''
  	}
  },
  watch: {
    slist (val) {
      console.log(val)
    },
  },
  mounted () {},
  methods: {
    addEmp () {
      this.$emit('addkit',3)
    },
    getNext (val,type) {
      this.step = val
      this.visitType = type
      this.$emit('onekit',3)
    },
    getTwoNext (val,type) {
      this.step = val
      this.visitType = type
      this.$emit('twokit')
    },
    getThreeNext (val,type) {
      this.step = val
      this.visitType = type
      this.$emit('donekit')
    },
    getRemove (val,item) {
      this.$emit('removekit',item,val)
    },
    getTwoPrev (val,type) {
      this.step = val
      this.visitType = type
    },
    getThreePrev (val,type) {
      this.step = val
      this.visitType = type
    }
  }
}
</script>