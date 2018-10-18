<template>
	<div class="marginbom20">
      <approve-switch class="bgwhite"></approve-switch>
      <template v-if="!addAreaIsShow">
      	<approve-list class="bgwhite"></approve-list>	
      </template>
      <template v-else>
      	<approve-cbc></approve-cbc>
      </template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import approveSwitch from './approveSwitch'
import approveList from './approveList'
import approveCbc from './approveCbc'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { approveSwitch,approveList,approveCbc },
  data () {
  	return {
  	  addAreaIsShow: process.env.addAreaIsShow || false
  	}
  },
  methods: {}
}
</script>