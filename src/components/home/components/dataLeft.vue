<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-form :model="form">
			<el-form-item>
				<el-select class="width100" v-model="svalue" @change="settype">
          <template v-if="vTypeShow">
            <el-option
              v-for="(item,index) in $t('checkVtype')"
              :key="index"
              :label="item"
              :value="index" >
            </el-option>
          </template>
				  <template v-else>
            <el-option
              v-for="(item,index) in $t('checkVtype')"
              :key="index"
              :label="item"
              :value="index" v-show="index !== 7">
            </el-option> 
          </template>
				</el-select>
			</el-form-item>
			<el-form-item>
				<template v-if="svalue===3">
					<el-select class="width100" v-model="vvalue" >
					    <el-option
					      v-for="(item,index) in typeList"
					      :key="index"
					      :label="item"
					      :value="item">
					    </el-option>
					</el-select>
				</template>
				<template v-else-if="svalue===6">
					<el-select class="width100" v-model="gvalue" @change="setgtype">
					    <el-option
					      v-for="(item,index) in typeList"
					      :key="item.gname"
					      :label="item.gname"
					      :value="item.gname">
					    </el-option>
					</el-select>
				</template>
        <template v-else-if="svalue===7">
          <el-select class="width100" v-model="vType" >
              <el-option
                v-for="(item,index) in vtypelist"
                :key="item.vType"
                :label="item.vType"
                :value="item.vType">
              </el-option>
          </el-select>
        </template>
				<template v-else>
					<el-input v-model="value" :placeholder="$t('btn.searchBtn')"></el-input>
				</template>
			</el-form-item>
			<el-form-item>
				<el-date-picker
			      v-model="dvalue"
			      type="daterange"
			      range-separator="-"
            :picker-options="pickerOptions1"
			      :start-placeholder="$t('vdate[0]')"
			      :end-placeholder="$t('vdate[1]')" @change="setDate" style="width: 100%;">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button class="width100" type="primary" @click="search">{{$t('btn.searchBtn')}}</el-button>
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
      vTypeShow: process.env.vTypeShow || false,
  		form: {
  			 'userid': getCache('userid'),
	       'name': '',
	       'empName': '',
	       'visitType': '',
	       'phone': '',
	       'date': formatDate(new Date(),'yyyy-MM-dd'),
	       'endDate': formatDate(new Date(),'yyyy-MM-dd'),
	       'vcompany': '',
	       'signInGate': '',
         'vType': ''
  		},
  		svalue: 0,
  		value: '',
  		vvalue: '',
  		gvalue: '',
      vType: '',
  		dvalue: [formatDate(new Date(),'yyyy-MM-dd'),formatDate(new Date(),'yyyy-MM-dd')],
  		vlist: [],
  		typeList: [],
  		typeArray: [],
  		pieShow: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      vtypelist: []
  	}
  },
  mounted () {
    this.getVisitor()
    if (this.vTypeShow) {
      this.getTypeList()
    }
  },
  methods: {
    setgtype (val) {},
    getTypeList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getVisitorType',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vtypelist = result
        }
      })
    },
  	settype (val) {
  	  if (val === 0) {
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.vType = ''
      } else if (val === 1) {
  	  	this.form.name = this.value
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.vType = ''
  	  } else if (val === 2) {
  	  	this.form.empName = this.value
        this.form.name = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.vType = ''
  	  } else if (val === 3) {
  	  	this.vvalue = '面试'
  	  	this.getVType()
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.gvalue = ''
        this.vType = ''
  	  } else if (val === 4) {
  	  	this.form.phone = this.value
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.vType = ''
  	  } else if (val === 5) {
  	  	this.form.vcompany = this.value
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.vType = ''
  	  } else if (val === 6) {
  	  	this.getGate()
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.vType = ''
  	  } else if (val === 7) {
        this.form.name = ''
        this.form.empName = ''
        this.form.visitType = ''
        this.form.phone = ''
        this.form.vcompany = ''
        this.form.signInGate = ''
        this.vvalue = ''
        this.gvalue = ''
        this.form.vcompany = ''
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
    search () {
      this.settype(this.svalue)
      this.getVisitor()
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
      if (this.vTypeShow) {
        nform = {
          'userid': getCache('userid'),
          'name': this.form.name,
          'empName': this.form.empName,
          'visitType': this.vvalue,
          'phone': this.form.phone,
          'date': this.form.date,
          'endDate': this.form.endDate,
          'vcompany': this.form.vcompany,
          'signInGate': this.gvalue,
          'vType': this.vType
        }
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