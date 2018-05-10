<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <h3>{{$t('notice.email.ptitle')}}</h3>
            <el-radio-group v-model="emailType" class="emailradiowrap" 
            @change="getValue">
              <el-radio class="block" :label="0">{{$t('notice.email.defaults')}} ({{$t('notice.email.ddesc')}})</el-radio>
              <el-radio class="block" :label="1">smtp</el-radio>
              <el-radio class="block" :label="2">Exchange</el-radio>
            </el-radio-group>
          </div>
        </div>        
    </notice-show>
    <el-dialog :title="dtitle"
      :visible.sync="dialogVisible"
      width="40%" >
      <template v-if="emailType === 0 || emailType === 2">
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
      <template v-else>
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
          <el-form-item :label="$t('exporttype.port')">
            <el-checkbox v-model="form.ssl" class="right">SSL</el-checkbox>
            <el-input v-model="form.smtp_port"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSmtp" >{{$t('btn.saveBtn')}}</el-button>
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
      emailType: parseInt(getCache('emailType')) === 3 ? 0 : parseInt(getCache('emailType')),
      oldemailType: 0,
      isShow: false,
      form: {
        userid: getCache('userid'),
        type: 0,
        account: '',
        pwd: '',
        smtp: '',
        smtp_port: 0,
        exchange: '',
        domain: '',
        ssl: 0
      },
      rules: {
        account: [
        { required: true, message: this.$t('validEmail.tip2'), trigger: 'blur' },
        { type: 'email', message: this.$t('validEmail.tip1'), trigger: 'blur'}]
      }
  	}
  },
  computed: {
    switchOn: {
      get () {
        console.log(getCache('emailType'))
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
          return 'Exchange'
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
  methods: {
    getValue (val) {
      console.log(val)
      this.dialogVisible = true
    },
    doCancel () {
      this.dialogVisible = false
      this.emailType = this.oldemailType
    },
    saveExchange () {
      this.form.smtp = ''
      this.form.smtp_port = ''
      this.form.domain = ''
      this.form.type = 2
      this.updateEmail()
    },
    saveSmtp () {
      this.form.exchange = ''
      this.form.domain = ''
      this.form.type = 1
      this.updateEmail()
    },
    updateEmail () {
      this.$store.dispatch('ConfigureEmail', this.form).then(res => {
        let { status, reason } = res
        if (status === 0) {
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
      this.form.account = ''
      this.form.pwd = ''
      this.form.smtp = ''
      this.form.smtp_port = 0
      this.form.ssl = 0
      this.updateEmail()
    }
  },
  mounted () {
    console.log(parseInt(getCache('emailType')))
  }
}
</script>