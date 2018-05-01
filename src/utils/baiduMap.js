import { setCache } from './auth'
import { checkIsNull } from './common'
var lftmap, lft_cur_city_name

function G(id) {
  return document.getElementById(id);
}

function addMarker(map, point, type) {
  var marker = new BMap.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
  //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  marker.enableDragging();
  addMarkerDrag(map, marker, point, type);
}

function addMarkerDrag(map, marker, point, type) {
  marker.addEventListener("dragend", function(e) {
    var pt = e.point;
    setCache('longitude',pt.lng)
    setCache('latitude',pt.lat)
    addClickGeocoder(map, type, function() {});
  });
}

function changePointToAddress(point, callback) {
  var geoc = new BMap.Geocoder();
  geoc.getLocation(point, function(rs) {
    var addComp = rs.addressComponents;
    lft_cur_city_name = addComp.city;
    callback && callback(lft_cur_city_name);
  });
}

function addGeocoder(map, saddres) {
  var myGeo = new BMap.Geocoder();
  // 将地址解析结果显示在地图上，并调整地图视野  
  myGeo.getPoint(saddres, function(point) {
    if (point) {
      map.clearOverlays();
      map.centerAndZoom(point, 14);
      map.addOverlay(new BMap.Marker(point));
    } else {
      showAlert('暂无查询结果', -1);
      return false;
    }
  }, lft_cur_city_name);
}

function addClickGeocoder(map, type, callback) {
  var geoc = new BMap.Geocoder();
  map.addEventListener("click", function(e) {
    map.clearOverlays();
    var pt = e.point;
    moveMapToHere(map, e.point.lng, e.point.lat, type);
    setCache('longitude',pt.lng)
    setCache('latitude',pt.lat)
    geoc.getLocation(pt, function(rs) {
      var addComp = rs.addressComponents;
      callback && callback(addComp);
    });
  });
}

function addClickFun(map, type) {
  function showInfo(e) {
    alert(e.point.lng + ", " + e.point.lat);
    moveMapToHere(map, e.point.lng, e.point.lat, type)
  }
  map.addEventListener("click", showInfo);
}

function addLocation(map, callback) {
  function myFun(result) {
    var cityName = result.name;
    lft_cur_city_name = cityName;
    map.centerAndZoom(cityName, 14);
    //map.setCenter(cityName);
    callback && callback(cityName);
  }
  var myCity = new BMap.LocalCity();
  myCity.get(myFun);

}

function moveMapToHere(map, lng, lat, type) {
  map.clearOverlays();
  var point = new BMap.Point(lng, lat);
  window.setTimeout(function() {
    map.panTo(point);
    //var marker = new BMap.Marker(point); // 创建标注
    addMarker(map, point, type);

    /*map.addOverlay(marker); // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画*/
  }, 2000);
}

function addCityList(map, dom, sdom,dvalue,pnelid, type, callback) {
  var size = new BMap.Size(10, 20);
  map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: size,
    onChangeBefore: function() {},
    onChangeAfter: function() {
      lft_cur_city_name = $("#cur_city_name").text();
      console.log(lft_cur_city_name)
      lftmap = new BMap.Map(dom, { minZoom: 14, maxZoom: 30 });
      lftmap.centerAndZoom(lft_cur_city_name, 14);
      addCityList(lftmap, dom, sdom,dvalue,pnelid, type);
      addClickGeocoder(lftmap, type);
      addSearch(lftmap, sdom,pnelid, dvalue, type);
    }
  }));
  callback && callback();
}

function addLocationSearch(map, stext) {
  var options = {
    renderOptions: { map: map },
    onSearchComplete: function(results) {
      if (local.getStatus() == BMAP_STATUS_SUCCESS) {
        // 判断状态是否正确      
        var s = [];
        for (var i = 0; i < results.getCurrentNumPois(); i++) {
          s.push("<span>" + results.getPoi(i).title + "<br>" + results.getPoi(i).address + "</span>");
        }
        document.getElementById("searchResultPanel").innerHTML = s.join("<br>");
      }
    }
  };
  var local = new BMap.LocalSearch(map, options);
  /*var local = new BMap.LocalSearch(map, {
      renderOptions: { map: map, panel: "searchResultPanel" }
  });*/
  local.search(stext);
}

