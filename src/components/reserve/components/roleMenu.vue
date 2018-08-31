<template>
	<el-dialog
		:title="$t('approve.addArea')"
		:visible.sync="dialogVisible"
		width="80%" @close="cancelRoles">
		<div class="rolemenuwrap">
			<div class="roleleft">
			  <h2>{{$t('approve.contact')}}</h2>
			  <template v-for="(item,index) in slist">
			  	<div class="approveitem">
			  		<span class="closeicon" @click="removeRole(item,index)"><i class="fa fa-close fa-lg " ></i></span>
			  		<img :src="roleImg" alt="">
			  		<p class="approveitemtext">{{item.rgName}}</p>
			  	</div>
			  	<div class="approveitem paddingtb20" v-show="index !== (slist.length-1)">
			  		<img :src="arrowIcon" alt="">
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
      dialogVisible: this.vshow,
  	  addIcon: require('@/assets/img/emp.png'),
  	  roleImg: require('@/assets/img/roles.png'),
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
      depidDefault: this.depid,
      addAreaIsShow: process.env.addAreaIsShow
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
    initLeftMenu () {
      let _self = this
      let varray = []
      this.sitem.forEach(function(ele,index){
        _self.rolelist.forEach(function(rele,index){
          let child = rele.childRoleList
          child.forEach(function(citem,cindex){
            citem.checked = true          
            if (ele.role === citem.rid) {
              varray.push(citem)
            }
          })
        })
      })
      this.slist = varray
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
  	removeRole (item,index) {
  	  this.slist.splice(index,1)
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
          if (cel.rid == item.rid) {
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
  	  if (!child[cindex].checked) {
  	  	child[cindex].checked = true
  	  	this.slist.push(citem)
  	  } else {
  	  	child[cindex].checked = false
  	  	this.removeSlist(citem)
  	  }  
  	},
  	removeSlist (citem) {
  	  let varray = []
  	  this.slist.forEach(function(ele,index){
  	  	if (ele.rid !== citem.rid) {
          varray.push(ele)
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
          //this.initSelect()
          this.init()
        }
  	  })
  	},
  	saveRoles () {
  	  let cobj = []
  	  let _self = this
  	  this.slist.forEach(function(ele,index){
  	  	let obj = {
  	  	  aid: _self.areaObj.aid,
  	  	  level: index + 1,
  	  	  role: ele.rid,
  	  	  roleName: ele.rgName
  	  	}
        if (!_self.addAreaIsShow) {
          obj = {
            aid: _self.areaObj.aid,
            level: index + 1,
            role: ele.rid,
            roleName: ele.rgName,
            deptid: _self.depidDefault
          }
        }
  	  	cobj.push(obj)
  	  })
  	  this.saveSet(cobj)
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
    }
  }
}
</script>