<template>
	<div class="clearfix">
		<h2 class="marginbom20">{{title}}</h2>
		<div class="moban-tag">{{desc}}</div>
	</div>
</template>
<script>
export default {
  props: {
  	title: {
  		type: String,
  		default: ''
  	},
  	desc: {
  		type: String,
  		default: ''
  	}
  },
  data () {
  	return {}
  }
}
</script>