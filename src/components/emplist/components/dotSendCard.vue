<template>
  <div class="btnsection">
  	<el-button type="redline" @click="doSend"><i class="fa fa-podcast"></i>{{$t('btn.dotSendCard')}}</el-button>
  	<el-dialog :title="$t('btn.dotSendCard')" :visible.sync="dialogVisible"
    width="30%" >
  	  <span>{{$t('emplist.cardTip')}}</span>
	  <span slot="footer" class="dialog-footer">
	  	<el-button type="primary" @click="sendCard">{{$t('btn.confirmBtn')}}</el-button>
	    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
	  </span>
  	</el-dialog>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {
  	  dialogVisible: false
  	}
  },
  methods: {
  	doSend () {
  	  this.dialogVisible = true
  	},
  	sendCard () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('SynchronCardNo',nform).then(res => {
  	  	let {status} = res
  	  	if (status === 0) {
  	  	  this.dialogVisible = false
  	  	}
  	  })
  	}
  }
}
</script>