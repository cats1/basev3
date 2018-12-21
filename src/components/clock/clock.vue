<template>
  <div>
  	<i>{{curTime}}</i>
  </div>
</template>
<script>
import { formatDate } from '@/utils/index'
export default {
  props: {
  	vshow: {
  	  type: Boolean,
  	  default: false
  	}
  },
  data () {
  	return {
  	  curTime: '',
  	  interval: null
  	}
  },
  watch: {
  	vshow (val) {
  	  if (val) {
  	  	this.nowTimes()
  	  }
  	}
  },
  methods: {
  	formatDate: formatDate,
  	nowTimes(){
      let date = new Date()
      let dates = this.formatDate(date,'yyyy.MM.dd hh:mm:ss')
      let myddy = date.getDay()
      let weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
      let days = weekday[myddy]     
      this.interval = setInterval(this.nowTimes,1000)
      this.curTime = dates + ' ' + days
    },
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
i{
    font-size:12px;
}
</style>