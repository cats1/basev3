<template>
	<div>
		<template v-if="subAccount===0">
			<group-list></group-list>
		</template>
		<template v-else>
			<emp-list></emp-list>
		</template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import empList from './empList'
import groupList from './groupList'
export default {
  components: {empList,groupList},
  data () {
  	return {
  	  subAccount: parseInt(getCache('subAccount')) || 0
  	}
  },
  mounted () {}
}
</script>