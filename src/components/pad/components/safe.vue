<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.safe.title')" :n-desc="$t('notice.safe.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.safe.dialog.title')"
      :visible.sync="isShow"
      width="50%" >
      <div >
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 14}" v-model="form.secureProtocol">
        </el-input>
        <!-- <tinymce :height=400 ref="comeditor" v-model="form.secureProtocol" :img-show="false" :toolbar="profileToolbar" menubar="" @input="getcon"></tinymce> -->
      </div>
      <div class="margintop20" style="text-align:left;">
        <el-button type="primary" @click="saveSetting">{{$t('btn.saveBtn')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/tinymce'
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean,replaceRemoveReserveQuotation} from '@/utils/common'
import vueQuillEditor from '@/components/quill/quillEditor'
export default {
  components: { oneNotice, Tinymce },
  data () {
    return {
      imgSrc: require('@/assets/img/safes.png'),
      isShow: false,
      profileToolbar: ['insertfile undo redo | fontsizeselect| bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      | print preview fullpage | forecolor backcolor'],
      form: {
        secureProtocol: getCache('secureProtocol'),
        userid: getCache('userid')
      }
    }
  },
  created () {
    //this.htmlUnescape()
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    htmlUnescape () {
      this.$store.dispatch('htmlUnescape',
        {'inviteContent': getCache('secureProtocol')}).then(res => {
          this.form.secureProtocol = replaceRemoveReserveQuotation(res)
          //this.inviteContent = replaceRemoveReserveQuotation(res)
      })
    },
    getcon () {},
    saveSetting () {
      this.$store.dispatch('updateSecureProtocol',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.quillcons{
  overflow: hidden;
  min-height: 385px;
} 
</style>