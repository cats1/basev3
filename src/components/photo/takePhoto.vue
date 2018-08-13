<template>
	<div style="width:100%;height:300px;display:block">
       <template v-if="photoType == 0">
           <html5-photo></html5-photo>
       </template>
       <template v-else-if="photoType == 1">
           <ie-photo></ie-photo>
       </template>
    </div>
</template>
<script>
import html5Photo from './html5Photo'
import iePhoto from './iePhoto'
export default {
  components: {html5Photo,iePhoto},
  data () {
  	return {
      photoType: 1
    }
  },
  mounted () {}
}
</script>
