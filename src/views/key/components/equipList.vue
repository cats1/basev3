<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-button type="primary" @click="addGroup">添加设备</el-button>
		<el-table :data="list" border>
			<el-table-column prop="deviceName"
	        label="设备名称" ></el-table-column>
	        <el-table-column prop="deviceCode"
	        label="设备标识"
	        width="180"></el-table-column>
	        <el-table-column prop="status"
	        label="状态">
	        	<template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	        </el-table-column>
	        <el-table-column
	        label="操作选项" width="180">
	        	<template slot-scope="scope">
	        		<el-button
			          size="mini" type="text"
			          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
  	  this.$store.dispatch('getEquipmentbyUserid',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result
  	  	}
  	  })
  	},
  	addGroup () {
  	  this.$router.push({path:'listd'})
  	},
  	handleEdit (index,row) {
  	  this.$store.commit('SET_GROUP',row)
  	  this.$router.push({path:'listd',params: {
  	  	type: 'update'
  	  }})
  	},
  	handleDelete (index,row) {
  	  let newForm = {
  	  	eid: row.eid
  	  }
  	  this.$store.dispatch('delEquipment',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.getGroupList()
  	  	}
  	  })
  	}
  }
}
</script>