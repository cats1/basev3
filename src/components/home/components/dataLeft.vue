<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-form :model="form">
			<el-form-item>
				<el-select class="width100" v-model="svalue" @change="settype">
          <template v-if="vTypeShow">
            <template v-if="doorGate">
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
                :value="index" v-show="index !== 6">
              </el-option>
            </template>
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
		<data-pie :piedata="typeArray" id="leftpie" :ptitle="ptitle"></data-pie>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {formatDate} from '@/utils/index'
import {stringToArray} from '@/utils/common'
import dataPie from '@/components/charts/dataPie'
export default {
  props: {
    sindex: {
      type: Number,
      default: 1
    },
    scount: {
      type: Number,
      default: 1
    }
  },
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
      vtypelist: [],
      inviteMoreShow: process.env.inviteMoreShow || false,
      startIndex:this.sindex,
      requestedCount: this.scount,
      eslForm: [],
      ptitle: '',
      doorGate: process.env.doorGate || false,
      extendColItemArray: [],
      extendArray: [],
      extendShow: process.env.extendShow || false,
  	}
  },
  watch: {
    sindex (val) {
      this.startIndex = val
      this.getDepotFormList()
    },
    scount (val) {
      this.requestedCount = val
      this.getDepotFormList()
    }
  },
  mounted () {
    this.getVisitor()
    this.GetExtendVisitor()
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
  	  if (this.inviteMoreShow) {
        if (this.vType == '文涛仓') {          
          this.getDepotFormList()
        } else {
          this.SearchVisitByCondition(nform)
        }
      } else {
        this.SearchVisitByCondition(nform)
      }
  	},
    GetExtendVisitor () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetExtendVisitor',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let local_fieldname_arr = ['name', 'visitType', 'empid', 'phone']
          let local_add_arr = ['vcompany']
          let extendArray = []
          this.extendArray = []
          let _self = this
          for (let i=0;i<result.length;i++) {
            if ($.inArray(result[i].fieldName, local_fieldname_arr) == -1) {
                if (!this.defaultVsetIsDisplayShow) {
                  if ($.inArray(result[i].fieldName, local_add_arr) == -1) {
                    extendArray.push(result[i])
                    _self.extendArray.push(result[i])
                  }
                } else {
                  if ($.inArray(result[i].fieldName, local_add_arr) == -1) {
                    extendArray.push(result[i])
                    _self.extendArray.push(result[i])
                  }
                }
            }
          }
          this.$emit('getextend',extendArray)
        }
      })
    },
    initData (val) {
      let _self = this
      this.extendColItemArray = Array(val.length).fill({})
      val.forEach(function(element, index) {
        let extendCol = element.extendCol ? element.extendCol : ''
        let viFlag = false
        if (index == val.length - 1) {
          viFlag = true
        }
        _self.htmlUnescape(extendCol,index,viFlag,val,element)
      })
    },
    async htmlUnescape (val,vindex,vflag,vArray,element) {
      await this.$store.dispatch('htmlUnescape',
        {'inviteContent': val}).then(res => {
          let extendColObj = res
          let extendColSet = this.extendArray
          let exArray = []
          let extendColArray = []
          let extendColItemObj = {}
          let _self = this
          for(let i = 0;i<extendColSet.length;i++){
            let eFlag = false  
            for (let ex in res) {
               if (extendColSet[i].fieldName == ex && ex!='empid'&&ex!='phone'&&ex!='visitType'&&ex!='name'&&ex!='vcompany') {
                let obj = {
                  'extendValue': ''
                }
                obj.extendValue = res[ex]
                eFlag = true
                extendColItemObj[ex] = $.extend({},extendColSet[i],obj)
                continue
              }
            }
            if (!eFlag) {
              let obj = {
                'extendValue': ''
              }
              extendColItemObj[extendColSet[i].fieldName] = $.extend({},extendColSet[i],obj)
            }
          }
          this.extendColItemArray[vindex] = extendColItemObj
          //this.extendColItemArray.push(extendColItemObj)
          if (vflag) {
            let nform = {
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
            this.$emit('getvlist',vArray,this.svalue,nform,this.extendColItemArray)
          }
      })
    },
    SearchVisitByCondition (nform) {
      this.$store.dispatch('SearchVisitByCondition',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.ptitle = ''
          this.setPieData()
          if (!this.extendShow) {
            this.$emit('getvlist',result,this.svalue,nform)
          } else {
            this.initData(result,nform)
            //this.$emit('getvlist',result,this.svalue,nform)
          }          
        }
      })
    },
    getDepotFormList () {
      let nform = {
        'endDate': this.form.endDate,
        'startDate': this.form.date,
        'startIndex': (this.startIndex - 1) * this.requestedCount + 1,
        'requestedCount': this.requestedCount
      }
      this.$store.dispatch('getDepotFormList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.eslForm = result
          this.vlist = result.list
          this.ptitle = '一般文书业务类别'
          this.setPieData()
          let form = {
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
          this.$emit('getesl',result,this.svalue,form)
        }
      })
    },
  	setPieData () {
  	  let _self = this
  	  let typeArray = []
      let vListArray = []
      if (this.vlist.constructor == Array) {
        vListArray = this.vlist
      } else {
        vListArray = this.vlist.list
      }
      vListArray.forEach(function(element, index) {
      	let isFlag = false
      	let hit = 0
        typeArray.forEach(function(ele, eindex) {
          if (_self.vType == '文涛仓') {
            if(ele.name === element.opType) {
              ele.value++
              hit = 1
            } else {
              if (element.opType == ''&& ele.name == '其他') {
                ele.value++
                hit = 1
              }
            }
          } else {
            if(ele.name === element.visitType) {
              ele.value++
              hit = 1
            } else {
              if (element.visitType == ''&& ele.name == '其他') {
                ele.value++
                hit = 1
              }
            }
          }	
        })
        if (hit === 0) {
          let obj
          if (_self.vType == '文涛仓') {
            obj = {
              name: element.opType ? element.opType : '其他',
              value: 1
            }
          } else {
            obj = {
              name: element.visitType ? element.visitType : '其他',
              value: 1
            }
          }
          typeArray.push(obj)
        }
      })
      this.typeArray = typeArray
  	}
  }
}
</script>