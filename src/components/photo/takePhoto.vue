<template>
	<div style="width:100%;height:300px;display:block">
       <template v-if="photoType == 0">
          <html5-photo @uploaddata="getHtmlUpload"></html5-photo>
       </template>
       <template v-else-if="photoType == 1">
          <ie-photo @uploaddata="getIeUpload"></ie-photo>
       </template>
    </div>
</template>
<script>
import html5Photo from './html5Photo'
import iePhoto from './iePhoto'
import { isIE } from '@/utils/common'

export default {
  components: {html5Photo,iePhoto},
  data () {
  	return {
      photoType: 0
    }
  },
  created () {
    if (isIE()) {
      this.photoType == 1
    } else {
      this.photoType == 0
    }
  },
  mounted () {

  },
  methods: {
    getHtmlUpload (data) {
      this.$emit('sendphoto',data.url)
    },
    getIeUpload (url) {
      this.$emit('sendphoto',url)
    }
  }
}
</script>
