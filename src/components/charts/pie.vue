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
    },
    piedata: {
    	type: Array,
    	default: []
    }
  },
  data () {
  	return {
      chart: null,
      legendData: [],
      pieDate: []
  	}
  },
  created () {
  	console.log(this.piedata)
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
        	tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
		    legend: {
		        orient : 'horizontal',
		        x : 'center',
		        y: 'bottom',
		        data: this.legendData
		    },
		    toolbox: {
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : false,
		    series : [
		        /*{
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius : [0, 60],
		            
		            // for funnel
		            x: '20%',
		            width: '40%',
		            funnelAlign: 'right',
		            max: 1548,
		            
		            itemStyle : {
		                normal : {
		                    label : {
		                        position : 'inner'
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:[
		                {value:335, name:'直达'},
		                {value:679, name:'营销广告'},
		                {value:1548, name:'搜索引擎', selected:true}
		            ]
		        },*/
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : [80, 100],
		            x: '60%',
		            width: '35%',
		            funnelAlign: 'left',
		            max: 1048,		            
		            data: this.pieDate
		        }
		    ]
        })
    }
  }
}
</script>