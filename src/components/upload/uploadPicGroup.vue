<template>
  <div>
    <template v-if="ctype === '0'">
      <photo-preview :imgsrc="logoSrc" :imgtype="ctype" @resdele="changeDele"></photo-preview>
    </template>
    <template v-if="ctype === '1'">
      <template v-for="(citem,index) in logoSrc">
        <photo-preview :imgsrc="citem" :index="index" :imgtype="ctype" @resdele="changeDele"></photo-preview>
      </template>
    </template>
    <template v-if="ctype === '0'">
      <p>{{$t('picTips.logotip')}}</p>
    </template>
    <template v-else-if="ctype === '1'">
      <p>{{$t('picTips.slidetip')}}</p>
    </template>
    <upload-pic-btn class="margintop20" :imgtype="ctype" @sendkit="getLogoSrc"></upload-pic-btn>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {uploadCommon} from '@/utils/upload'
import photoPreview from '@/components/photo/photoPreview'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
   components: { photoPreview,uploadPicBtn },
   props: ['ctype'],
   data() {
      return {
        //logoSrc: getCache('logo')
        length: this.logoSrc.length
      }
    },
    computed: {
      logoSrc () {
        if (this.ctype === '0') {
          return getCache('logo')
        } else {
          return stringToArray(getCache('backgroundPic'))
        }
      }
    },
    methods: {
      changeDele (url,index){
        if (url != '') {
          this.logoSrc.splice(index,1)
        }
      },
      getLogoSrc (url) {
        if (this.ctype === '0') {
          let nForm = {
            userid: getCache('userid'),
            logoUrl: url,
          }
          this.$store.dispatch('UpdateLogo',nForm).then(res => {
            let {status} = res
            if (status === 0) {
              this.logoSrc = url
            }
          })
        } else if (this.ctype === '1') {
          this.logoSrc.push(url)
          let nForm = {
            userid: getCache('userid'),
            bgPicUrl: arrayToString(this.logoSrc),
          }
          this.$store.dispatch('UploadBackgroundPic',nForm).then(res => {
            let {status} = res
            if (status === 0) {
              this.$set(this.logoSrc,this.length,url)
              //this.logoSrc = this.logoSrc
            }
          })
        }
        
      }
    }
}
</script>