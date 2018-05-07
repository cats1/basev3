<template>
	<div class="login-container">
  <login-nav></login-nav>          
      <div class="form-container">
      	<template v-if="ftype === 1">
      	  <emp-forgot></emp-forgot>
      	</template>
      	<template v-else>
      	  <manager-forgot></manager-forgot>
      	</template>
      </div>           
  	</div>
</template>
<script>
import loginNav from '@/components/headnav/loginnav'
import { ManagerForgot,empForgot } from '@/components/forgot'
import {getQueryStringByName} from '@/utils/common'
export default {
  components: {ManagerForgot,empForgot,loginNav},
  data () {
  	return {
  	  ftype: 0
  	}
  },
  created () {
    let type = parseInt(getQueryStringByName('type'))
    if (type === 1) {
      this.ftype = 1
    } else {
      this.ftype = 0
    }
  }
}
</script>