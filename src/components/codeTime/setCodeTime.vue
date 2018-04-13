<template>
	<div class="showblock ">
		<el-col :span="12">
			<code-time-item text="二维码最大使用次数:" :c-value="qrMaxCount" danwei="次" @svalue="getMaxCount"></code-time-item>
		</el-col>
		<el-col :span="12">
			<code-time-item text="二维码最长使用时间:" :c-value="qrMaxDuration" danwei="天" @svalue="getMaxDuration"></code-time-item>
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
      qrMaxCount: getCache('qrMaxCount'),
      qrMaxDuration: getCache('qrMaxDuration')
  	}
  },
  methods: {
  	saveTime () {
  	  let newForm = {
  	  	qrMaxCount: this.qrMaxCount,
        qrMaxDuration: this.qrMaxDuration,
        userid: getCache('userid')
  	  }
  	  this.$store.dispatch('updateQrcodeConf',newForm)
  	},
  	getMaxCount (val,oldval) {
  		this.qrMaxCount = val
  	},
  	getMaxDuration (val,oldval) {
  		this.qrMaxDuration = val
  	}
  }
}
</script>