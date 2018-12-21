<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <h3>{{$t('notice.email.ptitle')}}</h3>
            <el-radio-group v-model="emailType" class="emailradiowrap" 
            @change="getValue">
              <el-radio class="block" :label="3">{{$t('notice.email.defaults')}} ({{$t('notice.email.ddesc')}})</el-radio>
              <el-radio class="block" :label="1">smtp<el-button class="marginlr20" type="primary" size="mini" plain v-show="emailType == 1" @click="showUpdateWin">{{$t('btn.updateBtn')}}</el-button></el-radio>
              <el-radio class="block" :label="2">Exchange<el-button class="marginlr20" type="primary" size="mini" plain v-show="emailType == 2" @click="showUpdateWin">{{$t('btn.updateBtn')}}</el-button></el-radio>
            </el-radio-group>
          </div>
        </div>        
    </notice-show>
    <el-dialog :title="dtitle"
      :visible.sync="dialogVisible"
      width="40%" @close="handClose">
      <template v-if="emailType === 0">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item :label="$t('form.email.text')" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.text1')">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item :label="$t('notice.email.server1')">
            <el-input v-model="form.exchange"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveExchange" >{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="doCancel">{{$t('btn.cancelBtn')}}</el-button>
        </span>
      </template>
      <template v-else-if="emailType === 1">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item :label="$t('form.email.text')" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.text1')">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item :label="$t('notice.email.server2')">
            <el-input v-model="form.smtp"></el-input>
          </el-form-item>
          <template v-if="SSLShow">
            <el-form-item :label="$t('exporttype.port')">
              <el-checkbox checked class="right" style="pointer-events: none;">SSL</el-checkbox>
              <el-input v-model="form.smtp_port"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="$t('exporttype.port')">
              <el-checkbox v-model="form.ssl" class="right">SSL</el-checkbox>
              <el-input v-model="form.smtp_port"></el-input>
            </el-form-item>
          </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSmtp" >{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="doCancel">{{$t('btn.cancelBtn')}}</el-button>
        </span>
      </template>
      <template v-else-if="emailType === 2">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item :label="$t('form.email.text')" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.text1')">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item :label="$t('notice.email.server1')">
            <el-input v-model="form.exchange"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveExchange" >{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="doCancel">{{$t('btn.cancelBtn')}}</el-button>
        </span>
      </template>    
    </el-dialog>
	</div>
</template>
<script>
import {oneNotice,noticeShow} from '@/components/notice'
import {getCache,setCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: ['switchoff'],
  components: { oneNotice,noticeShow },
  data () {
  	return {
      imgSrc: require('@/assets/img/mailv1.png'),
      dialogVisible: false,
      emailType: parseInt(getCache('emailType')) || 3,
      oldemailType: parseInt(getCache('emailType')) || 3,
      isShow: false,
      form: {
        userid: getCache('userid'),
        type: 0,
        account: getCache('emailAccount'),
        pwd: getCache('emailPwd'),
        smtp: getCache('smtp'),
        smtp_port: getCache('smtpPort'),
        exchange: getCache('exchange'),
        domain: getCache('domain'),
        ssl: numberToBoolean(getCache('ssl')) || false
      },
      rules: {
        account: [
        { required: true, message: this.$t('validEmail.tip2'), trigger: 'blur' },
        { type: 'email', message: this.$t('validEmail.tip1'), trigger: 'blur'}]
      },
      SSLShow: process.env.SSLValue || true
  	}
  },
  computed: {
    switchOn: {
      get () {
        if (parseInt(getCache('emailType')) !== 0) {
          this.isShow = true
          return true
        } else {
          return false
        }
      },
      set () {}
    },
    dtitle: {
      get () {
        if (this.emailType === 0) {
          return 'Exchange'
        } else if (this.emailType === 1) {
          return 'SMTP'
        } else {
          return '默认配置'
        }
      },
      set () {}
    }
  },
  watch: {
    emailType (val,old) {
      this.oldemailType = old
    },
    switchOn (val,old) {
      this.isShow = val
    }
  },
  mounted () {

  },
  methods: {
    showUpdateWin () {
      this.dialogVisible = true
    },
    getValue (val) {
      if (val !== 3) {
        this.dialogVisible = true
      } else {
        this.updateEmail()
      }
    },
    doCancel () {
      this.dialogVisible = false
    },
    saveExchange () {
      this.form.type = 2
      this.updateEmail()
    },
    saveSmtp () {
      this.form.type = 1
      this.updateEmail()
    },
    updateEmail () {
      let nform = {
        userid: getCache('userid'),
        type: this.form.type,
        account: this.form.account,
        pwd: this.form.pwd,
        smtp: this.form.smtp,
        smtp_port: this.form.smtp_port,
        exchange: this.form.exchange,
        domain: this.form.domain,
        ssl: booleanToNumber(this.form.ssl)
      }
      this.$store.dispatch('ConfigureEmail', nform).then(res => {
        let { status, reason } = res
        if (status === 0) {
          this.dialogVisible = false
          this.$message({
            message: this.$t('notice.email.tips'),
            type: 'success'
          })
        }
      })
    },
    getSwitchValue (value) {      
      if (value) {
        this.form.type = 3
      } else {
        this.form.type = 0
      }
      this.isShow = value
      this.updateEmail()
    },
    handClose () {
      this.emailType = parseInt(getCache('emailType'))
    }
  }
}
</script>