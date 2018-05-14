<template>
	<div class="boxshadow margintop20 paddinglr30 paddingtb20">
		<h3 class="marginbom20 margintop20">{{$t('record')}}{{total}}{{$t('record1')}}{{$t('record2')}}
		  <template v-show="data.length > 0">
		  	<export-set :extend-show="extendShow" style="float:right;" :vtype="vtype" :nform="nform"></export-set>
		  </template>
		</h3>
		<el-table :data="list" border>
			<el-table-column align="center"
		        prop="vname"
		        :label="$t('form.name.text1')">
		        <template slot-scope="scope">
		        	<div class="vphotowrap">
		        		<span class="vphoto"><img :src="scope.row.vphoto" alt=""></span>
			            <span class="vname">{{scope.row.vname}}</span>
		        	</div> 
			    </template>
		    </el-table-column>
		    <el-table-column align="center"
		        prop="vphone"
		        :label="$t('form.phone.text1')" width="120">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="empName"
		        :label="$t('form.name.text2')">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="empPhone"
		        :label="$t('form.phone.text2')" width="120">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="visitType"
		        :label="$t('checkVtype[3]')">
		    </el-table-column>
		    <template v-show="extendShow">
		    	<template v-for="extend in extendArray">
		    		<el-table-column align="center"
			        prop="signInGate"
			        :label="$t('notice.doorset.signinDoor')"
			        width="180" v-if="extend.fieldName === 'gatein'">
			        </el-table-column>
			        <el-table-column align="center"
			        prop="signOutGate"
			        :label="$t('notice.doorset.signoutDoor')"
			        width="180" v-else-if="extend.fieldName === 'gateout'">
			        </el-table-column>
			        <el-table-column align="center"
			        prop="signInOpName"
			        :label="$t('notice.doorset.signinGuard')"
			        width="180" v-else-if="extend.fieldName === 'guardin'">
			        </el-table-column>
			        <el-table-column align="center"
			        prop="signOutOpName"
			        :label="$t('notice.doorset.signoutGuard')"
			        width="180" v-else-if="extend.fieldName === 'guardout'">
			        </el-table-column>
		    	</template>
		    </template>
		    <el-table-column align="center"
		        prop="vcompany"
		        :label="$t('form.companypro.text2')"
		        width="180">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="cardId"
		        :label="$t('form.idnum.text1')"
		        width="180">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="vphoto"
		        :label="$t('form.idnum.text2')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.vphoto | setVphoto}}
			    </template>
		    </el-table-column>
		    <el-table-column align="center"
		        prop="peopleCount"
		        :label="$t('form.count.text')" >
		        <template slot-scope="scope">
			        {{scope.row.peopleCount === 0? 1: scope.row.peopleCount}}
			    </template>
		    </el-table-column>
		    <el-table-column align="center"
		        prop="memberName"
		        :label="$t('form.count.text1')"
		        width="180">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="remark"
		        :label="$t('form.remark.text')"
		        width="180">
		    </el-table-column>
		    <el-table-column align="center"
		        prop="visitdate"
		        :label="$t('form.time.text')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.visitdate | formatDate}}
			    </template>
		    </el-table-column>
		    <el-table-column align="center"
		        prop="signOutDate"
		        :label="$t('form.time.text1')"
		        width="180">
		        <template slot-scope="scope">
			        {{scope.row.signOutDate | formatDate}}
			    </template>
		    </el-table-column>
		</el-table>
		<div class="marginbom20 margintop20">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="current"
		      :page-sizes="size"
		      :page-size="page"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {formatDate} from '@/utils/index'
import exportSet from './exportSet'
export default {
  components: {exportSet},
  props: {
  	vdata: {
  	  type: Array,
  	  default: []
  	},
  	vtype: {
  	  type: Number,
  	  default: 0
  	},
  	nform: {
  	  type: Object,
  	  default: {}
  	}
  },
  data () {
  	return {
  	  data: [],
  	  list: [],
  	  size: [10, 20, 30, 40],
  	  page: 10,
  	  total: 0,
  	  current: 1,
  	  extendShow: false,
  	  extendArray: []
  	}
  },
  filters:{
  	formatDate (time) {
  	  if (time) {
  	  	let date = new Date(time)
  	    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  	  }
  	},
  	setVphoto (url) {}
  },
  watch: {
  	vdata (val) {
  	  this.data = this.vdata
  	  this.total = this.vdata.length
  	  this.setPage()
  	}
  },
  mounted () {
  	this.GetExtendVisitor()
  	this.data = this.vdata
  	this.setPage()
  },
  methods: {
  	handleSizeChange(val) {
      this.page = val
      this.setPage()
    },
    handleCurrentChange(val) {
      this.current = val
      this.setPage()
    },
    setPage () {
      let start = (this.current-1) * this.page
      let end = (this.current-1) * this.page + this.page
      this.list = this.data.slice(start,end)
    },
    GetExtendVisitor () {
      let nform = {
      	userid: getCache('userid')
      }
      this.$store.dispatch('GetExtendVisitor',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let local_fieldname_arr = ['name', 'visitType', 'empid', 'phone']
          let local_add_arr = ['email', 'vcompany']
          let extendArray = []
          for (let i=0;i<result.length;i++) {
          	if ($.inArray(result[i].fieldName, local_fieldname_arr) == -1) {
                if ($.inArray(result[i].fieldName, local_add_arr) == -1) {
                    extendArray.push(result[i])
                }
            }
          }
          this.extendArray = extendArray
        }
      })
    },
    exportSet () {}
  }
}
</script>