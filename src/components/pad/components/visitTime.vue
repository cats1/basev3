<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('visitSetTime')" :n-desc="$t('visitSetTimeDesc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog
      :title="$t('notice.worktime.dialog.title')"
      :visible.sync="isShow"
      width="30%" >
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item :label="$t('visitStartTime')">
          <el-time-select
            v-model="form.passableSTime"
            :picker-options="{
              start: '07:00',
              step: '00:15',
              end: '20:00'
            }">
          </el-time-select>
        </el-form-item>
        <el-form-item :label="$t('visitEndTime')">
          <el-time-select
            v-model="form.passableETime"
            :picker-options="{
              start: '07:00',
              step: '00:15',
              end: '20:00',
              minTime: form.passableSTime
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
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import setCodeTime from '@/components/codeTime/setCodeTime'
export default {
  components: { noticeShow, oneNotice, setCodeTime },
  data () {
    return {
      imgSrc: require('@/assets/img/alerts.png'),
      isShow: false,
      form: {
        passableSTime: getCache('passableSTime'),
        passableETime: getCache('passableETime'),
        userid: getCache('userid')
      }
    }
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    saveSetting () {
      this.$store.dispatch('updatePassableTime',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    }
  }
}
</script>