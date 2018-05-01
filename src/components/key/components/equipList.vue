<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-button type="primary" @click="addEquip">{{$t('key.addEquip')}}</el-button>
		<el-table class="margintop20" :data="list" border>
			<el-table-column prop="deviceName"
	        :label="$t('key.equipeName')" ></el-table-column>
	    <el-table-column prop="deviceCode"
	        :label="$t('key.equipeName')"
	        width="180"></el-table-column>
	    <el-table-column prop="status"
	        :label="$t('status.text')">
	        <template slot-scope="scope">
	        	{{scope.row.status | groupStatusText}}
	        </template>
	      </el-table-column>
	    <el-table-column :label="$t('btn.edit1')" width="180">
	        <template slot-scope="scope">
	        	<el-button size="mini" type="text"
			        @click="handleEdit(scope.$index, scope.row)">{{$t('btn.updateBtn')}}
            </el-button>
			      <el-button size="mini" type="danger"
			        @click="handleDelete(scope.$index, scope.row)">{{$t('btn.deleteBtn')}}
            </el-button>
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
  	addEquip () {
  	  this.$router.push({path:'listd'})
  	},
  	handleEdit (index,row) {
  	  this.$store.commit('SET_GROUP',row)
  	  this.$router.push({name:'listd',params: {
  	  	eid: row.eid
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