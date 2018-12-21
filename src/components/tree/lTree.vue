<template>
	<div class="lft-tree-wrap" >
		<el-tree :data="list" :highlight-current="true" :check-on-click-node="true" node-key="id" accordion :default-expanded-keys="defaultGet" :default-checked-keys="defaultChecked" :props="defaultProps" @getNode="getNode" @node-click="handleNodeClick"></el-tree>
	</div>
</template>
<script>
export default {
  props: {
  	list: {
  	  type: Array,
  	  default: function () {
  	  	return []
  	  }
  	},
  	dprops: {
  	  type: Object,
  	  default: function () {
  	  	return {}
  	  }
  	},
  	dexpanded: {
  	  type: Array,
  	  default: function () {
  	  	return [0]
  	  }
  	},
  	expandedid: {
  	  type: Number,
  	  default: 0
  	}
  },
  data () {
    return {
      defaultGet: this.dexpanded,
      defaultProps: this.dprops,
      defaultChecked: this.expandedid == 0 ? [] : this.dexpanded
    }
  },
  watch: {
  	dexpanded (val) {
  	  this.defaultGet = val
  	},
  	dprops (val) {
  	  this.defaultProps = val
  	},
  	expandedid (val) {
  	  if (val == 0) {
  	  	this.defaultChecked = []
  	  } else {
  	  	this.defaultChecked = this.dexpanded
  	  }
  	}
  },
  methods: {
  	getNode (data) {},
  	handleNodeClick (data,node,d) {
  	  this.$emit('nodeclick',data,node)
  	}
  }
}
</script>