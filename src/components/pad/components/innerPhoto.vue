<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.innerphoto.title')" :n-desc="$t('notice.innerphoto.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.innerphoto.dialog.title')"
      :visible.sync="isShow"
      width="80%" >
      <div class="quillcons">
        <template v-for="(item,index) in dphotoArray">
          <photo-item :sarray="dphotoArray" :index="index" :img-src="item" @replacekit="updatePhoto" @deletekit="getDelete" ></photo-item>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean,stringToArray,arrayToString} from '@/utils/common'
import photoItem from '@/components/photo/photoItem'
export default {
  components: { oneNotice, photoItem },
  data () {
    return {
      imgSrc: require('@/assets/img/cphoto.png'),
      isShow: false,
      dphotoArray: [],
      srcBlank: '',
      form: {
        secureProtocol: getCache('secureProtocol'),
        userid: getCache('userid')
      }
    }
  },
  watch: {
    dphotoArray (val) {
      console.log(val)
    }
  },
  created () {
    let varray = stringToArray(getCache('defaultPhoto'))
    let _self = this
    varray.forEach(function(element, index) {
      if (element!='') {
        _self.dphotoArray.push(element)
      }
    })
    if (this.dphotoArray.length < 4) {
      this.dphotoArray.push('')
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    getDelete (url,index) {
      this.dphotoArray.splice(index,1)
      if (this.dphotoArray.length < 4) {
        this.dphotoArray.push('')
      }
      this.UpdateDefaultPhoto()
    },
    updatePhoto (val,index) {
      this.$set(this.dphotoArray,index,val)
      if (this.dphotoArray.length < 4) {
        this.dphotoArray.push('')
      }
      this.UpdateDefaultPhoto()
    },
    UpdateDefaultPhoto () {
      let _self = this
      let varray = []
      this.dphotoArray.forEach(function(element, index) {
        if (element!='') {
          varray.push(element)
        }
      })
      let nForm = {
          userid: getCache('userid'),
          defaultPhoto: arrayToString(varray)
        }
        this.$store.dispatch('UpdateDefaultPhoto',nForm).then(res => {
          let {status} = res
          if (status === 0) {
            if (varray.length < 4) {
              varray.push('')
            }
            this.dphotoArray = varray
          }
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.quillcons{
  overflow: hidden;
  min-height: 200px;
} 
</style>