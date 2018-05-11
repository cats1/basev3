<template>
	<div class="baseversion">
		<h3>{{name}}</h3>
		<img :src="src" alt="">
		<p v-show="userType!=='0'">{{endTime | formatDate}}</p>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import { formatDate } from '@/utils'
export default {
  name: 'version',
  data () {
  	return {
      endTime: getCache('expireDate')
    }
  },
  computed: {
  	userType: {
  	  get () {
  	  	return getCache('userType')
  	  },
  	  set () {}
  	},
  	name: {
  	  get () {
  	  	if (this.userType === '0') {
  	  	  return this.$t('version[0].name')
  	  	} else if (this.userType === '3') {
  	  	  return this.$t('version[2].name')
  	  	} else {
  	  	  return this.$t('version[1].name')
  	  	}
  	  },
  	  set () {}
  	},
  	src: {
  	  get () {
  	  	if (this.userType === '0') {
  	  	  return require('@/assets/img/v1.png')
  	  	} else if (this.userType === '3') {
  	  	  return require('@/assets/img/v3.png')
  	  	} else {
  	  	  return require('@/assets/img/v2.png')
  	  	}
  	  },
  	  set () {}
  	}
  },
  filters:{
    formatDate (time) {
      let date = new Date(parseInt(time))
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>