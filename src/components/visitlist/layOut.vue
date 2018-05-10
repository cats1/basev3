<template>
	<div>
	  <template v-if="vtype==='com'">
      <com-list @typekit="getVtype"></com-list>
    </template>
    <template v-else>
      <project-list @typekit="getVtype"></project-list>
    </template>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import comList from './comList'
import projectList from './projectList'
export default {
  components: {comList,projectList},
  data () {
  	return {
      vtype: 'pro'
    }
  },
  mounted () {
    let vtype = this.$route.params.vtype
    if (vtype) {
      this.vtype = vtype
    } else {
      this.vtype = 'pro'
    }
  },
  methods: {
    getVtype (val) {
      console.log(val)
      console.log(this.vtype)
      this.vtype = val
      console.log(this.vtype)
    }
  }
}
</script>