<template>
	<div class="login-container">
  <login-nav></login-nav>          
      <div class="form-container">
      	<template v-if="ftype === 1">
      	  <emp-forgot></emp-forgot>
      	</template>
      	<template v-else-if="ftype === 0">
      	  <manager-forgot></manager-forgot>
      	</template>
        <template v-else>
          <pwd-reset ></pwd-reset>
        </template>
      </div>           
  	</div>
</template>
<script>
import loginNav from '@/components/headnav/loginnav'
import { ManagerForgot,empForgot,pwdReset } from '@/components/forgot'
import {getQueryStringByName,getHtmlDocName} from '@/utils/common'
export default {
  components: {ManagerForgot,empForgot,pwdReset,loginNav},
  data () {
  	return {
  	  ftype: 0
  	}
  },
  created () {
    let docName = getHtmlDocName()
    if (docName === 'reset') {
      /*let email = getQueryStringByName('email')
      let digest = getQueryStringByName('digest')*/
      this.ftype = 2
    } else {
      let type = parseInt(getQueryStringByName('type'))
      if (type === 1) {
        this.ftype = 1
      } else {      
        this.ftype = 0
      }
    }
  }
}
</script>