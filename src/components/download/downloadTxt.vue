<template>
  <el-button @click="downloadTxt"><i class="fa fa-cloud-download"></i>下载模板</el-button>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
  	txtUrl: {
  	  type: String,
  	  default: ''
  	}
  },
  data () {
  	return {
  	  urlTxt: this.txtUrl
  	}
  },
  watch: {
  	txtUrl (val) {
  	  this.urlTxt = val
  	}
  },
  methods: {
  	downloadTxt () {
  	    $.ajax({
	      url: "http://danaher.jototech.cn/txt/calendar.txt",
	      success: window.download.bind(true, "text/plain", "calendar.txt")
	    });
  	}
  }
}
</script>