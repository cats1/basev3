<template>
	<div class="mdetailwrap">
		<el-tabs type="border-card">
		  <el-tab-pane @tab-click="mobanShow === true">
		    <span slot="label">{{$t('moban.text')}}</span>
		    <send-invite :mid="form.mid" :isshow="mobanShow"></send-invite>
		  </el-tab-pane>
		  <el-tab-pane @tab-click="mobanShow === false">
        <span slot="label">{{$t('moban.text1')}}</span>
		  	<invite-list :mid="form.mid"></invite-list>
		  </el-tab-pane>
		</el-tabs>
    <div class="goback" @click="goPrev"><i class="fa  fa-reply"></i></div>
	</div>
</template>
<script>
import sendInvite from './sendInvite'
import inviteList from './inviteList'
export default{
  components: { sendInvite,inviteList },
  data () {
  	return {
      form: {
        mid: ''
      },
      mobj: {},
      mobanShow: true
  	}
  },
  created () {
  	this.form.mid = this.$route.params.mid
  },
  methods: {
  	init () {},
    goPrev () {
      if (this.$route.name == 'empmdetail') {
        this.$router.push({name:'empmeeting'})
      } else {
        this.$router.push({name:'meeting'})
      }
    }
  }
}
</script>