<template>
	<div>
		<div class="approvewrap" >
			<div class="regions-top">
				<h3>
				  <strong>{{item.aName}}</strong>
				  <i>{{item.address}}</i>
		          <template v-if="addAreaCloseIsShow">
		            <span class="right">
		              <span class="editarea" @click="dialogVisible = true">
		                <i class="el-icon-edit"></i>
		              </span>
		              <span class="closearea" @click="deleteArea">
		                <i class="el-icon-close"></i>
		              </span>
		            </span>
		          </template>
				</h3>
			</div>
			<span class="region-logo">
				<img :src="addIcon" alt="">
				<template v-if="prlist.length > 0">
					<template v-for="(pitem,pindex) in prlist">
					  <div class="approvearrowitemwrap" @click="doContact">
					  	 <template v-for="(cpitem,cpindex) in pitem.child">
					  	 	<template v-if="cpitem.rType == 0">
					  	 	  <el-button class="arrowitem" type="primary" >{{cpitem.roleName}}</el-button>
					  	 	</template>
                <template v-else-if="cpitem.rType == 2">
                  <el-button class="arrowitem" type="warning" >{{cpitem.roleName}}</el-button>
                </template>
					  	 	<template v-else>
					  	 	  <el-button class="arrowitem" type="success" >{{cpitem.roleName}}</el-button>
					  	 	</template>
					  	 </template>
					  </div>					  
					  <img class="arrowitem arrows" :src="arrowIcon" alt="" v-show="pindex !== (prlist.length - 1)">
					</template>
				</template>
				<template v-else>
				  <el-button type="primary" @click="doContact">{{$t('approve.contact')}}</el-button>
				</template>				
			</span>
		</div>
		<el-dialog
		  :title="$t('approve.contact')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="item" @close="handClose" ref="areaform" :rules="rules">
		  	<el-form-item :label="$t('approve.areaName')" prop="aName">
		  		<el-input v-model="item.aName"></el-input>
		  	</el-form-item>
		  	<el-form-item :label="$t('approve.areaAddress')">
		  		<el-input v-model="item.address"></el-input>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="saveSet">{{$t('btn.saveBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		  </span>
		</el-dialog>
		<role-more-menu :depid="depidDefault" :aitem="aitem" :sitem="item.prlist" :vshow="contactShow" @savekit="updateArea" @closekit="closeArea"></role-more-menu>
	</div>
</template>
<script>
import roleMoreMenu from './roleMoreMenu'
import {getCache} from '@/utils/auth'
export default {
  props: {
  	aitem: {
  	  type: Object,
  	  default: {}
  	},
    depid: {
      type: Number,
      default: 0
    }
  },
  components: {roleMoreMenu},
  data () {
  	return {
      dialogVisible: false,
      contactShow: false,
  	  addIcon: require('@/assets/img/emp.png'),
  	  arrowIcon: require('@/assets/img/arrows.png'),
  	  item: this.aitem,
  	  form:{
  	  	aName: '',
  	  	address: '',
  	  	userid: getCache('userid')
  	  },
      depidDefault: this.depid,
      addAreaCloseIsShow: process.env.addAreaCloseIsShow,
      rules:{
        aName: [{ required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }]
      },
      prlist: []
  	}
  },
  watch: {
  	aitem (val) {
  	  this.item = val
  	  this.getPrlist()
  	},
    depid (val) {
      this.depidDefault = val
    }
  },
  created () {
  	this.getPrlist()
  },
  methods: {
  	getPrlist () {
      let prlist = this.aitem.prlist
      let parray = []
      let _self = this
      prlist.forEach(function(element, index) {
      	let lIndex = element.level - 1
      	let obj = {
      	  name: _self.$t('level') + lIndex,
      	  child: []
      	}
      	if (!parray[lIndex]) {
          parray.push(obj)
        }
        parray[lIndex].child.push(element)
      })
      this.prlist = parray
  	},
  	doContact () {
  	  this.contactShow = true
  	},
    closeArea () {
      this.contactShow = false
      this.$emit('closekit')
    },
  	updateArea () {
  	  this.contactShow = false
  	  this.$emit('savekit')
  	},
  	saveSet () {
  	  let nform = {
  	  	userid: getCache('userid'),
  	  	aName: this.item.aName,
  	  	address: this.item.address,
  	  	aid: this.item.aid
  	  }
      this.$refs['areaform'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('updateProcessArea',nform).then(res => {
            let {status} = res
            if (status === 0) {
              this.dialogVisible = false
              this.$emit('updatekit')
            }
          })
        }
      })
  	  
  	},
  	deleteArea () {
  	  let nform = {
  	  	aid: this.aitem.aid,
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('delProcessArea',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.$emit('deletekit')
        }
  	  })
  	},
    handClose () {
      this.form = {
        aName: '',
        address: '',
        userid: getCache('userid')
      }
    }
  }
}
</script>