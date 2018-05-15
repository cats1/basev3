<template>
  <div >
  	<div class="visitsetwrap">
  	<template v-for="(item,index) in g_config_arr">
      <visit-item-set :vitem="item" :vlength="g_config_arr.length" :vindex="index" :vshow="item.vshow" :vsort="sort" 
       @checkkit="checkEdit" @savekit="saveEdit" @cancelkit="cancelEdit" @delekit="deleteEdit"
      @upkit="upEdit" @downkit="downEdit"></visit-item-set>
  	</template>
    <div class="visitsetitem">    	
    	<template v-if="sort">
    		<div class="right">
    			<span class="setitembom" @click="doSortDone">{{$t('doneBtn')}}</span>
    			<span class="setitembom" @click="doSortCancel">{{$t('btn.cancelBtn')}}</span>
    		</div>    		
    	</template>
    	<template v-else>
    		<span class="setitembom" @click="addInputItem"><img :src="insert" />{{$t('newInputItem')}}</span>
	    	<span class="setitembom" @click="addSelectItem"><img :src="option" />{{$t('newSelectItem')}}</span>
	    	<span class="setitembom right" @click="doSort">{{$t('moveSort')}}</span>
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
import { getCache } from '@/utils/auth'
import {swapItems} from '@/utils/common'
import visitItemSet from './visitItemSet'
export default {
  components: { visitItemSet },
  data () {
    return {
      imgSrc: require('@/assets/img/team.png'),
      isShow: false,
      visible: false,
      checked: false,
      form: {},
      defaultForm: {
        name: this.$t('yourName'),
        visitType: this.$t('visitcause'),
        empid: this.$t('yourVisitor'),
        phone: this.$t('yourMobile'),
        email: this.$t('cemail'),
        vcompany: this.$t('yourCompany'),
        gatein: this.$t('notice.doorset.signinDoor'),
        gateout: this.$t('notice.doorset.signoutDoor'),
        guardin: this.$t('notice.doorset.signinGuard'),
        guardout: this.$t('notice.doorset.signoutGuard')
      },
      g_config_arr: [],
      g_config_arr_old: [],
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
    upEdit (index) {
      swapItems(this.g_config_arr,index,index-1)
    },
    downEdit (index) {
      swapItems(this.g_config_arr,index,index+1)
    },
    checkEdit (index,val) {
      if (val) {
        this.g_config_arr[index].required = 1
      } else {
        this.g_config_arr[index].required = 0
      }
    },
  	saveEdit (item,index) {
      this.g_config_arr[index].inputValue = item.inputValue
      this.g_config_arr[index].addtion = false
      this.form[item.fieldName] = item.displayName
  	},
  	cancelEdit (item,index) {
      if (item.itemType !== 3) {
        let olddisplayName = this.form[item.fieldName].displayName
        this.g_config_arr[index].addtion = false
        this.g_config_arr[index].displayName = olddisplayName
      }
  	},
  	deleteEdit (index) {
      this.g_config_arr[index].vshow = false
  	  this.g_config_arr.splice(index,1)
  	},
  	addInputItem () {
  	  let conf_item = {
    		userid: getCache('userid'),
    		displayName: '',
    		fieldName: 'input_' + Math.round(Math.random() * 1000) + 0,
    		inputType: 'text',
    		inputValue: '',
    		inputOrder: this.g_config_arr.length + 1,
    		required: 0,
    		placeholder: '',
    		itemType: 1,
    		checked: false,
    		addtion: true,
        vshow: true
      }
      this.g_config_arr.push(conf_item)
  	},
    addSelectItem () {
      let conf_item = {
        userid: getCache('userid'),
        displayName: '',
        fieldName: 'input_' + Math.round(Math.random() * 1000) + 0,
        inputType: 'button',
        inputValue: ',',
        inputOrder: this.g_config_arr.length + 1,
        required: 0,
        placeholder: '',
        itemType: 1,
        checked: false,
        addtion: true,
        vshow: true
      }
      this.g_config_arr.push(conf_item)
    },
    doSortDone () {
      this.g_config_arr_old = this.g_config_arr
      this.sort = false
    },
    doSortCancel () {
      this.g_config_arr = JSON.parse(window.sessionStorage.g_config_arr)
      this.sort = false
    },
  	doSort () {
      window.sessionStorage.g_config_arr = JSON.stringify(this.g_config_arr)
  	  this.sort = true
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
                form[result[i]['fieldName']] = result[i]
          	    let conf_item = {
  	              userid: result[i].userid,
  	              displayName: result[i].displayName,
  	              fieldName: result[i].fieldName,
  	              inputType: result[i].inputType,
  	              inputValue: result[i].inputValue,
  	              inputOrder: result[i].inputOrder,
  	              required: result[i].required,
  	              placeholder: result[i].placeholder,
  	              itemType: 0,//默认0,button3
  	              checked: false,
  	              addtion: false,
                  readonly: false,
                  vshow: false
  	            }
	              if (result[i].required === 1) {
                  conf_item.checked = true
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
          let g_config_arr_length = g_config_arr.length
          for (let i = 0; i < local_add_arr.length; i++) {
          	let add_arr_name = local_add_arr[i]
          	let inFlag = false
          	for (let n = 0; n < g_config_arr.length;n++) {
          	  let config_arr_name = g_config_arr[n].fieldName
          	  if (add_arr_name == config_arr_name) {
          	  	inFlag = true
          	  }
          	}
          	let conf_item = {
	            userid: getCache('userid'),
	            displayName: this.defaultForm[add_arr_name],
	            fieldName: add_arr_name,
	            inputType: 'text',
	            inputValue: '',
	            inputOrder: g_config_arr_length + i + 1,
	            required: 0,
	            placeholder: '',
	            itemType: 3,
	            checked: false,
	            addtion: true,
              readonly: true,
              vshow: false
	          }
	          if (!inFlag) {
          	  g_config_arr.push(conf_item)
          	}
          }       
        }
      })
    },
    saveSetting () {
      let g_config_arr = this.g_config_arr
      let req_arr = []
      let count = 1
      for (let i = 0; i < g_config_arr.length;i++) {
      	if (!g_config_arr[i].addtion) {
            let tobj = {
              userid: getCache('userid'),
              displayName: g_config_arr[i].displayName,
              fieldName: g_config_arr[i].fieldName,
              inputType: g_config_arr[i].inputType,
              inputValue: g_config_arr[i].inputValue,
              inputOrder: count,
              required: g_config_arr[i].required,
              placeholder: g_config_arr[i].placeholder
            }
            if ($.inArray(g_config_arr[i].fieldName, this.fieldname_arr) > -1) {
              req_arr.push(tobj)
            } else if ($.inArray(g_config_arr[i].fieldName, this.addition_arr) > -1) {
              if (g_config_arr[i].required === 1) {
                req_arr.push(tobj)
              }
            } else {
              req_arr.push(tobj)
            }
            count++
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
