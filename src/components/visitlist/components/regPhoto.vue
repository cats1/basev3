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
  	rform (val) {
  	  console.log(val)
  	}
  },
  methods: {
  	regPhoto () {
  	  let nform = {
  	  	userid: getCache('userid'),
  	  	rids: [this.rform.rid]
  	  }
  	  this.$store.dispatch('updateResidentFace',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.rform.face = 0
  	  	} else {}
  	  })
  	}
  }
}
</script>