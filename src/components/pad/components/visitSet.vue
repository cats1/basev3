<template>
  <div >
  	<div class="visitsetwrap">
  	<template v-for="(item,index) in g_config_arr">
  		<div class="visitsetitem">
	    	<h3>{{item.displayName}}
	    		<template v-if="sort === true">
		    		<span class="arrange">
		    		  <span class="up disabled"></span>
		    		  <span class="down"></span>
		    		</span>
	    		</template>
	    		<template v-else>
	    			<el-button class="right" type="text" @click="doEdit(index)">{{$t('btn.editBtn')}}</el-button>
	    		</template>
	    	</h3>
	    	<p v-show="item.addtion">{{$t('notice.vset.vdesc')}}</p>
	    	<el-collapse-transition>
	    		<template v-if="item.itemType === 1">
	    			<div class="paddingtb20" v-show="checkArray[index] === true">
	    			  <div>
	    			  	<el-input class="marginbom20 inputwidth220" v-model="item.displayName"></el-input>
	    			  	<el-checkbox v-model="item.checked" @change="setItemChecked(index)">{{$t('btn.insetBtn')}}</el-checkbox>
	    			  </div>			    	  
			    	  <div class="block">
				    	<el-button type='success' @click="saveEdit(item,index)">{{$t('btn.saveBtn')}}</el-button>
					    <el-button type='default' @click="cancelEdit(item,index)">{{$t('btn.cancelBtn')}}</el-button>
					    <el-button class="right" type='redfont' @click="deleteEdit(item,index)">{{$t('btn.deleteBtn')}}</el-button>
				      </div>
			    	</div>
	    		</template>
	    		<template v-else-if="item.itemType === 2">
	    			<div class="paddingtb20" v-show="checkArray[index] === true">
	    			  <div>
	    			  	<el-input class="marginbom20 inputwidth220" v-model="item.displayName"></el-input>
	    			  	<el-checkbox v-model="item.checked" @change="setItemChecked(index)">{{$t('btn.visible')}}</el-checkbox>
	    			  </div>			    	  
			    	  <div class="block">
				    	<el-button type='success' @click="saveEdit(item,index)">{{$t('btn.saveBtn')}}</el-button>
					    <el-button type='default' @click="cancelEdit(item,index)">{{$t('btn.cancelBtn')}}</el-button>
				      </div>
			    	</div>
	    		</template>
	    		<template v-else-if="item.itemType === 3">
	    			<div class="paddingtb20" v-show="checkArray[index] === true">
	    			  <div>
	    			  	<el-input class="marginbom20 inputwidth220" v-model="item.displayName"></el-input>
	    			  </div>
	    			  <div>
	    			  	<template v-for="(citem,cindex) in stringToArray(item.inputValue)" >
		    			  	  <input-one :value="citem" :index="cindex" @getv="setValueItem" @delekit="deleteValueItem"></input-one>
		    			</template>
		    			<el-button class="block" @click="addInputValue(index)" v-show="stringToArray(item.inputValue).length < 4">{{$t('btn.addSelectBtn')}}</el-button>	    			  	
	    			  </div>			    	  
			    	  <div class="block">
				    	<el-button type='success' @click="saveEdit(item,index)">{{$t('btn.saveBtn')}}</el-button>
					    <el-button type='default' @click="cancelEdit(item,index)">{{$t('btn.cancelBtn')}}</el-button>
				      </div>
			    	</div>
	    		</template>
	    		<template v-else>
	    			<div class="paddingtb20" v-show="checkArray[index] === true">
	    			  <div>
	    			  	<el-input class="marginbom20 inputwidth220" v-model="item.displayName"></el-input>
	    			  </div>			    	  
			    	  <div class="block">
				    	<el-button type='success' @click="saveEdit(item,index)">{{$t('btn.saveBtn')}}</el-button>
					    <el-button type='default' @click="cancelEdit(item,index)">{{$t('btn.cancelBtn')}}</el-button>
				      </div>
			    	</div>
	    		</template>
	    	</el-collapse-transition>	    	
	    </div>
  	</template>
    <div class="visitsetitem">    	
    	<template v-if="sort">
    		<div class="right">
    			<span class="setitembom" @click="doSort">完成</span>
    			<span class="setitembom" @click="doSort">取消</span>
    		</div>    		
    	</template>
    	<template v-else>
    		<span class="setitembom" @click="addInputItem"><img :src="insert" />创建输入项</span>
	    	<span class="setitembom"><img :src="option" />创建选择项</span>
	    	<span class="setitembom right" @click="doSort">调整顺序</span>
    	</template>    	
    </div>
    </div>
    <div class="margintop20" style="text-align:left;">
        <el-button type="primary" @click="saveSetting">{{$t('btn.saveBtn')}}</el-button>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { oneNotice,noticeShow } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {inputOne} from '@/components/input'
