<template>
	<el-row :gutter="20">
		<el-col :span="6">
			<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
			  <div class="emptreewrap">
			    <el-tree :data="list" :highlight-current="true" node-key="id" :default-expanded-keys="[0]" :props="defaultProps" @getNode="getNode" @node-click="handleNodeClick"></el-tree>
			  </div>
			</div>
		</el-col>
		<el-col :span="18">
			<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
				<template v-for="item in processList">
					<approve-item :depid="depidDefault" :aitem="item" class="margintop20" @deletekit="deleteArea" @updatekit="updateArea" @closekit="closeArea" @savekit="saveArea"></approve-item>
				</template>
			</div>
		</el-col>
	</el-row>
</template>
<script>
import {getCgBarList} from '@/utils/common'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import approveItem from './approveItem'
export default {
  components: { approveItem },
  data () {
  	return {
  	  list: [],
      addAreaIsShow: process.env.addAreaIsShow,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      processList: [],
      parent: {},
      depidDefault: 0
  	}
  },
  watch: {
  	parent (val) {}
  },
  mounted () {
  	this.getProjectList()
  },
  methods: {
  	getProjectList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getDeptList',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {

  	  	  this.list = getCgBarList(result,'deptName','deptid','empCount','deptManagerEmpid','childDeptList')
          let children = this.list[0].children
          this.parent = children[0]
          this.depidDefault = children[0].pid
          this.getApproveList(children[0].pid)
  	  	}
  	  })
  	},
  	getNode (data) {},
  	handleNodeClick(data,node,d) {
      if (data.dp !== 'root') {
        this.depidDefault = data.pid
        this.parent = data
        this.getApproveList(data.pid)
      }
  	},
  	getAdd () {
  	  this.getApproveList()
  	},
    closeArea () {},
  	deleteArea () {
  	  this.getApproveList()
  	},
  	updateArea () {
  		this.getApproveList(this.depidDefault)
  	},
  	saveArea () {
  	  this.getApproveList(this.depidDefault)
  	},
  	getApproveList (depid) {
  		let nform = {
  	  	userid: getCache('userid'),
  	  	deptid: depid
  	  }
  	  this.$store.dispatch('getProcessArea',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.processList = result
  	  	}
  	  })
  	}
  }
}
</script>