<template>
	<div>
		<!-- <el-input v-model="sname" @change="doSearch" @clear="doClear" clearable>
		  <i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input> -->
		<el-table ref="multipleTable" :data="slist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
	        <el-table-column
	            type="selection"
	            width="55">
	        </el-table-column>
	        <el-table-column prop="egname"
	        :label="$t('key.groupName')" ></el-table-column>
	        <el-table-column :label="$t('status.startText')" >
	            <template slot-scope="scope">
	        		{{scope.row.status | groupStatusText}}
	        	</template>
	        </el-table-column>
        </el-table>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import { groupStatusText } from '@/utils/common'
export default {
  props: ['eid'],
  data () {
  	return {
  	  sname: '',
  	  list: [],
  	  slist: [],
  	  sarray: [],
  	  searchArray: [],
  	  stype: 0
  	}
  },
  mounted () {
  	this.getGroupList()
  },
  filters: {
  	groupStatusText: groupStatusText
  },
  methods: {
  	doClear () {
  	  this.slist = this.list
  	  this.stype = 0
  	},
  	doSearch (val) {
      let _self = this
      let sData = []      
      this.list.forEach(function(ele,index){
        if (ele.egname === val) {
          sData.push(ele)
        }
      })
      if (val === '') {
      	this.stype = 0
        this.slist = this.list
      } else {
      	this.stype = 1
      	this.slist = sData
      }
      this.getSelect()
  	},
  	getSelect (result) {
  	  let _self = this
      let sData = []
      this.slist.forEach(function(ele,index){
        _self.sarray.forEach(function(sele,sindex){
          if (sele.egid === ele.egid) {
            sData.push(ele)
          }
        })
      })
      this.toggleSelection(sData)
  	},
  	getInitSelect (result) {
  	  let _self = this
      let sData = []
      this.list.forEach(function(ele,index){
        result.forEach(function(sele,sindex){
          if (sele.egid === ele.egid) {
            sData.push(ele)
          }
        })
      })
      this.$emit('skit',sData)
      this.toggleSelection(sData)
  	},
  	handleSelectionChange (val) {
  	  if (this.stype === 0) {
  	  	this.sarray = val
  	  } else {

  	  }
  	  this.sarray = val
  	  this.$emit('skit',val)
  	},
  	toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
  	getGroupList () {
  	  let newForm = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getEquipmentGroupByUserid',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result
          this.slist = result
          this.getEGroupByEid()
  	  	}
  	  })
  	},
  	getEGroupByEid () {
  	  let newForm = {
  	  	userid: getCache('userid'),
  	  	eid: this.eid
  	  }
  	  this.$store.dispatch('getEGroupByEid',newForm).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.sarray = result
          this.getInitSelect(result)
  	  	}
  	  })
  	}
  }
}
</script>