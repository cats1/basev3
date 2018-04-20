<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-form :model="form">
			<el-form-item>
				<el-select v-model="svalue" placeholder="请选择" @change="settype">
				    <el-option
				      v-for="(item,index) in $t('checkVtype')"
				      :key="index"
				      :label="item"
				      :value="index" >
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<template v-if="svalue===3">
					<el-select v-model="vvalue" placeholder="请选择">
					    <el-option
					      v-for="(item,index) in typeList"
					      :key="index"
					      :label="item"
					      :value="item">
					    </el-option>
					</el-select>
				</template>
				<template v-else-if="svalue===6">
					<el-select v-model="gvalue" placeholder="请选择">
					    <el-option
					      v-for="(item,index) in typeList"
					      :key="item.gname"
					      :label="item.gname"
					      :value="item.gname">
					    </el-option>
					</el-select>
				</template>
				<template v-else>
					<el-input v-model="value"></el-input>
				</template>
			</el-form-item>
			<el-form-item>
				<el-date-picker
			      v-model="dvalue"
			      type="daterange"
			      range-separator="-"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期" @change="setDate">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getVisitor">搜索</el-button>
			</el-form-item>
		</el-form>
		<data-pie :piedata="typeArray" id="leftpie"></data-pie>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {formatDate} from '@/utils/index'
import {stringToArray} from '@/utils/common'
import dataPie from '@/components/charts/dataPie'
export default {
  components: {dataPie},
  data () {
  	return {
  		form: {
  			'userid': getCache('userid'),
	        'name': '',
	        'empName': '',
	        'visitType': '',
	        'phone': '',
	        'date': formatDate(new Date(),'yyyy-MM-dd'),
	        'endDate': formatDate(new Date(),'yyyy-MM-dd'),
	        'vcompany': '',
	        'signInGate': ''
  		},
  		svalue: 0,
  		value: '',
  		vvalue: '',
  		gvalue: '',
  		dvalue: [formatDate(new Date(),'yyyy-MM-dd'),formatDate(new Date(),'yyyy-MM-dd')],
  		vlist: [],
  		typeList: [],
  		typeArray: [],
  		pieShow: false
  	}
  },
  methods: {
  	settype (val) {
  	  this.form.name = ''
      this.form.empName = ''
      this.form.visitType = ''
      this.form.phone = ''
      this.form.vcompany = ''
      this.form.signInGate = ''
      this.vvalue = ''
      this.gvalue = ''
  	  if (val === 1) {
  	  	this.form.name = this.value
  	  } else if (val === 2) {
  	  	this.form.empName = this.value
  	  } else if (val === 3) {
  	  	this.vvalue = '面试'
  	  	this.getVType()
  	  } else if (val === 4) {
  	  	this.form.phone = this.value
  	  } else if (val === 5) {
  	  	this.form.vcompany = this.value
  	  } else if (val === 6) {
  	  	this.getGate()
  	  }
  	},
  	setDate (val) {
  		this.form.date = formatDate(val[0],'yyyy-MM-dd')
  		this.form.endDate = formatDate(val[1],'yyyy-MM-dd')
  	},
  	getVType () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('GetVisitType',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.typeList = stringToArray(result.inputValue)
        }
      })
  	},
  	getGate () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getGate',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.typeList = result
        }
      })
  	},
  	getVisitor () {
  	  let nform = {
  	  	'userid': getCache('userid'),
  	    'name': this.form.name,
  	    'empName': this.form.empName,
  	    'visitType': this.vvalue,
  	    'phone': this.form.phone,
  	    'date': this.form.date,
  	    'endDate': this.form.endDate,
  	    'vcompany': this.form.vcompany,
  	    'signInGate': this.gvalue
  	  }
  	  this.$store.dispatch('SearchVisitByCondition',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.setPieData()
          this.$emit('getvlist',result,this.svalue,nform)
        }
      })
  	},
  	setPieData () {
  	  let _self = this
  	  let typeArray = []
      this.vlist.forEach(function(element, index) {
      	let isFlag = false
      	let hit = 0
        typeArray.forEach(function(ele, eindex) {
          	if(ele.name === element.visitType) {
              ele.value++
              hit = 1
          	}
        })
        if (hit === 0) {
            let obj = {
              name: element.visitType == null ? '团队': element.visitType,
              value: 1
            }
            typeArray.push(obj)
        }
      })
      this.typeArray = typeArray
  	}
  }
}
</script>