<template>
	<div>
    <template v-for="(item,index) in defaultList">
      <div class="empitemwrap">
        <span class="empitemtitle" @click="doDefaultTitleShow(index)">{{$t('recepaccount')}}：{{item.title}}</span>
        <el-collapse-transition>
          <div class="empsectionwrap" v-show="item.isShow">
            <template v-for="(pitem,pindex) in item.children">
              <emp-item :semp-array="sempArray" :emp-item="pitem" :is-close="true" @scheckkit="getCheckItem" @sempkit="checkItem" @removedkit="moveDefault"></emp-item>
            </template>
          </div>
        </el-collapse-transition>
      </div>
    </template>
		<template v-for="(item,index) in empBarList">
			<div class="empitemwrap">
			  <span class="empitemtitle" @click="doTitleShow(index)">{{item.title}}</span>
			  <el-collapse-transition>
				<div class="empsectionwrap" v-show="item.isShow">
				  <template v-for="(pitem,pindex) in item.children">
            <emp-item :semp-array="sempArray" :emp-item="pitem" :check-show="checkShow" @scheckkit="getCheckItem" @sempkit="checkItem"></emp-item>
				  </template>
				</div>
			  </el-collapse-transition>
			</div>
		</template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {gb2pinying} from '@/utils/pinyin'
