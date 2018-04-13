<template>
  <div class="clearfix block">
    <div class="searchmapwrap">
        <el-input type="text" class="form-control address_name" :id="inputid" placeholder="请输入…"></el-input>
        <el-button type="text" class="cancel_bt" id="search_address">修改</el-button>
        <div class="searchResultPanel" :id="panelid" ></div>
    </div>
    <baidu-map :mapid="mapid" :inputid="inputid" :panelid="panelid"></baidu-map>
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
    }
  },
  components: { BaiduMap },
  data () {
  	return {
      inputid: 'search_address_' + this.mapid,
      panelid: 'searchResultPanel_' + this.mapid
    }
  },
  created () {
    document.getElementById('mapface').style.display = 'block'
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
</style>