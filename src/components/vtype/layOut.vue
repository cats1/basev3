<template>
	<div class="marginbom20">
		<div class="boxshadow paddinglr30 paddingtb20 block bgwhite">
			<add-vtype @done="doneEdit"></add-vtype>
			<edit-vtype :send-data="curVtype" @done="doneEdit"></edit-vtype>
			<!-- <add-member></add-member>
			<delete-vtype></delete-vtype> -->
		</div>
		<el-row :gutter="20">
	  	  <el-col :span="6" >
	  	  	<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
	  	  		<div class="roletreewrap">
            <el-tree :data="list" :props="defaultProps" :highlight-current="true" :check-on-click-node="true" node-key="id" :default-expanded-keys="defaultGet" :default-checked-keys="defaultGet" accordion @node-click="handleNodeClick"></el-tree>
			    </div>
	  	  	</div>
	  	  </el-col>
	  	  <el-col :span="18" >
	  	  	<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
	  	  		敬请期待！
	  	  	</div>
	  	  </el-col>
	  	</el-row>
	</div>
</template>
<script>
import {deleteVtype,addMember,editVtype,addVtype} from './components'
import { getCache } from '@/utils/auth'
import {getVisitList} from '@/utils/common'
export default {
  components: {deleteVtype,addMember,editVtype,addVtype},
  data () {
  	return {
  	  list: [],
  	  total: 0,
  	  defaultGet: [0],
  	  expandedid: 0,
  	  defaultProps: {
        children: 'children',
        label: 'label'
      },
      curVtype: {}
  	}
  },
  mounted () {
  	this.getTypeList()
  },
  methods: {
  	getTypeList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getVisitorType',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = getVisitList(result,'vType','tid')
  	  	}
  	  })
  	},
  	handleNodeClick (data) {
      this.curVtype = data
    },
    doneEdit (type) {
      if (type == 0) {
        this.getTypeList()
      } else if (type == 1) {
        this.getTypeList()
      }
    }
  }
}
</script>