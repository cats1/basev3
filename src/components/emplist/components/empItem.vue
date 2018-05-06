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
  	}
  },
  data () {
  	return {
  	  eobj: this.empItem,
  	  slideShow: this.checkShow,
  	  checked: false
  	}
  },
  watch: {
    empItem (val) {
      this.eobj = val
    },
    checkShow(val) {
      this.slideShow = val
    }
  },
  methods: {
  	getCheckItem (val) {
      this.$emit('scheckkit',this.eobj,val)
    },
    checkItem () {
      this.$emit('sempkit',this.eobj)
    },
  }
}
</script>