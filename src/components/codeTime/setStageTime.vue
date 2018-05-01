<template>
	<div class="showblock ">
		<el-col :span="12">
			<code-time-item :text="$t('notice.stagetime.preExtendTime')" :c-value="preExtendTime" :danwei="$t('formCheck.time.minute')" @svalue="getpreExtendTime"></code-time-item>
		</el-col>
		<el-col :span="12">
			<code-time-item :text="$t('notice.stagetime.latExtendTime')" :c-value="latExtendTime" :danwei="$t('formCheck.time.minute')" @svalue="getlatExtendTime"></code-time-item>
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