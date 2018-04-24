<template>
	<div class="btnsection">
		<el-button type="redline" @click="sendFace"><i class="fa fa-picture-o"></i>{{$t('btn.sendFaceBtn')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {}
  },
  methods: {
  	sendFace () {
  		let nform = {
  		  userid: getCache('userid')
  		}
  	    this.$store.dispatch('updateAllResidentFace',nform)
  	}
  }
}
</script>