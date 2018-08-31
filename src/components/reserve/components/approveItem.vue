<template>
	<div>
		<div class="approvewrap" >
			<div class="regions-top">
				<h3>
				  <strong>{{item.aName}}</strong>
				  <i>{{item.address}}</i>
          <template v-if="addAreaIsShow">
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
				<template v-if="item.prlist.length > 0">
					<template v-for="(pitem,pindex) in item.prlist">
					  <el-button class="arrowitem" type="primary" @click="doContact">{{pitem.roleName}}</el-button>
					  <img class="arrowitem arrows" :src="arrowIcon" alt="" v-show="pindex !== (item.prlist.length - 1)">
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
		  <el-form :model="item">
		  	<el-form-item :label="$t('approve.areaName')">
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
		<role-menu :depid="depidDefault" :aitem="aitem" :sitem="item.prlist" :vshow="contactShow" @savekit="updateArea" @closekit="closeArea"></role-menu>
	</div>
</template>
<script>
import roleMenu from './roleMenu'
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
  components: {roleMenu},
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
      addAreaIsShow: process.env.addAreaIsShow
  	}
  },
  watch: {
  	aitem (val) {
  	  this.item = val
  	},
    depid (val) {
      this.depidDefault = val
    }
  },
  mounted () {
    
  },
  methods: {
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
  	  this.$store.dispatch('updateProcessArea',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('updatekit')
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
  	}
  }
}
</script>