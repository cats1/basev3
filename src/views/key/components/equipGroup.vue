<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-button type="primary" @click="addGroup">添加设备组</el-button>
		<el-table :data="list" border>
			<el-table-column prop="egname"
	        label="组名称" ></el-table-column>
	        <el-table-column prop="egid"
	        label="组编号"
	        width="180"></el-table-column>
	        <el-table-column prop="status"
	        label="授权后默认开启">
	        	<template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	        </el-table-column>
	        <el-table-column
	        label="操作选项" width="180">
	        	<template slot-scope="scope">
	        		<el-button
			          size="mini" type="text"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	        	</template>
	        </el-table-column>
		</el-table>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import { groupStatusText } from '@/utils/common'
export default {
  data () {
  	return {
  	  list: []
  	}
  },
  created () {
  	this.getGroupList()
  },
  filters: {
  	groupStatusText: groupStatusText
  },
  methods: {
  	init () {},
  	getGroupList () {
  	  let newForm = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getEquipmentGroupByUserid',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result
  	  	}
  	  })
  	},
  	addGroup () {
  	  this.$router.push({path:'detail'})
  	},
  	handleEdit (index,row) {
  	  this.$store.commit('SET_GROUP',row)
  	  console.log(this.$store)
  	  this.$router.push({path:'detail',params: {
  	  	type: 'update'
  	  }})
  	},
  	handleDelete (index,row) {
  	  let newForm = {
  	  	egid: row.egid
  	  }
  	  this.$store.dispatch('delEquipmentGroup',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.getGroupList()
  	  	}
  	  })
  	}
  }
}
</script>