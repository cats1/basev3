<template>
	<div class="showblock ">
		<el-col :span="24">
			<code-time-item :text="$t('notice.stageouttime.text')" :c-value="leaveExpiryTime" :danwei="$t('formCheck.time.minute')" @svalue="getpreExtendTime"></code-time-item>
		</el-col>
		<el-button type="primary" @click="saveTime">{{$t('btn.saveBtn')}}</el-button>
	</div>
</template>
<script>
import codeTimeItem from './codeTimeItem'
import { getCache } from '@/utils/auth'
export default {
  components: { codeTimeItem },
  data () {
  	return {
      leaveExpiryTime: getCache('leaveExpiryTime')
  	}
  },
  methods: {
  	saveTime () {
  	  let newForm = {
  	  	leaveExpiryTime: this.leaveExpiryTime,
        userid: getCache('userid')
  	  }
  	  this.$store.dispatch('updateLeaveExpiryTime',newForm)
  	},
  	getpreExtendTime (val) {
  		this.leaveExpiryTime = val
  	}
  }
}
</script>