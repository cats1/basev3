<template>
	<div class="showblock ">
		<el-col :span="12">
			<code-time-item text="预约时间前:" :c-value="preExtendTime" danwei="分钟" @svalue="getpreExtendTime"></code-time-item>
		</el-col>
		<el-col :span="12">
			<code-time-item text="预约时间后:" :c-value="latExtendTime" danwei="分钟" @svalue="getlatExtendTime"></code-time-item>
		</el-col>
		<el-button type="primary" @click="saveTime">保存</el-button>
	</div>
</template>
<script>
import codeTimeItem from './codeTimeItem'
import { getCache } from '@/utils/auth'
export default {
  components: { codeTimeItem },
  data () {
  	return {
      preExtendTime: getCache('preExtendTime'),
      latExtendTime: getCache('latExtendTime')
  	}
  },
  methods: {
  	saveTime () {
  	  let newForm = {
  	  	preExtendTime: this.preExtendTime,
        latExtendTime: this.latExtendTime,
        userid: getCache('userid')
  	  }
  	  this.$store.dispatch('updateExtendTime',newForm)
  	},
  	getpreExtendTime (val) {
  		this.preExtendTime = val
  	},
  	getlatExtendTime (val) {
  		this.latExtendTime = val
  	}
  }
}
</script>