import {getCharacter,stringToArray,arrayToString,numberToBoolean,booleanToNumber} from '@/utils/common'
import empItem from './empItem'
export default {
  components: {empItem},
  props: {
  	isShow: {
  	  type: Boolean,
  	  default: false
  	},
    allShow: {
      type: Boolean,
      default: false
    },
    slist: {
      type: Array,
      default: []
    },
    updateShow:{
      type: Boolean,
      default: false
    }
  },
  data () {
  	return {
      showType:1,
      total:0,
      empBarList: [],
      list: [],
      g_info: [],
      cur_vt_arr: [],
      vt_hash: {},
      py_hash: {},
      checkShow: false,
      checked: false,
      sempArray: this.slist,
      defaultList: []
  	}
  },
  watch: {
  	isShow (val) {
      console.log(val)
  	  if (val) {
  	  	this.getEmpList()
  	  }
  	},
    allShow (val) {
      console.log(val)
      if (val) {
        this.checkShow = true
        this.getEmpList()
      } else {
        this.checkShow = false
        this.getEmpList()
      }
    },
    slist(val) {
      this.sempArray = val
    },
    updateShow (val) {
      if (val) {
        this.getEmpList()
      }
    }
  },
  computed: {},
  mounted () {
  	if (this.isShow) {
  	  	this.getEmpList()
  	}
  },
  methods: {
    numberToBoolean: numberToBoolean,
    moveDefault (item) {
      let nform = [{
        userid: getCache('userid'),
        employeeid: item.empid,
        emptype: 1,
        visitType: null
      }]
      this.$store.dispatch('updateEmpVisitType',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.$emit('removedkit') 
        }
      })
    },
    doDefaultTitleShow (index) {
      this.defaultList[index].isShow = !this.defaultList[index].isShow
    },
  	doTitleShow (index) {
  	  this.empBarList[index].isShow = !this.empBarList[index].isShow
  	},
    getCheckItem (item,val) {
      this.$emit('scheckkit',item,val)
    },
    checkItem (pitem) {
      this.$emit('sempkit',pitem)
    },
    getEmpList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let total = result.length
          this.$emit('sendlist',result)
          this.total = result.length
          if (total > 0) {
          	let g_info = []
          	let cur_vt_arr = []
          	let vt_hash = {}
          	let py_hash = {}
          	for (let i=0;i<total;i++) {
          	  let item = result[i]
          	  let cap
              let py_item
              let info_item = {
                'empid': item.empid,
      			    'visitType': item.visitType,
      			    'empType': item.empType,
      			    'email': item.empEmail,
      			    'phone': item.empPhone,
      			    'name': item.empName,
      			    'empNickname': item.empNickname,
      			    'defaultNotify': item.defaultNotify,
      			    'subaccountId': item.subaccountId,
      			    'remark': item.remark,
                'egids': item.egids,
                'startDate': item.startDate,
                'endDate': item.endDate,
                'cardNo': item.cardNo,
                'empid': item.empid
              }
              g_info.push(info_item)
              if (item.defaultNotify == 1) { //是否设置专用账号
                //console.log('get list ,has one which has defautnotify=1 , id:' + item.empid);
              }
              if (item.visitType != null && item.visitType != '' && item.empType == 1) {
    			let vt_arr = vt_hash[item.visitType]
			    if (vt_arr != null) {
			        let vt_item = {
			            'empid': item.empid,
			            'userid': item.userid,
			            'empName': item.empName,
			            'empNickname': item.empNickname,
			            'empEmail': item.empEmail,
			            'empPhone': item.empPhone,
			            'visitType': item.visitType,
			            'subaccountId': item.subaccountId,
			            'remark': item.remark,
			            'empType': item.empType,
                  'egids': item.egids,
                  'startDate': item.startDate,
                  'endDate': item.endDate,
                  'cardNo': item.cardNo,
                'empid': item.empid
			        };
			        vt_arr.push(vt_item)
			    } else {
			        let vt_arr = [];
			        let vt_item = {
			            'empid': item.empid,
			            'userid': item.userid,
			            'empName': item.empName,
			            'empNickname': item.empNickname,
			            'empEmail': item.empEmail,
			            'empPhone': item.empPhone,
			            'visitType': item.visitType,
			            'subaccountId': item.subaccountId,
			            'remark': item.remark,
			            'empType': item.empType,
                  'egids': item.egids,
                  'startDate': item.startDate,
                  'endDate': item.endDate,
                  'cardNo': item.cardNo,
                'empid': item.empid
			        }
			        vt_arr.push(vt_item)
			        vt_hash[item.visitType] = vt_arr
			        cur_vt_arr.push(item.visitType)
			    }
			  }
			  let realName = item.empName
			  let upperName
			  if (/^[a-zA-Z | \.|\s ]{1,20}$/.test(realName)) {
                upperName = realName.toUpperCase()
                cap = upperName.charAt(0)
              } else {
                py_item = gb2pinying(item.empName)
                cap = py_item.charAt(0)
              }
              let arr_each_cap = py_hash[cap]
			    if (arr_each_cap != null) {
				    let cap_item = {
				        'empid': item.empid,
				        'userid': item.userid,
				        'empName': item.empName,
				        'empNickname': item.empNickname,
				        'empEmail': item.empEmail,
				        'empPhone': item.empPhone,
				        'visitType': item.visitType,
				        'subaccountId': item.subaccountId,
				        'remark': item.remark,
				        'empType': item.empType,
                'egids': item.egids,
                'startDate': item.startDate,
                'endDate': item.endDate,
                'cardNo': item.cardNo,
                'empid': item.empid
				    }
				    arr_each_cap.push(cap_item)
				} else {
				    let arr = [];
				    let cap_item = {
				        'empid': item.empid,
				        'userid': item.userid,
				        'empName': item.empName,
				        'empNickname': item.empNickname,
				        'empEmail': item.empEmail,
				        'empPhone': item.empPhone,
				        'visitType': item.visitType,
				        'subaccountId': item.subaccountId,
				        'remark': item.remark,
				        'empType': item.empType,
                'egids': item.egids,
                'startDate': item.startDate,
                'endDate': item.endDate,
                'cardNo': item.cardNo,
                'empid': item.empid
				    }
				    arr.push(cap_item)
				    py_hash[cap] = arr
				}
          	}
          	this.py_hash = py_hash
          	this.setDefaultAccount(cur_vt_arr,vt_hash)
          	this.setEmp()
          }
        }
      })
    },
    setDefaultAccount (cur_vt_arr,vt_hash) {
      /* 显示默认接待账号 */
      let darray = []
      for (let i=0;i<cur_vt_arr.length;i++) {
        let key = cur_vt_arr[i]
        let empObj = {
          'title': key,
          'isShow': this.allShow,
          'children': vt_hash[key]
        }
        darray.push(empObj)
      }
      this.defaultList = darray
    },
    setEmp () {
      let character = getCharacter()
      //empBarList
      let empArray = []
      for (let i = 0; i < character.length; i++) {
        let chap = character[i]
        let chaplist = this.py_hash[chap]
        let carray = []
        let empObj = {
          'title': chap,
          'isShow': this.allShow,
          'children': []
        }
        if (chaplist) {
            for (let j = 0; j < chaplist.length; j++) {
                let cNames = ''
                if (chaplist[j].empType === 3) {
                    cNames = 'empleader'
                }
                let chap = chaplist[j]
                console.log(chap)
                chap.checked = 0
                carray.push(chap)
            }
        }
        empObj.children = carray
        empArray.push(empObj)
      }
      this.empBarList = empArray
    }
  }
}
</script>