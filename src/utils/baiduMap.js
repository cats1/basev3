export function createMap(dom) {
  const map = new BMap.Map(dom, { enableMapClick: true });
  // 初始化地图,设置中心点坐标和地图级别
  map.centerAndZoom(new BMap.Point(116.4035, 39.915), 11);
  // 添加地图类型控件
  map.addControl(new BMap.MapTypeControl());
  // 设置地图显示的城市 此项是必须设置的
  map.setCurrentCity("杭州");
  // 开启鼠标滚轮缩放      
  map.enableScrollWheelZoom(true);
  // 设置定时器，对地图进行自动移动
  setTimeout(function() {
    map.panTo(new BMap.Point(113.262232, 23.154345));
  }, 2000);
  setTimeout(function() {
    map.setZoom(14);
  }, 4000);
  /************************************************
    添加工具条、比例尺控件
  *************************************************/
  map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL }));
}
