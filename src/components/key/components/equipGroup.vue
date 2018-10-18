<template>
	<div class="boxshadow bgwhite paddinglr30 paddingtb20">
    <template v-if="!areaEquipShow">
      <el-button type="primary" @click="addGroup"><i class="fa fa-plus"></i>{{$t('key.addGroup')}}</el-button>
    </template>
		<template v-else>
      <el-button type="primary" @click="addGroup"><i class="fa fa-plus"></i>{{$t('addAreaGroup')}}</el-button>
    </template>
		<el-table class="margintop20" :data="list" border>
			<el-table-column prop="egname"
	        :label="$t('key.groupName')" ></el-table-column>
	    <el-table-column prop="egid"
	        :label="$t('key.groupId')"
	        width="180"></el-table-column>
	    <el-table-column prop="status"
	        :label="$t('key.groupStatus')">
	        	<template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	    </el-table-column>
	    <el-table-column
	        :label="$t('btn.edit1')" width="180">
	        <template slot-scope="scope">
	        	<el-button size="mini" type="text"
			          @click="handleEdit(scope.$index, scope.row)">{{$t('btn.editBtn')}}</el-button>
			      <el-button size="mini" type="danger"
			          @click="handleDelete(scope.$index, scope.row)">{{$t('btn.deleteBtn')}}</el-button>
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
  	  list: [],
      areaEquipShow: process.env.areaEquipShow || false
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
      this.$store.commit('SET_GROUP','')
  	  this.$router.push({name:'detail'})
  	},
  	handleEdit (index,row) {
  	  this.$store.commit('SET_GROUP',row)
  	  this.$router.push({name:'detail',params: { egid: 123 }})
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