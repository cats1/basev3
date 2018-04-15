<template>
	<div>
	  <!-- <photo-preview :imgsrc='imgSrc' @getkit="updatePhoto"></photo-preview>
	  <p>{{$t('notice.clogo.tip')}}</p>
	  <upload-pic-btn></upload-pic-btn> -->
	</div>
</template>
<script>
//import photoPreview from '@/components/photo/photoPreview'
import {getCache} from '@/utils/auth'
//import { uploadPicBtn } from '@/components/upload'
export default {
  //components: { photoPreview,uploadPicBtn },
  data () {
  	return {
      imgSrc: getCache('logoUrl') || require('@/assets/img/webchatv1.png')
  	}
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    methods: {
	  updatePhoto (val) {
	  	console.log(val)
	  }
    }
  }
}
</script>