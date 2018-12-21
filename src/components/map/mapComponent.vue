<template>
	<div class="clearfix block">
		<div class="searchmapwrap">
			<input type="text" v-model="maddress" class="form-control address_name inputstyle" :id="inputid" @keydown.13="getAddress">
	        <el-button type="text" class="cancel_bt marginlr20" id="searchBtn" @click="getAddress">{{$t('btn.editBtn')}}</el-button>
	        <div class="searchResultPanel" :id="panelid" ></div>
        </div>
		<div class="mapwrap">
			<div :id="mapid" class="baidumap" style="display:block;"></div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'BaiduMap',
  props: {
  	mapid: {
      type: String,
      default: ''
    },
    sendpot: {
      type: Object,
      default: {
      	latitude: '39.92',
        longitude: '116.46'
      }
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
      maddress: this.address,
      bmap: '',
      lft_cur_city_name: '',
      local: null,
      customTemplateShow: process.env.customTemplateShow || false
    }
  },
  watch: {
    mapid (val) {
      this.inputid = 'search_address_' + val
      this.panelid = 'searchResultPanel_' + val
    },
    sendpot (val) {
      this.init()
    },
    isshow (val) {
      if (!this.customTemplateShow) {
      	this.init()
      } else {
      	if (val) {
      	  this.init()
      	}
      }

    },
    address (val) {
      this.maddress = val
      this.init()
    },
  },
  mounted () {
    //this.init()
  },
  beforeDestroy () {
    //console.log('before destory')
    //console.log(this.$el)
  },
  destroyed () {
    //console.log('destoryed')
    //$(".tangram-suggestion-main").remove()
    this.$el.remove()
  },
  methods: {
    init () {
    	if (this.isshow && this.mapid) {
    	    if (this.sendpot.longitude) {
	          this.createMapPoint()
	        } else {
	          this.createMap()
	        }
	        this.$emit('getpoint',this.sendpot,this.maddress)
	        document.getElementById(this.inputid).value = this.maddress
    	}
    },
    createMapPoint () {
    	let map = new BMap.Map(this.mapid, { minZoom: 14, maxZoom: 30 })
    	this.bmap = map
    	let _self = this
    	let point = new BMap.Point(this.sendpot.longitude,this.sendpot.latitude)
    	this.bmap.centerAndZoom(point, 14)
    	this.addCityList()
    	this.addClickGeocoder()
    	this.addMarker(point)
    	this.addSearch()
	    this.addMoveControl()
	    this.getAddress()
    },
    createMapCity (city) {
    	let map = new BMap.Map(this.mapid, { minZoom: 14, maxZoom: 30 })
    	this.bmap = map
    	this.lft_cur_city_name = city
        this.bmap.centerAndZoom(city, 14)
        this.addCityList()
        this.addClickGeocoder()
        this.addSearch()
        this.addMoveControl()
        this.getAddress()
    },
    createMap () {
    	let map = new BMap.Map(this.mapid, { minZoom: 14, maxZoom: 30 })
    	this.bmap = map
    	let _self = this	
    	this.addLocation()
    	this.addClickGeocoder()
    	this.addMoveControl()
    	this.addSearch()
    	this.addCityList()
    },
    changePointToAddress(point, callback) {
	  let geoc = new BMap.Geocoder()
	  let _self = this
	  geoc.getLocation(point, function(rs) {
	    let addComp = rs.addressComponents
	    _self.lft_cur_city_name = addComp.city
	    callback && callback(addComp.city)
	  })
	},
	addCityList() {
	  let size = new BMap.Size(14, 30)
	  let _self = this
	  this.bmap.addControl(new BMap.CityListControl({
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    offset: size,
	    onChangeBefore: function() {},
	    onChangeAfter: function() {
	      _self.lft_cur_city_name = $("#cur_city_name").text()
	      _self.createMapCity(_self.lft_cur_city_name)
	    }
	  }))
	},
	addClickGeocoder() {
	  let geoc = new BMap.Geocoder();
	  let _self = this
	  let map = this.bmap
	  map.addEventListener("click", function(e) {
	    map.clearOverlays();
	    var pt = e.point;
	    let pots = {
          'longitude': pt.lng,
          'latitude': pt.lat
        }
        _self.$emit('getpoint',pots,_self.maddress)
	    _self.moveMapToHere(pt);
	    /*setCache('longitude',pt.lng)
	    setCache('latitude',pt.lat)*/
	    geoc.getLocation(pt, function(rs) {
	      let addComp = rs.addressComponents;
	    });
	  });
	},
	moveMapToHere(point) {
	  let map = this.bmap
	  map.clearOverlays()
	  let _self = this
	  //let point = new BMap.Point(lng, lat)
	  window.setTimeout(function() {
	    map.panTo(point)
	    //var marker = new BMap.Marker(point); // 创建标注
	    _self.addMarker(point)
	    /*map.addOverlay(marker); // 将标注添加到地图中
	    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画*/
	  }, 2000)
	},
	addMarker(point) {
	  let marker = new BMap.Marker(point) // 创建标注
	  let _self = this
	  let map = this.bmap
	  map.addOverlay(marker) // 将标注添加到地图中
	  //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	  marker.enableDragging()
	  _self.addMarkerDrag(marker, point);
	},
	addMarkerDrag(marker, point, type) {
	  let _self = this
	  let map = this.bmap
	  marker.addEventListener("dragend", function(e) {
	    var pt = e.point
	    _self.addClickGeocoder()
	    /*setCache('longitude',pt.lng)
	    setCache('latitude',pt.lat)*/
	  });
	},
	G(id) {
	  return document.getElementById(id)
	},
	addSearch() {
	  let _self = this
	  let ac = new BMap.Autocomplete({ //建立一个自动完成的对象
	    "input": _self.inputid,
	    "location": _self.lft_cur_city_name
	  })
      ac.setInputValue(this.maddress)
	  ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
	    var str = "";
	    var _value = e.fromitem.value;
	    var value = "";
	    if (e.fromitem.index > -1) {
	      value = _value.province + _value.city + _value.district + _value.street + _value.business;
	    }
	    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
	    value = "";
	    if (e.toitem.index > -1) {
	      _value = e.toitem.value;
	      value = _value.province + _value.city + _value.district + _value.street + _value.business;
	    }
	    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	    _self.G(_self.panelid).innerHTML = str;
	  });
	  var myValue;
	  ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
	    var _value = e.item.value;
	    myValue = _value.province + _value.city + _value.district + _value.street + _value.streetNumber + _value.business;
	    //G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	    _self.maddress = myValue
        _self.setPlace(myValue)
	  });
    },
    setPlace(myValue) {
    	let _self = this
    	let map = this.bmap
	    map.clearOverlays(); //清除地图上所有覆盖物
	    let local = new BMap.LocalSearch(map, { //智能搜索
	      onSearchComplete: _self.myFun
	    })
	    this.local = local
	    local.search(myValue)
	},
	myFun() {
       let map = this.bmap
	   let keyword = this.local.getResults().keyword	   
	   let pp = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
	   let pots = {
          'longitude': pp.lng,
          'latitude': pp.lat
       }
       this.$emit('getpoint',pots,this.maddress)
	   map.centerAndZoom(pp, 18);
	   map.addOverlay(new BMap.Marker(pp)); //添加标注
	},
	addMoveControl() {
      let map = this.bmap
	  let top_right_navigation = new BMap.NavigationControl({
	    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
	    type: BMAP_NAVIGATION_CONTROL_ZOOM
	  })
	  map.addControl(top_right_navigation)
	},
	addLocation() {
	  let myCity = new BMap.LocalCity()
	  myCity.get(this.myFunCityName)
	},
	myFunCityName(result) {
      let map = this.bmap
	  let cityName = result.name
	  this.lft_cur_city_name = cityName
	  map.centerAndZoom(cityName, 14)
	},
	searchByStationName(value, callback) {
	  let map = this.bmap
	  let _self = this
	  map.clearOverlays() //清空原来的标注
	  let keyword = value;
	  let localSearch = new BMap.LocalSearch(map)
	  localSearch.enableAutoViewport(); //允许自动调节窗体大小
      localSearch.setSearchCompleteCallback(function(searchResult) {
        let poi = searchResult.getPoi(0)
	    if (poi) {
	      map.centerAndZoom(poi.point, 15);
	      let marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地址对应的经纬度
	      map.addOverlay(marker)
	      let points = {
	        "lng": poi.point.lng,
	        "lat": poi.point.lat
	      };
	      let content = keyword + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat
	      let infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>")
	      marker.addEventListener("click", function() {
	        this.openInfoWindow(infoWindow)
	      })
	      callback && callback(points)
	    } else {
	      let myGeo = new BMap.Geocoder()
	      // 将地址解析结果显示在地图上，并调整地图视野  
	      myGeo.getPoint(value, function(point) {
	        if (point) {
	          let points = {
	            "lng": point.lng,
	            "lat": point.lat
	          }
	          map.clearOverlays()
	          map.centerAndZoom(point, 14)
	          map.addOverlay(new BMap.Marker(point))
	          callback && callback(points)
	        } else {
	          //showAlert('暂无查询结果', -1);
	          return false;
	        }
	      }, _self.lft_cur_city_name);
	      //showAlert('暂无查询结果', -1);
	      //setMap.addGeocoder(map, value);
	      return false;
	    }
	  });
	  localSearch.search(keyword);
	},
    getAddress () {
      let val = this.maddress
      let _self = this
      if (val) {
        this.searchByStationName(val,function(pot) {
            let pots = {
                'longitude': pot.lng,
                'latitude': pot.lat
            };
            _self.$emit('getpoint',pots,_self.maddress)
        })
      } else {
      	this.$message({
      	  type: 'warning',
      	  message: this.$t('insertAddress')
      	})
      }
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