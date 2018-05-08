<template>
	<div>
	  <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
export default {
  data () {
  	return {}
  },
  mounted () {
  	let subAccount = parseInt(getCache('subAccount')) || 0
  	if (subAccount === 0) {
  	  this.$router.push({name: 'group'})
  	} else {
      this.$router.push({name: 'emplist'})
  	}
  }
}
</script>