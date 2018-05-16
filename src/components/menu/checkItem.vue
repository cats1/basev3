<template>
	<div class="lrmenu-check-item">
        <template v-if="checkValue">
          <p class="lrmenu-item" >    
            <el-checkbox :label="item.label" v-model="check" @change="selectItem"><img :src="logo" alt="">{{item.empName}}</el-checkbox>
          </p>
        </template>
        <template v-else>
          <p class="lrmenu-item" :class="{'nopointer': check}" @click="selectItem">
            <img :src="logo" alt="">{{item.empName}}
          </p>
        </template>
    </div>
</template>
<script>
export default {
  props: {
    checkValue: {
      type: Boolean,
      default: true
    },
    checkNum: {
      type: Number,
      default: 0
    },
    empObj: null,
    index: null,
    checkArray: {
      type: Array,
      default: []
    }
  },
  data () {
  	return {
  	  item: this.empObj,
      check: false,
  	  logo: require('@/assets/img/spot.png')
  	}
  },
  watch: {
    checkValue (val) {},
    checkNum (val) {},
    empObj (val) {
      this.item = val
      this.getIsCheck()
    },
    checkArray (val) {
      this.getIsCheck()
    }
  },
  mounted () {
  	this.getIsCheck()
  },
  methods: {
  	getIsCheck () {
  	  let _self = this
      let sFlag = false
      this.checkArray.forEach(function(element, index) {
        if (element.empid === _self.item.empid) {
          sFlag = true
        }
      })
      this.check = sFlag
  	},
  	selectItem (val) {
  	  this.$emit('click',this.check,this.index,this.item)
  	}
  }
}
</script>
<style lang="scss" scoped></style>