function addSearch(map, sdom,pnelid, dvalue, type) {
  var ac = new BMap.Autocomplete({ //建立一个自动完成的对象
    "input": sdom,
    "location": lft_cur_city_name
  });
  ac.setInputValue(dvalue);
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
    G(pnelid).innerHTML = str;
  });

  var myValue;
  ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
    var _value = e.item.value;
    myValue = _value.province + _value.city + _value.district + _value.street + _value.streetNumber + _value.business;
    //G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

    setPlace();
  });

  function setPlace() {
    map.clearOverlays(); //清除地图上所有覆盖物
    function myFun() {
      let keyword = local.getResults().keyword
      setCache('saddress',keyword)
      var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
      map.centerAndZoom(pp, 18);
      map.addOverlay(new BMap.Marker(pp)); //添加标注
      setCache('longitude',pp.lng)
      setCache('latitude',pp.lat)
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
      onSearchComplete: myFun
    });
    local.search(myValue);
  }

}

function addMoveControl(map) {
  var top_right_navigation = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    type: BMAP_NAVIGATION_CONTROL_ZOOM
  });
  map.addControl(top_right_navigation);
}

function addLocalControl(map) {
  var geolocationControl = new BMap.GeolocationControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT
  });
  geolocationControl.addEventListener("locationSuccess", function(e) {
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
  });
  geolocationControl.addEventListener("locationError", function(e) {
    alert(e.message);
  });
  map.addControl(geolocationControl);
}

export function searchByStationName(value, type, callback) {
  let map = lftmap
  map.clearOverlays(); //清空原来的标注
  var keyword = value;
  var localSearch = new BMap.LocalSearch(map);
  localSearch.enableAutoViewport(); //允许自动调节窗体大小
  localSearch.setSearchCompleteCallback(function(searchResult) {
    var poi = searchResult.getPoi(0);
    if (poi) {
      map.centerAndZoom(poi.point, 15);
      var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地址对应的经纬度
      map.addOverlay(marker);
      var points = {
        "lng": poi.point.lng,
        "lat": poi.point.lat
      };
      setCache('longitude',poi.point.lng)
      setCache('latitude',poi.point.lat)
      var content = keyword + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
      var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
      marker.addEventListener("click", function() {
        this.openInfoWindow(infoWindow);
      });
      callback && callback(points)
    } else {
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野  
      myGeo.getPoint(value, function(point) {
        if (point) {
          var points = {
            "lng": point.lng,
            "lat": point.lat
          };
          setCache('longitude',point.lng)
          setCache('latitude',point.lat)
          map.clearOverlays();
          map.centerAndZoom(point, 14);
          map.addOverlay(new BMap.Marker(point));
          callback && callback(points)
        } else {
          showAlert('暂无查询结果', -1);
          return false;
        }
      }, lft_cur_city_name);
      //showAlert('暂无查询结果', -1);
      //setMap.addGeocoder(map, value);
      return false;
    }

    //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  });
  localSearch.search(keyword);
}
export function createLftMap(dom, sdom, pnelid, longitude, latitude, dvalue, city, type) {
  lftmap = new BMap.Map(dom, { minZoom: 14, maxZoom: 30 }); // 创建Map实例
  setCache('saddress',dvalue)
  setCache('longitude',longitude)
  setCache('latitude',latitude)
  if (checkIsNull(longitude) != '' && checkIsNull(latitude) != '') {
    var point = new BMap.Point(longitude, latitude);
    lftmap.centerAndZoom(point, 14);
    changePointToAddress(point, function(city) {
      addCityList(lftmap, dom, sdom,dvalue,pnelid, type)
      addSearch(lftmap, sdom,pnelid, dvalue, type);
      addClickGeocoder(lftmap, type)
      addMarker(lftmap, point, type)
    });
    /*changePointToAddress(point, function(city) {
      lft_cur_city_name = city;
      console.log(dvalue)
      //addCityList(lftmap, dom, sdom,pnelid, type);
      //addSearch(lftmap, sdom,pnelid, dvalue, type);
      addClickGeocoder(lftmap, type);
      addMarker(lftmap, point, type);

    });*/

  } else {
    if (checkIsNull(city) != '') {
      lft_cur_city_name = city;
      lftmap.centerAndZoom(city, 14);
      addCityList(lftmap, dom, sdom,dvalue,pnelid, type);
      addClickGeocoder(lftmap, type);
      addSearch(lftmap, sdom,pnelid, dvalue, type);

    } else {
      addLocation(lftmap, function(city) {
        lft_cur_city_name = city;
        //addCityList(lftmap, dom, sdom, type);
        addClickGeocoder(lftmap, type);
        addSearch(lftmap, sdom,pnelid, dvalue, type);
      });
    }

  }
  addMoveControl(lftmap);
  //lftmap.enableScrollWheelZoom(true);
}
export default lftmap