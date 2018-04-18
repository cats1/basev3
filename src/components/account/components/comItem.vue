<template>
	<div class="comitemwrap" @mouseover="deHover" @mouseout="outHove">
		<el-row >
			<el-col :span="2">
				<span class="comlogo">
					<img :src="logo" alt="">
				</span>
			</el-col>
			<el-col :span="4">
				<span class="comname">{{name}}</span>
			</el-col>
			<transition name="el-zoom-in-center">
				<el-col :span="10" v-show="editShow">
					<el-button type="text" @click="updateCom">{{$t('btn.updateBtn')}}</el-button>|
					<el-button type="text" @click="deleteCom">{{$t('btn.deleteBtn')}}</el-button>|
					<el-button type="text" @click="initPwd">{{$t('btn.initPwdBtn')}}</el-button>
				</el-col>
			</transition>
		</el-row>
	</div>
</template>
<script>
export default {
  props: {
  	data: {
  	  type: Object,
  	  default: {}
  	},
  	index: {
  	  type: Number,
  	  default: 0
  	}
  },
  data () {
  	return {
  	  editShow: false
  	}
  },
  computed: {
  	logo () {
      return this.data.logo ? this.data.logo : require('@/assets/img/com-default.jpg')
  	},
  	name () {
      return this.data.companyName
  	}
  },
  methods: {
  	deHover () {
      this.editShow = true
  	},
  	outHove () {
  	  this.editShow = false
  	},
  	updateCom () {
  	  this.$emit('sendupdate',this.data,this.index)
  	},
  	deleteCom () {
  	  this.$confirm(this.$t('notice.coms.deletetip.desc'), this.$t('notice.coms.deletetip.title'), {
          confirmButtonText: this.$t('btn.confirmBtn'),
          cancelButtonText: this.$t('btn.cancelBtn'),
          type: 'warning'
        }).then(() => {
          let nform = {
	  	  	id: this.data.id
	  	  }
          this.$store.dispatch('delSubAccount',nform).then(res => {
          	let {status} = res
          	if (status === 0) {
          	  this.$emit('senddelete',this.data,this.index)
          	}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('btn.haveCancel')
          })        
      })
  	},
  	initPwd () {
  	  let nform = {
  	  	id: this.data.id,
  	  	password: '888888'
  	  }
  	  this.$store.dispatch('resetSubAccountPwd',nform)
  	  //this.$emit('sendinitpwd',this.data,this.index)
  	}
  }
}
</script>