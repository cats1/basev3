<template>
  <el-collapse-transition>
      <div v-show="pieShow" :class="className" :id="id" :style="{height:height,width:width}"></div>
  </el-collapse-transition>	
</template>
<script>
import echarts from 'echarts'
import {formatDate} from '@/utils/index'
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
      default: '630px'
    },
    height: {
      type: String,
      default: '590px'
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
      pieDate: [],
      pieShow: false,
      xData: [],
      yData: []
    }
  },
  watch: {
    piedata (val) {
      this.pieDate = val
      if (this.pieDate.length>0) {
        this.setdata()
        this.pieShow = true
      } else {
        this.pieShow = false
      }
    } 
  },
  created () {},
  mounted() {
    if (this.piedata.length>0) {
      this.setdata()
      this.pieShow = true
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setdata () {
      let _self = this
      let xData = []
      let yData = []
      let datas = []
      this.piedata.forEach(function(element, index) {
        let hit = 0
        let dates = element.appointmentDate ? new Date(element.appointmentDate) : new Date(element.visitdate)
        datas.forEach(function(ele,eindex){
          if (ele.x === formatDate(dates,'yyyy-MM-dd')) {
            ele.y++
            hit = 1
          }
        })
        if (hit === 0) {
          let obj = {
            x: formatDate(dates,'yyyy-MM-dd'),
            y: 1
          }
          datas.push(obj)
        }
      })
      datas.forEach(function(element, index) {
        xData.push(element.x)
        yData.push(element.y)
      })
      this.xData = xData
      this.yData = yData
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(
        {
          title : {
            text: '访客数据',
            x: 'center'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            show: false,
            data:['访客数据']
          },
          toolbox: {
              show : false,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : this.xData
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'访客数据',
                  type:'line',
                  stack: '访客数量',
                  data:this.yData
              }
          ]
        })
    }
  }
}
</script>