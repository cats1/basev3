<template>
  <div class="clearfix block">
    <div class="searchmapwrap">
        <el-input type="text" v-model="maddress" class="form-control address_name" :id="inputid" @change="getAddress" @blur="getAddress"></el-input>
        <el-button type="text" class="cancel_bt" id="searchBtn">{{$t('btn.editBtn')}}</el-button>
        <div class="searchResultPanel" :id="panelid" ></div>
    </div>
    <baidu-map :mapid="mapid" :isshow="isshow" :inputid="inputid" :sendpot="pot" :panelid="panelid"></baidu-map>
  </div>
</template>
<script>
import BaiduMap from '@/components/map/BaiduMap'
export default {
  props: {
  	content: {
  	  type: String,
  	  default: ''
  	},
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
  components: { BaiduMap },
  data () {
  	return {
      inputid: 'search_address_' + this.mapid,
      panelid: 'searchResultPanel_' + this.mapid,
      pot: this.sendpot,
      maddress: ''
    }
  },
  watch: {
    sendpot (val) {
      this.pot = val
    },
    isshow (val) {
      console.log(val)
    },
    address (val) {
      console.log(val)
      this.maddress = val
    },
    maddress (val) {
      console.log(val)
    }
  },
  created () {
    console.log(this.isshow)
  },
  methods: {
    getAddress (val) {
      console.log(val)
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
</style>