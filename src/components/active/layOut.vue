<template>
	<div class="login-container">
  <login-nav></login-nav>      
      <div class="form-container">
      	<emp-active></emp-active>
      </div>           
  	</div>
</template>
<script>
import loginNav from '@/components/headnav/loginnav'
import empActive from './empActive'
export default {
  components: {empActive,loginNav},
  data () {
  	return {
  	  ftype: 0
  	}
  }
}
</script>