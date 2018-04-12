<template>
	<div class="box-section">
		<el-date-picker
	      v-model="date"
	      align="right"
	      type="date"
	      placeholder="选择日期"
	      :picker-options="pickerOptions1">
	    </el-date-picker>
	    <icon-svg icon-class="password" />
	</div>
</template>
<script>
export default {
  data () {
  	return {
      date: new Date(),
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
  	}
  },
  created () {},
  mounted () {},
  methods: {
  	getSignVisitor () {

  	}
  }
}
</script>