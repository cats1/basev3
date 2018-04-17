<template>
	<div>
		<h3>{{$t('notice.coms.dialog.title2')}}({{comlist.length}})</h3>
		<template v-for="(item,index) in comlist">
			<com-item :data="item" :index="index"></com-item>
		</template>
    <div>
      <el-button type="default">
      {{$t('btn.addComBtn')}}</el-button>
      <el-button type="primary">{{$t('btn.downMobanBtn')}}</el-button>
      <el-button type="primary">{{$t('btn.uploadComBtn')}}</el-button>
    </div>
	</div>
</template>
<script>
import comItem from './comItem'
import {getCache} from '@/utils/auth'
export default {
  components: {comItem},
  data () {
  	return {
  	  comlist: []
  	}
  },
  methods: {
  	getList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getSubAccountByUserid',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.comlist = result
  	  	}
  	  })
  	}
  },
  created () {
  	this.getList()
  }
}
</script>