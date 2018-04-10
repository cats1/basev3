<template>
	<div class="img-code-wrap">
		<img :src="code" alt="">
		<el-button type="text" @click="getCode">换个验证码？</el-button>
	</div>
</template>
<script>
export default {
  name: 'ImgCode',
  data () {
  	return {
  		code: '',
  		digest: ''
  	}
  },
  computed: {
  },
  created () {
  	this.getCode()
  },
  methods: {
  	getCode () {
  		this.$store.dispatch('getCode').then((data) => {
  		   let base64Str = data.result.base64Str
  		   this.code = "data:image/png;base64," + base64Str
  		   this.digest = data.result.digest
  		   this.$emit('clickit', data.result)
  	    })
  	}
  },
  mounted () {}
}
</script>
<style scoped></style>