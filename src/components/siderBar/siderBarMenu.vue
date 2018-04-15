<template>
  <div class="sider-bar-menu">
  	<div class="bar-menu-head">{{header}}</div>
  	<slot></slot>
  </div>
</template>
<script>
export default {
  props: {
  	header: {
  	  type: String,
  	  default: ''
  	}
  },
  data () {
  	return {}
  }
}
</script>