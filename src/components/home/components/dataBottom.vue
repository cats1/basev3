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
		        		<span class="vphoto">
		        			<img :src="scope.row.vphoto" alt="" @click="setResPhotoUrl(scope.row.vphoto)">
		        		</span>
			            <span class="vname">{{scope.row.vname}}</span>
		        	</div> 
			    </template>
		    </el-table-column>
		    <template v-if="vTypeShow">
		    	<el-table-column align="center"
			        prop="vType"
			        :label="$t('visitTypeText')" width="120">
			    </el-table-column>
		    </template>
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
		    <template v-if="areaEquipShow">
		      <el-table-column align="center"
		        prop="area"
		        :label="$t('visitArea')">
		      </el-table-column>
		      <el-table-column align="center"
		        prop="rfid"
		        label="RFID">
		      </el-table-column>
		      <el-table-column align="center"
		        prop="rfid"
		        :label="$t('certType')">
		        <template slot-scope="scope">
		        	{{judgeCertType(scope.row.certType)}}
		        </template>
		      </el-table-column>
		      <el-table-column align="center"
		        prop="belongings"
		        :label="$t('carrytools')">
		      </el-table-column>
		      <el-table-column align="center"
		        prop="projectName"
		        :label="$t('project.proname')">
		      </el-table-column>
		      <el-table-column align="center" :label="$t('filePhoto')" width="200">
		        <template slot-scope="scope">
		        	<template v-if="scope.row.resPhoto == 0">
		        		{{scope.row.resPhoto}}
		        	</template>
		        	<template v-else>
		        		<template v-if="scope.row.resPhoto">
		        			<template v-for="item in stringToArray(scope.row.resPhoto)">
		        			  <img class="showPhotoPic" :src="item" alt="" @click="setResPhotoUrl(item)">
		        		    </template>
		        		</template>
		        	</template>
		        </template>
		      </el-table-column>
		    </template>
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
		    <template v-if="!areaEquipShow">
		    </template>
		    <template v-if="!dataError">
		    	<template v-if="!areaEquipShow">
		    		<el-table-column align="center"
			        prop="vphoto"
			        :label="$t('form.idnum.text2')"
			        width="180">
				        <template slot-scope="scope">
					        <img :src="setVphoto(scope.row.cardId)" alt="" @click="setShowUrl(scope.row)">
					    </template>
			        </el-table-column>
		        </template>		    	
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
		    </template>
		    <el-table-column align="center"
		        prop="remark"
		        :label="$t('form.remark.text')"
		        width="180">
		    </el-table-column>
		    <template v-if="!dataError">
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
		    </template>
		    <template v-else>
			    <el-table-column align="center"
			        prop="visitdate"
			        :label="$t('form.time.text')"
			        width="180">
			        <template slot-scope="scope">
				        {{scope.row.visitdate | formatDate}}
				    </template>
			    </el-table-column>
			    <el-table-column align="center"
			        prop="leaveTime"
			        :label="$t('endVisitTime')"
			        width="180">
			        <template slot-scope="scope">
				        {{scope.row.leaveTime | formatDate}}
				    </template>
			    </el-table-column>
		    </template>
		    <template v-if="signPdfShow">
		    	<el-table-column align="center"
		        :label="$t('Signprotocol')"
		        width="180" >
			        <template slot-scope="scope">
				        <el-button type="primary" v-show="scope.row.signPdf === 1" @click="downloadPDF(scope.row)">{{$t('downloadprotocol')}}</el-button>
				    </template>
		        </el-table-column>
		    </template>
		    <template v-if="dataError">
		    	<el-table-column align="center"
		        prop="signInDate"
		        :label="$t('goInTime')"
		        width="180">
			        <template slot-scope="scope">
				        {{scope.row.signInDate | formatDate}}
				    </template>
			    </el-table-column>
			    <el-table-column align="center"
			        prop="signOutDate"
			        :label="$t('goLeaveTime')"
			        width="180">
			        <template slot-scope="scope">
				        {{scope.row.signOutDate | formatDate}}
				    </template>
			    </el-table-column>
		    	<el-table-column align="center"
		        prop="excpStatus"
		        :label="$t('dataError')"
		        width="180">
			        <template slot-scope="scope">
			        	{{getErrorStatus(scope.row)}}
			        	<!-- <template v-if="scope.row.excpStatus === 0">{{$t('dataSuccess')}}</template>
			        	<template v-else-if="scope.row.excpStatus === 1">{{$t('dataError')}}</template> -->
				    </template>
		        </el-table-column>
		    </template>
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
		<lightbox :img-src="showUrl" :box-show="show" @closekit="show = false"></lightbox>
	</div>
