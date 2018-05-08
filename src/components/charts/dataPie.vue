<template>
  <el-collapse-transition>
        <div v-show="pieShow" :class="className" :id="id" :style="{height:height,width:width}"></div>
  </el-collapse-transition>	
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    ptitle: {
      type: String,
      default: ''
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
      pieShow: false
    }
  },
  watch: {
    piedata (val) {
      this.pieDate = val
      if (this.pieDate.length>0) {
        this.pieShow = true
        this.initChart()
      } else {
        this.pieShow = false
      }
    } 
  },
  created () {},
  mounted() {
    if (this.piedata.length>0) {
      this.pieShow = true
      this.initChart()
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(
        {
          title : {
              text: this.ptitle === '' ? this.$t('visittype') : this.ptitle,
              x:'center'
          },
          color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
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
                  name: this.ptitle === '' ? this.$t('visittype') : this.ptitle,
                  type:'pie',
                  radius : '30%',
                  center: ['40%', '50%'],
                  data:this.pieDate
              }
          ]
        })
    }
  }
}
</script>