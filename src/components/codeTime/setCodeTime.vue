<template>
	<div class="showblock ">
		<el-col :span="12">
			<code-time-item :text="$t('notice.codetime.qrMaxCount')" :c-value="qrMaxCount" :danwei="$t('formCheck.time.times')" @svalue="getMaxCount"></code-time-item>
		</el-col>
		<el-col :span="12">
			<code-time-item :text="$t('notice.codetime.qrMaxDuration')" :c-value="qrMaxDuration" :danwei="$t('formCheck.time.day')" @svalue="getMaxDuration"></code-time-item>
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