</template>
<script>
import lightbox from '@/components/lightbox'
import { getCache } from '@/utils/auth'
import {formatDate,getDateFormat} from '@/utils/index'
import { downloadPDF,checkIsNull,stringToArray } from '@/utils/common'
import exportSet from './exportSet'
export default {
  components: {exportSet,lightbox},
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
  	  data: this.vdata,
  	  list: [],
  	  size: [10, 20, 30, 40],
  	  page: 10,
  	  total: this.vdata.length,
  	  current: 1,
  	  extendShow: false,
  	  extendArray: [],
  	  showUrl: '',
  	  show: false,
  	  vTypeShow: process.env.vTypeShow || false,
  	  signPdfShow: process.env.signPdf,
  	  dataError: process.env.dataError,
  	  areaEquipShow: process.env.areaEquipShow || false
  	}
  },
  filters:{
  	formatDate (time) {
  	  if (time) {
  	  	let date = new Date(time)
  	    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  	  }
  	}
  },
  watch: {
  	vdata (val) {
  	  this.current = 1
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
  	stringToArray:stringToArray,
  	downloadPDF: downloadPDF,
  	judgeCertType (val) {
  	  if(parseInt(val) == 0) {
  	  	return this.$t('idcard')
  	  } else if(parseInt(val) == 1) {
  	  	return this.$t('carId')
  	  } else if(parseInt(val) == 2) {
  	  	return this.$t('passport')
  	  } else if(parseInt(val) == 3) {
  	  	return this.$t('officialCard')
  	  } else if(parseInt(val) == 4) {
  	  	return this.$t('jobCard')
  	  } else if(parseInt(val) == 5) {
  	  	return this.$t('others')
  	  } else {
  	  	return ''
  	  }
  	},
  	getExcpStatus (val) {
  	  if (val == 0) {
        return this.$t('dataSuccess')
  	  } else if (val == 1) {
        return this.$t('dataError')
  	  } else {
  	  	return ''
  	  }
  	},
  	getErrorStatus (row) {
  	  let today = formatDate(new Date(),'yyyy-MM-dd')
  	  let visitdate = row.visitdate
  	  let signOutDate = row.signOutDate
  	  let formatVisitdate = formatDate(new Date(row.visitdate),'yyyy-MM-dd')
  	  let formatSignOutDate = formatDate(new Date(row.signOutDate),'yyyy-MM-dd')
  	  if (formatVisitdate === today) {
        return this.getExcpStatus(row.excpStatus)
      } else {
      	if (checkIsNull(signOutDate) !== '') {
          if (formatVisitdate == formatSignOutDate) {
        	return this.getExcpStatus(row.excpStatus)
	      } else {
	        return this.$t('dataError')
	      }
      	} else {
          return this.$t('dataError')
      	}
        
      }
  	},
  	setResPhotoUrl (url) {
  	  this.showUrl = url
  	  this.show = true
  	},
  	setShowUrl (row) {
  	  this.showUrl = row.vphoto
  	  this.show = true
  	},
  	setVphoto (val) {
  	  if (val && val !== '') {
  	  	return require('@/assets/img/card.png')
  	  } else {
  	  	return ''
  	  }
  	},
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
