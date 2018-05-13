<template>
	<div class="marginbom20">
      <approve-switch class="bgwhite"></approve-switch>
      <approve-list class="bgwhite"></approve-list>	
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import approveSwitch from './approveSwitch'
import approveList from './approveList'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { approveSwitch,approveList },
  data () {
  	return {}
  },
  methods: {}
}
</script>