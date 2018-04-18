<template>
	<div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '360px'
    },
    height: {
      type: String,
      default: '360px'
    }/*,
    piedata: {
      type: Array,
      default: []
    }*/
  },
  data () {
    return {
      chart: null,
      legendData: [],
      pieDate: []
    }
  },
  created () {
    this.getLegendData()
    this.getPieDate()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getPieDate () {
      let _self = this
      /*this.piedata.forEach(function(element, index) {
        let obj = {
          value: element.vcount,
          name: element.company
        }
        _self.pieDate.push(obj)
      })*/
    },
    getLegendData () {
      let _self = this
      /*this.piedata.forEach(function(element, index) {
        _self.legendData.push(element.company)
      })*/
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      const xAxisData = []
      const data = []
      const data2 = []
      for (let i = 0; i < 50; i++) {
        xAxisData.push(i)
        data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
      }
      this.chart.setOption(
        {
          title : {
              text: '拜访类型',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
              show : false,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true, 
                      type: ['pie', 'funnel'],
                      option: {
                          funnel: {
                              x: '25%',
                              width: '50%',
                              funnelAlign: 'left',
                              max: 1548
                          }
                      }
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : false,
          series : [
              {
                  name:'拜访类型',
                  type:'pie',
                  radius : '30%',
                  center: ['40%', '50%'],
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1548, name:'搜索引擎'}
                  ]
              }
          ]
        })
    }
  }
}
</script>