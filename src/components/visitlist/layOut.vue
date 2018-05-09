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
  	this.$router.push({name: 'pro'})
  }
}
</script>