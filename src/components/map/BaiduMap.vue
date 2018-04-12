<template>
	<div id="baidumap" class="baidumap"></div>
</template>
<script>
import {createMap} from '@/utils/baiduMap'
export default {
  data () {
  	return {}
  },
  methods: {
  	createMap: createMap
  },
  created () {
  	this.createMap('baidumap')
  }
}
</script>