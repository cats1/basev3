<template>
	<div>
		<reg-nav></reg-nav>
		<transition name="fade" mode="out-in">
	      <router-view></router-view>
	    </transition>
	</div>
</template>
<script>
import regNav from '@/components/headnav/regnav'
import stepOne from './stepOne'
export default {
  components: { stepOne,regNav },
  data () {
  	return {
      form: {
      	company: ''
      },
      imgSrc: require('@/assets/img/guide-logo.png')
  	}
  },
  methods: {
  	goNext () {
  	  this.$router.push({path:'two'})
  	}
  }
}	
</script>