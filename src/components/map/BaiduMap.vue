<template>
	<div class="mapwrap">
		<div :id="mapid" class="baidumap" style="display:block;"></div>
	</div>
</template>
<script>
import {createLftMap} from '@/utils/baiduMap'
export default {
  props: {
  	mapid: {
      type: String,
      default: ''
    },
    inputid: {
      type: String,
      default: ''
    },
    panelid: {
      type: String,
      default: ''
    }
  },
  data () {
  	return {}
  },
  methods: {},
  created () {
    document.getElementById('mapface').style.display = 'block'
  },
  mounted () {

  	createLftMap(this.mapid,this.inputid, "", "", "", "",1)
  }
}
</script>
<style lang="scss" scoped>
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