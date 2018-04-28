<template>
	<div class="box-section">
		<el-date-picker
	      v-model="date"
	      align="right"
	      type="date"
	      :placeholder="$t('vdate[2]')" format="yyyy-MM-dd"
	      :picker-options="pickerOptions1" @change="sendVal">
	  </el-date-picker>
	</div>
</template>
<script>
export default {
  props: ['setDate'],
  data () {
  	return {
      date: this.setDate,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
  	}
  },
  methods: {
    sendVal (val) {
      this.$emit('getkit',val)
    }
  }
}
</script>