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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
  	return {
      chart: null,
      legendData: [],
      pieDate: []
  	}
  },
  created () {},
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
      this.piedata.forEach(function(element, index) {
      	let obj = {
      		value: element.vcount,
      		name: element.company
      	}
      	_self.pieDate.push(obj)
      })
  	},
  	getLegendData () {
  	  let _self = this
      this.piedata.forEach(function(element, index) {
      	_self.legendData.push(element.company)
      })
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
          title: {
            text: "对数轴示例",
            x: "center"
          },
          tooltip: {
             trigger: "item",
             formatter: "{a} <br/>{b} : {c}"
          },
          legend: {
             x: 'left',
             data: ["2的指数", "3的指数"]
          },
          xAxis: [
             {
                 type: "category",
                 name: "x",
                 splitLine: {show: false},
                 data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
             }
          ],
           yAxis: [
               {
                   type: "log",
                   name: "y"
               }
           ],
           toolbox: {
               show: true,
               feature: {
                   mark: {
                       show: true
                   },
                   dataView: {
                       show: true,
                       readOnly: true
                   },
                   restore: {
                       show: true
                   },
                   saveAsImage: {
                       show: true
                   }
               }
            },
            calculable: true,
            series: [
                 {
                     name: "3的指数",
                     type: "line",
                     data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]

                 },
                 {
                     name: "2的指数",
                     type: "line",
                     data: [1, 2, 4, 8, 16, 32, 64, 128, 256]

                 }
            ]
        })
    }
  }
}
</script>