<template>
	<el-dialog
		:title="$t('btn.editBtn')"
		:visible.sync="dialogVisible"
		width="80%" @close="cancelRoles">
		<div class="rolemenuwrap">
			<div class="roleleft">
			  <h2>{{$t('approve.contact')}}</h2>
			  <template v-for="(item,index) in slist" >
          <div class="approveitemwrap">
            <template v-for="(citem,cindex) in item.child" >
              <div class="approveitem">
                <template v-if="citem.rType == 0">
                  <span class="closeicon" @click="removeRole(citem,cindex,index)"><i class="fa fa-close fa-lg " ></i></span>
                  <img :src="roleImg" alt="">
                  <p class="approveitemtext">{{citem.rgName}}</p>
                </template>
                <template v-else-if="citem.rType == 2">
                  <span class="closeicon" @click="removeRole(citem,cindex,index)"><i class="fa fa-close fa-lg " ></i></span>
                  <img :src="roleImg" alt="">
                  <p class="approveitemtext spec">{{citem.rgName}}</p>
                </template>
                <template v-else>
                  <span class="closeicon" @click="removeRole(citem,cindex,index)"><i class="fa fa-close fa-lg " ></i></span>
                  <img :src="personImg" alt="">
                  <p class="approveitemtext person">{{citem.rgName}}</p>
                </template>
              </div>
            </template>
			  	</div>
          <div class="approveitemarrowwrap">
  			  	<div class="approveitem paddingtb20" v-show="index !== (slist.length-1)">
  			  		<img :src="arrowIcon" alt="">
  			  	</div>
          </div>
			  </template>
			</div>
			<div class="roleright">
			  <h2>{{$t('emplist.com')}}</h2>
				<template v-for="(item,index) in rlist">
				  <p class="roletitle">{{item.rgName}}</p>
				  <template v-for="(citem,cindex) in item.childRoleList">
				  	<span class="roleitem" :class="{'selected': citem.checked}" @click="selectItem(citem,index,cindex)">{{citem.rgName}}</span>
				  </template>
				</template>
			</div>
		</div>
    <el-dialog
      width="30%"
      :title="$t('btn.editBtn')"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form>
        <el-form-item :label="$t('level')">
          <el-select v-model="levelValue" :placeholder="$t('mustSelect')">
            <el-option
              v-for="(item,index) in slist"
              :key="index"
              :label="item.name"
              :value="index">
            </el-option>
            <el-option :key="slist.length" label="新增" :value="slist.length" v-show="lastShow">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="rType" @change="getrType">
            <el-radio :label="0" v-show="rTypeZeroShow">审批人</el-radio>
            <el-radio :label="2" v-show="rTypeZeroShow">特定审批人</el-radio>
            <el-radio :label="1" v-show="rTypeFirstShow">默认通知人</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerCancel">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="innerConfirm">{{$t('btn.confirmBtn')}}</el-button>
      </span>
    </el-dialog>
		<span slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="saveRoles">{{$t('btn.saveBtn')}}</el-button>
		  <el-button @click="cancelRoles">{{$t('btn.cancelBtn')}}</el-button>
		</span>
	</el-dialog>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
  	aitem: {
  	  type: Object,
  	  default: {}
  	},
  	vshow: {
  	  type: Boolean,
  	  default: false
  	},
  	sitem:{
  	  type: Array,
  	  default: []
  	},
    depid: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
      innerVisible: false,
      dialogVisible: this.vshow,
  	  addIcon: require('@/assets/img/emp.png'),
  	  roleImg: require('@/assets/img/roles.png'),
      personImg: require('@/assets/img/person.png'),
  	  arrowIcon: require('@/assets/img/arrows.png'),
  	  areaObj: this.aitem,
  	  form:{
  	  	aName: '',
  	  	address: '',
  	  	userid: getCache('userid')
  	  },
  	  dform: {
  	  	aid: '',
  	  	userid: getCache('userid')
  	  },
  	  rlist: [],
  	  slist: [],
  	  checkArray: [],
  	  rolelist: [],
      levelValue: 0,
      rType: 0,
      depidDefault: this.depid,
      addAreaIsShow: process.env.addAreaIsShow || false,
      selectForm: {
        citem: {},
        index: 0,
        cindex:0
      },
      rTypeZeroShow: true,
      rTypeFirstShow: true
  	}
  },
  computed: {
    lastShow: {
      get () {
        let Flag = true
        if (this.slist.length == 0) {
          Flag = true
          this.rTypeFirstShow = false
        } else {
          this.rTypeZeroShow = true
          this.rTypeFirstShow = true
          let eChild = this.slist[this.slist.length -1].child
          let zeroNumber = 0
          eChild.forEach(function(cele, cindex) {
            if (cele.rType == 0||cele.rType == 2) {
              zeroNumber++
            }
          })
          if (zeroNumber >= 1) {
            Flag = true
          } else {
            Flag = false
          }
        }
        return Flag
      },
      set () {}
    }
  },
  watch: {
  	aitem (val) {
  	  this.areaObj = val
  	},
  	vshow (val) {
  	  this.dialogVisible = val
  	  if (val) {
	      this.getRole()
	    }
  	},
  	sitem (val) {
  	  this.slist = val
  	  this.initSelect()
  	},
    depid (val) {
      this.depidDefault = val
    }
  },
  mounted () {
  	if (this.dialogVisible) {
      this.getRole()
  	}
  },
  methods: {
    init () {
      this.initLeftMenu()
      this.initRightMenu()
    },
    getrType (val) {},
    initLeftMenu () {
      let _self = this
      let carray = []
      this.sitem.forEach(function(ele,index){
        _self.rolelist.forEach(function(rele,rindex){
          let child = rele.childRoleList
          child.forEach(function(citem,cindex){
            citem.checked = true      
            if (ele.role === citem.rid) {
              let o2 = $.extend({}, citem, ele)
              let lIndex = ele.level - 1
              let obj = {
                name: _self.$t('level') + lIndex,
                child: []
              }
              if (!carray[lIndex]) {
                carray.push(obj)
              }
              carray[lIndex].child.push(o2)
            }
          })
        })
      })
      this.slist = carray
    },
    initRightMenu () {
      let _self = this
      let rarray = []
      this.rolelist.forEach(function(ele,index){
        let child = ele.childRoleList
        let obj = {
          'rgName': ele.rgName,
          'childRoleList': []
        }
        child.forEach(function(citem,cindex){
          citem.checked = false
          let carray = citem
          _self.sitem.forEach(function(sele,sindex){
          if (sele.role === citem.rid) {
            carray.checked = true
          }
          })
          obj.childRoleList.push(carray)
        })  
        rarray.push(obj)      
      })
      this.rlist = rarray
    },
  	initSelect () {
  	  let _self = this
  	  let varray = []
  	  let rarray = []
  	  this.rolelist.forEach(function(ele,index){
  	  	let child = ele.childRoleList
  	  	let obj = {
  	  	  'rgName': ele.rgName,
  	  	  'childRoleList': []
  	  	}
  	  	child.forEach(function(citem,cindex){
  	  	  citem.checked = false
  	  	  let carray = citem
  	  	  _self.sitem.forEach(function(sele,sindex){
	  	  	if (sele.role === citem.rid) {
	  	  	  varray.push(citem)
	          carray.checked = true
	  	  	}
  	  	  })
  	  	  obj.childRoleList.push(carray)
  	  	})  
  	  	rarray.push(obj)	  	
  	  })
  	  this.rlist = rarray
  	  this.slist = varray
  	},
  	removeRole (item,cindex,index) {
  	  this.slist[index].child.splice(cindex,1)
      if (this.slist[index].child.length == 0) {
        this.slist.splice(index,1)
      }
      this.checkRlist(item)
  	},
    checkRlist (item) {
      let _self = this
      let newRlist = []
      this.rlist.forEach(function(el,index){
        let childRoleList = el.childRoleList
        let nobj = {
          rgName: el.rgName,
          childRoleList: []
        }
        childRoleList.forEach(function(cel,cindex){
          let cobj = {
            checked: cel.checked,
            childRoleList: cel.childRoleList,
            empid: cel.empid,
            parentId: cel.parentId,
            rgName: cel.rgName,
            rid: cel.rid,
            userid: getCache('userid')
          }
          if (cel.rid == item.role) {//cel.rid == item.role || 
            cobj.checked = false
          }
          nobj.childRoleList.push(cobj)
        })
        newRlist.push(nobj)
      })
      this.rlist = newRlist
    },
  	selectItem (citem,index,cindex) {
  	  let child = this.rlist[index].childRoleList
      this.selectForm.citem = citem
      this.selectForm.index = index
      this.selectForm.cindex = cindex
  	  if (!child[cindex].checked) {
        this.innerVisible = true
  	  } else {
  	  	child[cindex].checked = false
  	  	this.removeSlist(citem)
  	  }  
  	},
  	removeSlist (citem) {
  	  let varray = []
      let _self = this
  	  this.slist.forEach(function(ele,index){
        let child = ele.child
        let eObj = {
          name: _self.$t('level') + index,
          child: []
        }
        child.forEach(function(cele,cindex) {
          if (cele.rid !== citem.rid) {
            eObj.child.push(cele)
          }
        })
  	  	if (eObj.child.length > 0) {
          varray.push(eObj)
        }
  	  })
  	  this.slist = varray
  	},
  	getRole () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getRARG',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.rolelist = result
          this.init()
        }
  	  })
  	},
  	saveRoles () {
  	  let cobj = []
  	  let _self = this
  	  this.slist.forEach(function(ele,index){
        let child = ele.child
        child.forEach(function(element, index) {
          let obj = {
            aid: _self.areaObj.aid,
            level: element.level,
            role: element.role,
            roleName: element.rgName,
            rType: element.rType
          }
          cobj.push(obj)
        })
  	  })

      if (cobj.length > 0) {
        this.saveSet(cobj)
      } else {
        this.$message({
          showClose: true,
          message: this.$t('selectOneMore'),
          type: 'warning'
        })
      }
  	},
  	saveSet (obj) {
  	  this.$store.dispatch('addProcessRule',obj).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('savekit')
        }
  	  })
  	},
    cancelRoles () {
      this.dialogVisible = false
      this.$emit('closekit')
    },
    innerCancel () {
      let child = this.rlist[this.selectForm.index].childRoleList
      child[this.selectForm.cindex].checked = false
      this.innerVisible = false
    },
    innerConfirm () {
      let child = this.rlist[this.selectForm.index].childRoleList
      let levelObj = this.slist[this.levelValue]
      let obj = {
        aid: 0,
        level: this.levelValue + 1,
        rType: this.rType,
        rid: this.selectForm.citem.rid,
        role: this.selectForm.citem.rid,
        roleName: this.selectForm.citem.rgName
      }
      let obj2 = $.extend({},this.selectForm.citem,obj)
      if (this.levelValue == this.slist.length) {
        let newObj = {
          name: this.$t('level') + this.levelValue,
          child: []
        }
        newObj.child.push(obj2)
        this.slist.push(newObj)
      } else {
        let levelObjChild = levelObj.child
        if (this.rType == 0 || this.rType == 2) {
          let zeroNum = 0
          let twoNum = 0
          levelObjChild.forEach(function(element, index) {
            if (element.rType == 0) {
              zeroNum++
            }
            if (element.rType == 2) {
              twoNum++
            }
          })
          if (this.rType == 0) {
            if (twoNum > 0) {
              this.$message({
                showClose: true,
                message: '审批人和特定审批人只能存在一种',
                type: 'warning'
              })
              return false
            }
          } else if (this.rType == 2) {
            if (zeroNum > 0) {
              this.$message({
                showClose: true,
                message: '审批人和特定审批人只能存在一种',
                type: 'warning'
              })
              return false
            }
          }
        }
        this.slist[this.levelValue].child.push(obj2)
      }
      child[this.selectForm.cindex].checked = true
      this.innerVisible = false
    }
  }
}
</script>