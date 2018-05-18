<template>
  <div class="clearfix block">
    <div class="searchmapwrap">
        <el-input type="text" v-model="maddress" class="form-control address_name" :id="inputid" @change="getAddress" @blur="getAddress"></el-input>
        <el-button type="text" class="cancel_bt marginlr20" id="searchBtn" @click="doSearch">{{$t('btn.editBtn')}}</el-button>
        <div class="searchResultPanel" :id="panelid" ></div>
    </div>
  	<div class="mapwrap">
  		<div :id="mapid" class="baidumap" style="display:block;"></div>
  	</div>
  </div>
</template>
<script>
import {createLftMap,searchByStationName} from '@/utils/baiduMap'
import baiduMap from '@/utils/baiduMap'
export default {
  props: {
  	mapid: {
      type: String,
      default: ''
    },
    sendpot: {
      type: Object,
      default: {}
    },
    isshow: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    }
  },
  data () {
  	return {
      inputid: 'search_address_' + this.mapid,
      panelid: 'searchResultPanel_' + this.mapid,
      pot: this.sendpot,
      maddress: ''
    }
  },
  watch: {
    mapid (val) {
      this.inputid = 'search_address_' + this.mapid
      this.panelid = 'searchResultPanel_' + this.mapid
    },
    sendpot (val) {
      this.init()
    },
    isshow (val) {
      console.log(val)
      this.init()
    },
    address (val) {
      this.maddress = val
      this.init()
    },
  },
  created () {},
  mounted () {
    this.init()
  },
  beforeDestroy () {
    //console.log('before destory')
    //console.log(this.$el)
  },
  destroyed () {
    //console.log('destoryed')
    this.$el.remove()
  },
  methods: {
    init () {
      if (this.isshow) {
        if (this.sendpot.longitude) {
          createLftMap(this.mapid,this.inputid,this.panelid,this.sendpot.longitude,this.sendpot.latitude,this.maddress,'',1)
        } else {
          createLftMap(this.mapid,this.inputid,this.panelid,'','',this.maddress,'',1)
        }
        document.getElementById(this.inputid).value = this.maddress
      }
    },
    doSearch () {
      let values = document.getElementById(this.inputid).value
      searchByStationName(values,0,function(pot){
        //console.log(pot)
      })
    },
    getAddress (val) {
      //console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.searchmapwrap{
  .address_name{
    width: 53%;
    display: inline-block;
    float: left;
    .cancel_bt{
      float: left;
      padding: 0 14px;
      background: 0 0;
      outline: 0;
      color: #349cd1;
      height: 37px;
      line-height: 37px;
      font-size: 14px;
      border: 0;
    }
  }
}
.searchResultPanel{
  display:none;
}
.mapwrap{
    width: 100%;
    height: 510px;
    clear: both;
    position: relative;
    top: 20px;
    margin: 0 0 20px 0;
    .baidumap{
    	width: 100%;
	    height: 100%;
	    margin: 0;
	    overflow: hidden;
	    position: relative;
	    z-index: 0;
	    background-color: #f3f1ec;
	    color: #000;
	    text-align: left;
	    .anchorBL {
		    display: none;
		}
    }
}
</style>