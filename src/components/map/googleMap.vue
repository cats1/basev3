<template>
	<div class="clearfix block">
		<div class="searchmapwrap">
			<input type="text" v-model="maddress" class="form-control address_name inputstyle" :id="inputid" @keydown.13="getAddress">
	        <el-button type="text" class="cancel_bt marginlr20" id="searchBtn" @click="getAddress">{{$t('btn.editBtn')}}</el-button>
	        <div class="searchResultPanel" :id="panelid" ></div>
        </div>
		<div class="mapwrap">
			<div :id="mapid" style="width:500px;height:300px;"></div>
		</div>
	</div>
	
</template>
<script>
export default {
  name: 'GoogleMap',
  props: {
  	mapid: {
      type: String,
      default: 'googlemap'
    },
    /*sendpot: {
      type: Object,
      default: {}
    },*/
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
      maddress: this.address,
  	  gmap: null,
  	  lat: 39.915168,
  	  lng: 116.403875,
  	  zoom: 10,
  	  marker: null
  	}
  },
  mounted () {
  	this.init()
  },
  methods: {
  	init () {
  		let mapType = google.maps.MapTypeId.ROADMAP	
		let mapOptions = {
		    center: new google.maps.LatLng(this.lat, this.lng),  //地图的中心点
		    zoom: this.zoom,               　　　　　　　　　　//地图缩放比例
		    mapTypeId: mapType,       　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
		    scrollwheel: true          　　　　　　　　　 //是否允许滚轮滑动进行缩放
		}
		this.gmap = new google.maps.Map(document.getElementById(this.mapid), mapOptions) //创建谷歌地图
		this.addSelfMarker()
		this.addInfoWindow()
  	},
  	addMarker () {
		this.marker = new google.maps.Marker({
		    map: this.gmap,
		    position: new google.maps.LatLng(this.lat, this.lng)
		})
  	},
  	addSelfMarker () {
  		let locationMarker = {
		    path: 'M22 10.5c0 .895-.13 1.76-.35 2.588C20.025 20.723 13.137 28.032 11 28 9.05 28 3.2 21.28.926 14.71.334 13.42 0 11.997 0 10.5c0-.104.013-.206.017-.31C.014 10.117 0 10.04 0 9.967c-.005-.67.065-1.112.194-1.398C1.144 3.692 5.617 0 11 0c5.416 0 9.906 3.74 10.82 8.657.112.29.18.696.18 1.31 0 .083-.013.167-.015.25.003.095.015.188.015.283zM11 5.833c-2.705 0-4.898 2.09-4.898 4.667S8.295 15.167 11 15.167s4.898-2.09 4.898-4.667c0-2.578-2.193-4.667-4.898-4.667z',
		    fillColor: '#E84643',
		    fillOpacity: 1,
		    strokeColor: '#E84643',
		}
        this.marker = new google.maps.Marker({
        	map: this.gmap,
        	icon: locationMarker,
        	position: new google.maps.LatLng(this.lat, this.lng),
        	animation: google.maps.Animation.BOUNCE
        })
  	},
  	addInfoWindow () {
  		//创建一个InfoWindow
  	    let infowindow = new google.maps.InfoWindow({content: "北京市天安门" })
  	    //把这个infoWindow绑定在选定的marker上面
		//使用谷歌地图定义的事件，给这个marker添加点击事件
		infowindow.open(this.gmap, this.marker)
		google.maps.event.addListener(this.marker, "click", function(){
		    infowindow.open(this.gmap,this.marker)
		})
  	},
  	getAddress () {
      console.log(888)
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