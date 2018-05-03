<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.doorset.title')" :n-desc="$t('notice.doorset.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.doorset.dialog.title')"
      :visible.sync="isShow"
      width="50%" >
      <dset></dset>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import dset from './dset'
export default {
  components: { oneNotice, dset },
  data () {
    return {
      imgSrc: require('@/assets/img/doors.png'),
      isShow: false,
      form: {
        upDuty: getCache('upDuty'),
        offDuty: getCache('offDuty'),
        userid: getCache('userid')
      }
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    saveSetting () {
      this.$store.dispatch('updateOffDutyTime',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    }
  }
}
</script>