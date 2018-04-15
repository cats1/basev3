<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.innerphoto.title')" :n-desc="$t('notice.innerphoto.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.innerphoto.dialog.title')"
      :visible.sync="isShow"
      width="80%" >
      <div class="quillcons">
        <photo></photo>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import photo from '@/components/photo/photo'
export default {
  components: { oneNotice,photo },
  data () {
    return {
      imgSrc: require('@/assets/img/webchatv1.png'),
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
  min-height: 200px;
} 
</style>