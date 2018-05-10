<template>
	<div>
		<p v-show="rform.face !== 0">{{$t('faceError')}}</p>
        <el-button type="primary" @click="regPhoto">{{$t('regPhoto')}}</el-button>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
  	rform: {
  	  type: Object,
  	  default: {}
  	}
  },
  data () {
  	return {

  	}
  },
  watch: {
  	rform (val) {}
  },
  methods: {
  	regPhoto () {
  	  let nform = {
  	  	userid: getCache('userid'),
  	  	empids: [this.rform.empid]
  	  }
  	  this.$store.dispatch('updateFace',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.rform.face = 0
  	  	}
  	  })
  	}
  }
}
</script>