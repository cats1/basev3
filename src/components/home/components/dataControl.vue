<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<data-left :sindex="startIndex" :scount="requestedCount" class="bgwhite" @getvlist="getList" @getesl="getEsl" @getextend="getExtend" ></data-left>
			</el-col>
			<el-col :span="16">
				<data-right class="bgwhite" :ldata="vlist"></data-right>
			</el-col>
		</el-row>
		<el-row>
			<data-bottom class="bgwhite" :vdata="vlist" :extend-item-array="extendItemArray" :extend-array="extendArray" :vtype="vtype" :nform="nform" @eslpage="setEslPage" @eslcurrent="setEslCurrent"></data-bottom>
		</el-row>
	</div>
</template>
<script>
import dataLeft from './dataLeft'
import dataRight from './dataRight'
import dataBottom from './dataBottom'
export default {
  components: {dataLeft,dataRight,dataBottom},
  data () {
  	return {
  	  vlist: [],
  	  dataArray: [],
  	  vtype: 0,
  	  nform: {},
      eslform: [],
      startIndex: 1,
      requestedCount: 10,
      extendItemArray:[],
      extendArray:[]
  	}
  },
  watch: {
    vlist (val) {}
  },
  methods: {
    getExtend (exArray) {
      this.extendArray = exArray
    },
  	getList (val,type,nform,eArray) {
      this.vlist = val
      this.vtype = type
      this.nform = nform
      this.extendItemArray = eArray
      
  	},
    getEsl (val,type,nform) {
      this.vlist = val
      this.vtype = type
      this.nform = nform
    },
    setEslPage (val) {
      this.requestedCount = val
    },
    setEslCurrent (val) {
      this.startIndex = val
    }
  }
}
</script>