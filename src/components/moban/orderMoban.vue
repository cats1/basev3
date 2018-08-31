<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane :label="$t('moban.facemoban')" name="face" @tab-click="activeName === 'face'">
		    	<order-interview :readonly="!isEdit" :mtype="0" :is-init="faceShow" mapid="facemap" :isshow="faceShow" @initmoban="getinitface" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"></order-interview>
		    </el-tab-pane>
		    <el-tab-pane :label="$t('moban.busmoban')" name="bus" @tab-click="activeName === 'bus'">
		    	<order-business :readonly="!isEdit" :mtype="1" :is-init="busShow" mapid="busmap" :isshow="busShow" @initmoban="getinitbus" @getcon="getbinv" @gettraffic="getbtraffic" @getcompro="getbcompro"></order-business>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import orderInterview from './orderInterview'
import orderBusiness from './orderBusiness'
import { getCache } from '@/utils/auth'
import { numberToBoolean } from '@/utils/common'
export default {
  props: {
    isshow: null,
    defaultType: null,
    isAll: null
  },//['isshow'],
  components: { orderInterview,orderBusiness },
  data () {
  	return {
  	  activeName: 'face',
      initShow: true,
      faceShow: false,
      busShow: false,
      isEdit: numberToBoolean(getCache('tempEditSwitch')),
      getVtype: this.defaultType || 0,
      showAllTemp: this.isAll || false
  	}
  },
  watch: {
    isshow (val) {
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
      console.log(val)
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
    }
  }
}
</script>