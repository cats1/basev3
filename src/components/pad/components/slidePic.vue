<template>
	<div class="marginbom20">
      <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.pics.title')" :n-desc="$t('notice.pics.desc')" ></one-notice>
          <div class="showbody marginlr20 paddingtb20 paddingl80 block">
            <template v-for="(item,index) in bgPicArray">
              <show-photo :ptype="1" class="marginlr20" :index="index" :img-src="item" @deletekit="changeDele"></show-photo>
            </template>
            
            <p>{{$t('picTips.slidetip')}}</p>
            <upload-pic-btn class="margintop20" :imgtype="1" @sendkit="getLogoSrc"></upload-pic-btn>
          </div>
        </div>        
      </notice-show>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean,stringToArray,arrayToString} from '@/utils/common'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
import {showPhoto} from '@/components/photo'
export default {
  components: { noticeShow, oneNotice, uploadPicBtn,showPhoto },
  data () {
  	return {
      imgSrc: require('@/assets/img/slides.png'),
      isShow: false,
      bgPicArray: [],
      logoSrc: getCache('logo')
  	}
  },
  created () {
    let varray = stringToArray(getCache('backgroundPic'))
    let _self = this
    varray.forEach(function(element, index) {
      if (element!='') {
        _self.bgPicArray.push(element)
      }
    })
    if (this.bgPicArray.length === 0) {
      this.bgPicArray.push('')
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    changeDele (url,index){
      this.bgPicArray.splice(index,1)
      this.updateBackPic()
    },
    getLogoSrc (url) {
      this.bgPicArray.push(url)
      this.updateBackPic()
    },
    updateBackPic () {
      let _self = this
      let varray = []
      this.bgPicArray.forEach(function(element, index) {
        if (element!='') {
          varray.push(element)
        }
      })
      let nForm = {
        userid: getCache('userid'),
        bgPicUrl: arrayToString(varray)
      }
      this.$store.dispatch('UploadBackgroundPic',nForm).then(res => {
        let {status} = res
        if (status === 0) {
          this.bgPicArray = varray
          if (this.bgPicArray.length === 0) {
            this.bgPicArray.push('')
          }
        }
      })
    }
  }
}
</script>