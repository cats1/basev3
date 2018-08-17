<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.worktime.title')" :n-desc="$t('notice.worktime.desc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.worktime.dialog.title')"
      :visible.sync="isShow"
      width="30%" >
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item :label="$t('notice.worktime.dialog.upDuty')">
          <el-time-select
            v-model="form.upDuty"
            :clearable="false"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00'
            }">
          </el-time-select>
        </el-form-item>
        <el-form-item :label="$t('notice.worktime.dialog.offDuty')">
          <el-time-select
            v-model="form.offDuty"
            :clearable="false"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
              minTime: form.upDuty
            }">
          </el-time-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSetting">{{$t('btn.saveBtn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean,checkIsNull} from '@/utils/common'
import setCodeTime from '@/components/codeTime/setCodeTime'
export default {
  components: { noticeShow, oneNotice, setCodeTime },
  data () {
    return {
      imgSrc: require('@/assets/img/worktime.png'),
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
      if (checkIsNull(this.form.upDuty) !== '' && checkIsNull(this.form.offDuty) !== '') {
        this.$store.dispatch('updateOffDutyTime',this.form).then(res => {
          let {status} = res
          if (status === 0) {
            this.isShow = false
          }
        })
      } else {
        this.$message({
          message: this.$t('exporttype.isNull'),
          showClose: true,
          type: 'error'
        })
      }
    }
  }
}
</script>