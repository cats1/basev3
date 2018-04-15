<template>
	<div>
		<template v-for="(item,index) in photoArray">
			<photo-item :imgsrc='item' :index="index" @getkit="updatePhoto"></photo-item>
		</template>
		<template v-if="photoArray.length < 4">
			<photo-item :index="photoArray.length - 1" @getdkit="updatePhoto"></photo-item>
		</template>
	</div>
</template>
<script>
import photoItem from './photoItem'
import { getCache } from '@/utils/auth'
import {stringToArray} from '@/utils/common'
export default {
  components: {photoItem},
  data () {
  	return {
  	  photoArray: stringToArray(getCache('defaultPhoto'))
  	}
  },
  methods: {
  	updatePhoto (val) {
  	  console.log(val)
  	}
  }
}
</script>