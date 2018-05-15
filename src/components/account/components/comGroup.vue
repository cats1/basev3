<template>
	<div>
    <template v-if="comlist.length === 0">
      <no-company @addkit="getAdd"></no-company>
    </template>
    <template v-else>
      <has-company :com-array="comlist" @addkit="getAdd"></has-company>
    </template>
	</div>
</template>
<script>
import noCompany from './noCompany'
import hasCompany from './hasCompany'
import {getCache} from '@/utils/auth'
export default {
  components: {noCompany,hasCompany},
  data () {
  	return {
  	  comlist: [],
      dialogVisible: false,
      etype: 0,
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
  	},
    getAdd () {
      this.getList()
    }
  },
  mounted () {
  	this.getList()
  }
}
</script>