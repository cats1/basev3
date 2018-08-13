<template>
	<!-- <router-link to="history"> -->
	<div class="versionrecord" @click="goHistory">
		<div class="versionleft">
			<div class="versionright">
				<div class="versionmiddle versionmes">{{version}}
			  </div>
		  </div>
	  </div>
  </div>
    <!-- </router-link> -->
</template>
<script>
export default {
  data () {
  	return {
      version: process.env.BASE_VERSION
    }
  },
  methods: {
  	goHistory () {
      this.$router.push({'path': 'history'})
  	}
  }
}
</script>