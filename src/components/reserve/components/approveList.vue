<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<h3>{{$t('approve.astitle')}}</h3>
		<template v-for="item in list">
			<approve-item :aitem="item" class="margintop20" @deletekit="deleteArea" @updatekit="updateArea" @savekit="updateArea"></approve-item>
		</template>
    <template v-if="addAreaIsShow">
      <add-item class="margintop20" @addkit="getAdd" ></add-item>
    </template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import approveItem from './approveItem'
import addItem from './addItem'
export default {
  components: { addItem,approveItem },
  data () {
  	return {
  	  list: [],
      addAreaIsShow: process.env.addAreaIsShow
  	}
  },
  mounted () {
  	this.getApproveList()
  },
  methods: {
  	getAdd () {
  	  this.getApproveList()
  	},
  	deleteArea () {
  	  this.getApproveList()
  	},
  	updateArea () {
  	  this.getApproveList()
  	},
  	getApproveList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getProcessArea',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.list = result
  	  	}
  	  })
  	}
  }
}
</script>