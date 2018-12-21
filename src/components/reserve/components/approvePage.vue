<template>
	<div class="marginbom20">
      <approve-switch class="bgwhite"></approve-switch>
      <template v-if="addAreaIsShow">
        <approve-cbc></approve-cbc>
      </template>
      <template v-else-if="approveIsMore">
      	<approve-more class="bgwhite"></approve-more>	        
      </template>
      <template v-else>
        <approve-list class="bgwhite"></approve-list> 
      </template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import approveSwitch from './approveSwitch'
import approveMore from './approveMore'
import approveList from './approveList'
import approveCbc from './approveCbc'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { approveSwitch,approveList,approveCbc,approveMore },
  data () {
  	return {
  	  addAreaIsShow: process.env.addAreaIsShow || false,
      approveIsMore: process.env.approveIsMore || false
  	}
  },
  methods: {}
}
</script>