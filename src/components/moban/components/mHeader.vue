<template>
	<div class="clearfix">
		<h2 class="marginbom20">{{mtitle}}</h2>
		<div class="moban-tag">{{mdesc}}</div>
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
  	return {
      mtitle: this.title,
      mdesc: this.desc
    }
  },
  watch: {
    title (val) {
      console.log(val)
      this.mtitle = val
    },
    desc (val) {
      this.mdesc = val
    }
  }

}
</script>