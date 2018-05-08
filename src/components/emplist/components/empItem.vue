<template>
	<div class="pitem">
	    <template v-if="slideShow">
	        <el-checkbox v-model="checked" @change="getCheckItem"><i class="fa fa-user-circle-o"></i>{{eobj.empName}}</el-checkbox>
	    </template>
	    <template v-else>
	        <p @click="checkItem">
	            <i class="fa fa-user-circle-o"></i>{{eobj.empName}}
	        </p>
	    </template>
      <transition name="el-fade-in-linear">
        <span class="closewrap" v-show="closeShow" @click="removeDefault">
          <i class="fa fa-close"></i>
        </span>
      </transition>
    </div>
</template>
<script>
export default {
  props: {
  	empItem: {
  	  type: Object,
  	  default: {}
  	},
  	checkShow: {
  	  type: Boolean,
  	  default: false
  	},
    sempArray:{
      type: Array,
      default: []
    },
    isClose: {
      type: Boolean,
      default: false
    }
  },
  data () {
  	return {
  	  eobj: this.empItem,
  	  slideShow: this.checkShow,
  	  checked: false,
      empArray: this.sempArray,
      closeShow: true
  	}
  },
  watch: {
    empItem (val) {
      this.eobj = val
    },
    checkShow(val) {
      this.slideShow = val
    },
    sempArray (val) {
      this.empArray = val
      this.checkIsTrue()
    }
  },
  methods: {
    removeDefault () {
      this.$emit('removedkit',this.eobj)
    },
    checkIsTrue () {
      let _self = this
      let Flag = false
      this.empArray.forEach(function(element, index) {
        if (_self.eobj.empid === element.empid) {
          Flag = true
        }
      })
      this.checked = Flag
    },
  	getCheckItem (val) {
      this.$emit('scheckkit',this.eobj,val)
    },
    checkItem () {
      this.$emit('sempkit',this.eobj)
    },
  }
}
</script>