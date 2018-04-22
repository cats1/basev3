<template>
	<div class="mdetailwrap">
		<el-tabs type="border-card">
		  <el-tab-pane>
		    <span slot="label">发起会议</span>
		    <send-invite :mid="mid" :isshow="mobanShow"></send-invite>
		  </el-tab-pane>
		  <el-tab-pane label="会议邀请记录">
		  	<invite-list :mid="mid"></invite-list>
		  </el-tab-pane>
		</el-tabs>
    <div class="goback"><i class="fa  fa-reply"></i>返回</div>
	</div>
</template>
<script>
import sendInvite from './sendInvite'
import inviteList from './inviteList'
export default{
  components: { sendInvite,inviteList },
  data () {
  	return {
  	  mid: '',
      mobanShow: true
  	}
  },
  created () {
  	this.mid = this.$route.params.mid
  },
  methods: {
  	init () {}
  }
}
</script>