<template>
	<div >
    <calendar
      ref="calendar1"
      :lunar="calendar1.lunar" 
      :value="calendar1.value"
      :zero="true"
      @select="select"
      @selectMonth="selectMonth"
      @selectYear="selectYear"></calendar>
	</div>
</template>
<script>
import calendar from '@/components/calendar/calendar.vue'
import {formatDate} from '@/utils/index'
export default {
  components: {calendar},
  props: {
    value: {
      type: Date,
      default: new Date()
    }
  },
  data () {
  	return {
  	  value10: '',
      calendar1: {
        value: [], //默认日期
        lunar:false,
        zero: true,
        timestamp: Date.now()
      }
  	}
  },
  watch: {
    value (val) {
      this.initValue()
    }
  },
  created () {
    this.initValue()
  },
  methods: {
    initValue () {
      let year = this.value.getFullYear()
      let month = this.value.getMonth() + 1
      let day = this.value.getDate()
      this.calendar1.value = [year,month,day]
    },
  	select(value) {
      this.$emit('select',value.join('-'))
    },
    selectMonth(month, year) {
        console.log(year, month)
    },
    selectYear(year) {
        console.log(year)
    },
  }
}
</script>