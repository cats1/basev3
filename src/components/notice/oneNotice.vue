<template>
	<div class="noticewrap">
      <div class="noticeheader">
      	<span class="noticeicon" v-show="nIcon">
      		<img :src="nIcon" alt="">
      	</span>
      	<span class="noticetext">
          <h3>{{nTitle}}</h3>
		  <p>{{nDesc}}</p>
      	</span>
      	<span class="noticeswitch">
      	  <el-switch v-model="switchFlag">
		  </el-switch>
      	</span>
      </div>		
	</div>
</template>
<script>
export default {
  props: ['switchFlag', 'nTitle', 'nDesc', 'nIcon'],
  data () {
    return {}
  }
}
</script>
<style></style>
