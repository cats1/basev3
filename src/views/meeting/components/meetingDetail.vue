<template>
	<div class="box-section">
		<el-tabs type="border-card">
		  <el-tab-pane>
		    <span slot="label">发起会议</span>
		    <send-invite></send-invite>
		  </el-tab-pane>
		  <el-tab-pane label="会议邀请记录">
		  	<invite-list :mid="mid"></invite-list>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import sendInvite from './sendInvite'
import inviteList from './inviteList'
export default{
  components: { sendInvite,inviteList },
  data () {
  	return {
  	  mid: ''
  	}
  },
  created () {
  	this.mid = this.$route.params.mid
  	this.getMeetDetail()
  },
  methods: {
  	init () {},
  	getMeetDetail () {
  	  let newForm = {
  	  	mid: this.mid
  	  }
  	  this.$store.dispatch('getMeetingById',newForm).then(res => {
  	  	console.log(res)
  	  })
  	}
  }
}
</script>