import {booleanToNumber,numberToBoolean,stringToArray,arrayToString} from '@/utils/common'
export default {
  components: { oneNotice,noticeShow,inputOne },
  data () {
    return {
      imgSrc: require('@/assets/img/team.png'),
      isShow: false,
      visible: false,
      checked: false,
      form: {},
      defaultForm: {
        name: '您的姓名',
        visitType: '拜访事由',
        empid: '您要拜访的人',
        phone: '您的电话',
        email: '电子邮箱',
        vcompany: '您的公司',
        gatein: '签入门岗',
        gateout: '签出门岗',
        guardin: '签入警卫',
        guardout: '签出警卫'
      },
      g_config_arr: [],
      checkArray: [],
      fieldname_arr: ['name', 'visitType', 'empid', 'phone'],
      addition_arr: ['email', 'vcompany', 'gatein', 'gateout', 'guardin', 'guardout'],
      sort: false,
      insert: require('@/assets/img/input.png'),
      option: require('@/assets/img/option.png')
    }
  },
  created () {
    this.getExtendVisitor()
  },
  methods: {
  	stringToArray: stringToArray,
  	numberToBoolean: numberToBoolean,
  	doEdit (index) {
  	  if (!this.checkArray[index]) {
  	  	this.$set(this.checkArray,index,true)
  	  }
  	},
  	addInputValue (index) {
  	  let varray = stringToArray(this.g_config_arr[index].inputValue)
  	  varray.push('')
  	  this.g_config_arr[index].inputValue = arrayToString(varray)
  	},
  	setValueItem (index,value) {
  	  let varray = stringToArray(this.g_config_arr[index].inputValue)
  	  varray[index] = value
  	  this.g_config_arr[index].inputValue = arrayToString(varray)
  	},
  	deleteValueItem (index,value) {
  	  let varray = stringToArray(this.g_config_arr[index].inputValue)
  	  varray.splice(index,1)
  	  this.g_config_arr[index].inputValue = arrayToString(varray)
  	},
  	setItemChecked (index) {
  	  if (this.g_config_arr[index].checked) {
  	  	this.g_config_arr[index].required = 1
  	  } else {
  	  	this.g_config_arr[index].required = 0
  	  }
  	},
  	saveEdit (item,index) {
      this.form[item.fieldName] = item.displayName
      this.$set(this.checkArray,index,false)
      this.g_config_arr[index].addtion = false
  	},
  	cancelEdit (item,index) {
  	  let oldValue = this.form[item.fieldName]
  	  this.g_config_arr[index].displayName = oldValue
  	  this.$set(this.checkArray,index,false)
  	},
  	deleteEdit (item,index) {
      this.$set(this.checkArray,index,false)
  	  this.g_config_arr.splice(index,1)
  	},
  	addInputItem () {
  	    let conf_item = {
		    userid: getCache('userid'),
		    displayName: '',
		    fieldName: add_arr_name,
		    inputType: 'text',
		    inputValue: '',
		    inputOrder: g_config_arr_length + i + 1,
		    required: 0,
		    placeholder: '',
		    itemType: 2,
		    checked: false,
		    addtion: true
		}
  	},
  	doSort () {
  	  this.sort = !this.sort
  	},
    showDown () {
      this.visible = !this.visible
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    getExtendVisitor () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetExtendVisitor',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.g_config_arr = []
          let g_config_arr = []
          let local_fieldname_arr = ['name', 'visitType', 'empid', 'phone']
          let local_add_arr = ['email', 'vcompany', 'gatein', 'gateout', 'guardin', 'guardout']
          let form = {}
          for (let i = 0; i < result.length; i++) {
                form[result[i]['fieldName']] = result[i]['displayName']
          	    let conf_item = {
	              userid: result[i].userid,
	              displayName: result[i].displayName,
	              fieldName: result[i].fieldName,
	              inputType: result[i].inputType,
	              inputValue: result[i].inputValue,
	              inputOrder: result[i].inputOrder,
	              required: result[i].required,
	              placeholder: result[i].placeholder,
	              itemType: 0,
	              checked: false,
	              addtion: false
	            }
	            if (result[i].required === 1) {
                  conf_item.checked = true
	            }
	            if (result[i].inputType === 'button') {
                  conf_item.itemType = 3
	            }
	            if ($.inArray(result[i].fieldName, this.fieldname_arr) == -1) {
                    if ($.inArray(result[i].fieldName, this.addition_arr) == -1) {
                      conf_item.itemType = 1
                    } else {
                      conf_item.itemType = 2
                    }
                } else {
                	local_fieldname_arr.splice($.inArray(result[i].fieldName, local_fieldname_arr), 1)
                }
                g_config_arr.push(conf_item)
          }
          this.form = form
          this.g_config_arr = g_config_arr
          console.log(local_add_arr)
          var g_config_arr_length = g_config_arr.length
          for (let i = 0; i < local_add_arr.length; i++) {
          	var add_arr_name = local_add_arr[i]
          	var inFlag = false
          	for (let n = 0; n < g_config_arr.length;n++) {
          	  var config_arr_name = g_config_arr[n].fieldName
          	  if (add_arr_name == config_arr_name) {
          	  	inFlag = true
          	  }
          	}
          	console.log(this.defaultForm[add_arr_name])
          	let conf_item = {
	            userid: getCache('userid'),
	            displayName: this.defaultForm[add_arr_name],
	            fieldName: add_arr_name,
	            inputType: 'text',
	            inputValue: '',
	            inputOrder: g_config_arr_length + i + 1,
	            required: 0,
	            placeholder: '',
	            itemType: 2,
	            checked: false,
	            addtion: true
	        }
	        if (!inFlag) {
          	  g_config_arr.push(conf_item)
          	}
          }
          console.log(g_config_arr)         
        }
      })
    },
    getSwitchValue (value) {
      this.isShow = value
      if (value) {
        this.submitDefault()
      } else {
        this.cleanTeamSetting()
      }
    },
    cleanTeamSetting () {
      if (this.g_team_config_arr.length === 0) {
        return false
      }
      var g_team_config_arr = this.g_team_config_arr
      var req_obj = []
      for (var i = 0; i < g_team_config_arr.length; i++) {
        if (g_team_config_arr[i].placeholder == null || g_team_config_arr[i].placeholder == '') {
          var conf_item = {
            "userid": g_team_config_arr[i].userid,
            "displayName": g_team_config_arr[i].displayName,
            "fieldName": g_team_config_arr[i].fieldName,
            "inputType": g_team_config_arr[i].inputType,
            "inputValue": g_team_config_arr[i].inputValue,
            "inputOrder": g_team_config_arr[i].inputOrder,
            "required": g_team_config_arr[i].required,
            "placeholder": g_team_config_arr[i].placeholder
          }
          req_obj.push(conf_item)
        }

      }
      this.saveTeam(req_obj,0)
    },
    submitDefault () {
      if (this.g_team_config_arr.length === 0) {
        return false
      }
      var g_team_config_arr = this.g_team_config_arr
      var req_obj = []
      for (var i = 0; i < g_team_config_arr.length; i++) {
        if (g_team_config_arr[i].placeholder == null || g_team_config_arr[i].placeholder == '') {
          var conf_item = {
            "userid": g_team_config_arr[i].userid,
            "displayName": g_team_config_arr[i].displayName,
            "fieldName": g_team_config_arr[i].fieldName,
            "inputType": g_team_config_arr[i].inputType,
            "inputValue": g_team_config_arr[i].inputValue,
            "inputOrder": g_team_config_arr[i].inputOrder,
            "required": g_team_config_arr[i].required,
            "placeholder": g_team_config_arr[i].placeholder
          }
          req_obj.push(conf_item)
        }
      }
      var order = g_team_config_arr.length + 1
      var item_name = {
        userid: getCache('userid'),
        displayName: '团队名称',
        fieldName: 'name',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_name)
      // 拜访的人  empid
      order = order + 1
      var item_emp = {
        userid: getCache('userid'),
        displayName: '拜访的人',
        fieldName: 'empid',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_emp)
      order = order + 1
      var item_phone = {
        userid: getCache('userid'),
        displayName: '拜访人的联系电话',
        fieldName: 'phone',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_phone)
      order = order + 1
      var item_count = {
        userid: getCache('userid'),
        displayName: '团队人数',
        fieldName: 'peopleCount',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_count)
      this.saveTeam(req_obj,1)
    },
    summitTeamSetting () {
      if (this.g_team_config_arr.length === 0) {
        return false
      }
      var g_team_config_arr = this.g_team_config_arr
      var req_obj = []
      for (var i = 0; i < g_team_config_arr.length; i++) {
        if (g_team_config_arr[i].placeholder == null || g_team_config_arr[i].placeholder == '') {
          var conf_item = {
            "userid": g_team_config_arr[i].userid,
            "displayName": g_team_config_arr[i].displayName,
            "fieldName": g_team_config_arr[i].fieldName,
            "inputType": g_team_config_arr[i].inputType,
            "inputValue": g_team_config_arr[i].inputValue,
            "inputOrder": g_team_config_arr[i].inputOrder,
            "required": g_team_config_arr[i].required,
            "placeholder": g_team_config_arr[i].placeholder
          }
          req_obj.push(conf_item)
        }
      }
      var order = req_obj.length + 1
      for (let key in this.form) {
        let tobj = {
          userid: getCache('userid'),
          displayName: this.form[key],
          fieldName: key,
          inputType: 'text',
          inputValue: '',
          inputOrder: order,
          required: 1,
          placeholder: '1'
        }
        req_obj.push(tobj)
      }
      this.saveTeam(req_obj,2)
    },
    saveSetting () {
      let g_config_arr = this.g_config_arr
      let req_arr = []
      for (let i = 0; i < g_config_arr.length;i++) {
      	if (!g_config_arr[i].addtion) {
      	    let tobj = {
	          userid: getCache('userid'),
	          displayName: g_config_arr[i].displayName,
	          fieldName: g_config_arr[i].fieldName,
	          inputType: g_config_arr[i].inputType,
	          inputValue: g_config_arr[i].inputValue,
	          inputOrder: g_config_arr[i].inputOrder,
	          required: g_config_arr[i].required,
	          placeholder: g_config_arr[i].placeholder
	        }
	        req_arr.push(tobj)
      	}
      }
      this.saveTeam(req_arr)
    },
    saveTeam (obj) {
      this.$store.dispatch('addExtendVisitor',obj).then(res => {
        let {status} = res
        if (status === 0) {
          this.getExtendVisitor()
        }
      })
    }
  }
}
</script>
