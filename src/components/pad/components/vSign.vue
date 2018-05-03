<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.vset.title')" :n-desc="$t('notice.vset.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.safe.dialog.title')"
      :visible.sync="isShow"
      width="50%" >
      <div class="quillcons">
        <vue-quill-editor :content="form.secureProtocol" @getcon="getsp"></vue-quill-editor>
      </div>
      <div class="margintop20" style="text-align:left;">
        <el-button type="primary" @click="saveSetting">{{$t('btn.saveBtn')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import vueQuillEditor from '@/components/quill/quillEditor'
export default {
  components: { oneNotice, vueQuillEditor },
  data () {
    return {
      imgSrc: require('@/assets/img/vsign.png'),
      isShow: false,
      form: {
        secureProtocol: getCache('secureProtocol'),
        userid: getCache('userid')
      }
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
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