<template>
	<div class="hsection bgwhite marginbom20 boxshadow paddinglr20 paddingtb20">
		<p class="hstitle">
			<span class="version">{{version}}</span>
			<span class="newlogo" v-show="isNewShow">{{$t('newtext')}}</span>
			<span class="hsdate">{{dates}}</span>
		</p>
		<div class="hbody paddingtb20">
	      <slot></slot>
	    </div>
	</div>
</template>
<script>
export default {
  props: {
  	vtitle: {
  	  type: String,
  	  default: ''
  	},
  	vdate: {
  	  type: String,
  	  default: ''
  	},
  	isNew: {
  	  type: Boolean,
  	  default: false
  	}
  },
  data () {
  	return {
  	  version: this.vtitle,
  	  dates: this.vdate,
  	  isNewShow: this.isNew
  	}
  },
  watch: {
  	vtitle (val) {
  	  this.version = val
  	},
  	vdate (val) {
  	  this.dates = val
  	},
  	isNew (val) {
  	  this.isNewShow = val
  	}
  }
}
</script>