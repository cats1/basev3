<template>
	<div>
		<el-tree :data="list" :props="defaultProps" :highlight-current="true" :check-on-click-node="true" node-key="pid" accordion :default-expanded-keys="defaultGet" :default-checked-keys="defaultGet"  @getNode="getNode" @node-click="handleNodeClick"></el-tree><!-- :default-expanded-keys="defaultGet" :default-checked-keys="defaultChecked" -->
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
      rlist: this.list,
      defaultGet: this.dexpanded,
      defaultProps: this.dprops,
      defaultChecked: this.expandedid == 0 ? [] : this.dexpanded,
      curexpandedid: 0
    }
  },
  watch: {
  	list (val) {
  	  this.getInit()
  	},
  	dexpanded (val) {
  	  this.defaultGet = val
  	},
  	dprops (val) {
  	  this.defaultProps = val
  	},
  	expandedid (val) {
  	  if (val == 0) {
  	  	let rid = this.list[0].pid
  	  	this.defaultChecked = [rid]
  	  } else {
  	  	this.defaultChecked = this.dexpanded
  	  }
  	}
  },
  mounted () {},
  methods: {
  	getInit () {
  	  if (this.dexpanded[0] == 0) {
  		let pid = this.list[0].pid
  		this.defaultGet = [pid]
  		this.defaultChecked = [pid]
  	  }
  	},
  	getNode (data) {},
  	handleNodeClick (data,node,d) {
  	  this.$emit('nodeclick',data,node)
  	}
  }
}
</script>