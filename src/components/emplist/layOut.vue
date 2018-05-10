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
    console.log(this.$route)
    /*let subAccount = parseInt(getCache('subAccount')) || 0
  	if (this.$route.name !== 'exportset') {
      if (subAccount === 0) {
        this.$router.push({name: 'group'})
      } else {
        this.$router.push({name: 'emplist'})
      }
    } else {
      if (subAccount === 0) {
        this.$router.push({path: 'group',query: {
          etype: 2
        }})
      } else {
        this.$router.push({name: 'emplist',query: {
          etype: 0
        }})
      }
    }*/
  }
}
</script>