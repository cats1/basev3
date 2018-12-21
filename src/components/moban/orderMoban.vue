<template>
	<div>
    <template v-if="customTemplateShow">
      <el-tabs v-model="editableTabsValue" type="card" stretch @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <emp-order-moban :readonly="!isEdit" :mtype="item.title" :is-init="showAllTemp" :mapid="item.id" :isshow="item.showValue" @getmoban="getmoban"></emp-order-moban>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else>
  		<el-tabs v-model="activeName" type="card">
  		    <el-tab-pane :label="$t('moban.facemoban')" name="face" @tab-click="activeName === 'face'">
  		    	<order-interview :readonly="!isEdit" :mtype="0" :is-init="faceInitShow" mapid="facemap" :isshow="faceShow" @initmoban="getinitface" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"></order-interview>
  		    </el-tab-pane>
  		    <el-tab-pane :label="$t('moban.busmoban')" name="bus" @tab-click="activeName === 'bus'">
  		    	<order-business :readonly="!isEdit" :mtype="1" :is-init="busInitShow" mapid="busmap" :isshow="busShow" @initmoban="getinitbus" @getcon="getbinv" @gettraffic="getbtraffic" @getcompro="getbcompro"></order-business>
  		    </el-tab-pane>
  		</el-tabs>
    </template>
	</div>
</template>
<script>
import orderInterview from './orderInterview'
import orderBusiness from './orderBusiness'
import empOrderMoban from './empOrderMoban'
import { getCache } from '@/utils/auth'
import { numberToBoolean } from '@/utils/common'
export default {
  props: {
    isshow: null,
    defaultType: null,
    isAll: null,
    list: null
  },//['isshow'],
  components: { orderInterview,orderBusiness,empOrderMoban },
  data () {
  	return {
  	  activeName: 'face',
      initShow: true,
      faceInitShow: false,
      faceShow: false,
      busInitShow: false,
      busShow: false,
      isEdit: numberToBoolean(getCache('tempEditSwitch')),
      getVtype: this.defaultType || 0,
      showAllTemp: this.isAll || false,
      customTemplateShow: process.env.customTemplateShow || false,
      editableTabsValue: '0',
      tabIndex: 0,
      editableTabs: this.list || [],
      initShowValue: null,
      initShowValue: true,
      mobanObj: {}
  	}
  },
  watch: {
    isshow (val) {
      if (this.customTemplateShow){
        if (val) {
          this.init()
        }
      }
      this.faceShow = this.isshow
    },
    activeName (val) {
      if(val === 'face') {
        this.faceShow = true
        this.busShow = false
      } else if(val === 'bus') {
        this.faceShow = false
        this.busShow = true
      }
    },
    defaultType (val) {
      this.getVtype = val
      if (this.getVtype == 1) {
        this.activeName = 'bus'
        this.busShow = true
        this.faceShow = false
      } else if (this.getVtype == 0) {
        this.activeName = 'face'
        this.faceShow = true
        this.busShow = false
      }
    },
    isAll (val) {
      this.showAllTemp = val
    },
    list (val) {
      this.editableTabs = val
    }
  },
  created () {
    if (!this.isshow) {
      if (this.getVtype == 1) {
        this.activeName = 'bus'
        this.busInitShow = true
        this.faceInitShow = false
      } else if (this.getVtype == 0) {
        this.activeName = 'face'
        this.faceInitShow = true
        this.busInitShow = false
      }
    }
    if (this.customTemplateShow && this.showAllTemp) {
      this.init()
    }
  },
  mounted () {
    if (!this.isAll) {
      if (this.getVtype == 1) {
        this.activeName = 'bus'
        this.busShow = true
        this.faceShow = false
      } else if (this.getVtype == 0) {
        this.activeName = 'face'
        this.faceShow = true
        this.busShow = false
      }
    } else {
      if (this.getVtype == 1) {
        this.activeName = 'bus'
        this.busShow = true
        this.faceShow = true
      } else if (this.getVtype == 0) {
        this.activeName = 'face'
        this.busShow = true
        this.faceShow = true
      }
    }
    
  },
  methods: {
  	getinv (val) {
  	  this.$emit('getcon',val)
  	},
  	gettraffic (val) {
      this.$emit('gettraffic',val)
    },
    getcompro (val) {
      this.$emit('getcompro',val)
    },
    getbinv (val) {
  	  this.$emit('getbcon',val)
  	},
  	getbtraffic (val) {
      this.$emit('getbtraffic',val)
    },
    getbcompro (val) {
      this.$emit('getbcompro',val)
    },
    getinitface (val) {
      this.$emit('getinitface',val)
    },
    getinitbus (val) {
      this.$emit('getinitbus',val)
    },
    init () {},
    tabClick (tab, event) {
      this.tabIndex = parseInt(this.editableTabsValue)
      let _self = this
      let nArray = []
      this.editableTabs.forEach(function(element, index) {
        let obj = element
        obj.showValue = false
        if (index == _self.tabIndex) {
          obj.showValue = true
        }
        nArray.push(obj)
      })
      this.editableTabs = nArray
    },
    getmoban (val) {
      this.mobanObj[val.templateType] = val
      this.$emit('getmoban',this.mobanObj)
    }
  }
}
</script>