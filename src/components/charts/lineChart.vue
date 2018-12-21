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
    ptitle: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '630px'
    },
    height: {
      type: String,
      default: '590px'
    },
    piedata: null
  },
  data () {
    return {
      chart: null,
      legendData: [],
      pieDate: [],
      pieShow: false,
      xData: [],
      yData: [],
      lineTitle: ''
    }
  },
  watch: {
    piedata (val) {
      this.pieDate = val
      if (this.pieDate.length>0) {
        this.lineTitle = this.ptitle === '' ? this.$t('visitData') : this.ptitle
        this.setdata()
        this.pieShow = true
      } else {
        this.pieShow = false
      }
    } 
  },
  created () {},
  mounted() {
    if (typeof this.piedata == 'object') {
      
    } else {
      if (this.piedata.length>0) {
        this.lineTitle = this.ptitle === '' ? this.$t('visitData') : this.ptitle
        this.setdata()
        this.pieShow = true
      }
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
      let pieArray = []
      if (this.piedata.constructor == Array) {
        pieArray = this.piedata
      } else {
        pieArray = this.piedata.list
      }
      pieArray.forEach(function(element, index) {
        let hit = 0
        let dates = element.appointmentDate ? new Date(element.appointmentDate) : new Date(element.appEntryDate)
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
            text: this.lineTitle,
            x: 'center'
          },
          color: ['#22cd67','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            show: false,
            data:[this.lineTitle]
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
                  name:this.lineTitle,
                  type:'line',
                  stack: this.$t('visitCount'),
                  data:this.yData
              }
          ]
        })
    }
  }
}
</script>