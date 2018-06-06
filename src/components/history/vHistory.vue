<template>
	<!-- <router-link to="history"> -->
	<div class="versionrecord" @click="goHistory">
		<div class="versionleft">
			<div class="versionright">
				<div class="versionmiddle versionmes">v2.1.0
			    </div>
		    </div>
	    </div>
    </div>
    <!-- </router-link> -->
</template>
<script>
export default {
  data () {
  	return {}
  },
  methods: {
  	goHistory () {
  	  window.location.href = 'history.html'
  	}
  }
}
</script>