<template>
	<div class="marginbom20">
    <notice-show >
        <div slot="header" class="clearfix">
          <one-notice :is-box="false" :n-icon="imgSrc" :n-title="$t('notice.email.title')" :n-desc="$t('notice.email.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
          <div class="showbody marginlr20 paddingtb20 bordertop" v-show="isShow">
            <h3>{{$t('notice.email.ptitle')}}</h3>
            <el-radio-group v-model="radio2" class="emailradiowrap">
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
      <template v-if="radio2 === 0 || radio2 === 2">
        <el-form :model="form" ref="form">
          <el-form-item label="邮箱">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="Exchange服务器">
            <el-input v-model="form.exchange"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="saveExchange">{{$t('btn.cancelBtn')}}</el-button>
        </span>
      </template>
      <template v-else>
        <el-form :model="form" ref="form">
          <el-form-item label="邮箱">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="SMTP服务器">
            <el-input v-model="form.smtp"></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-checkbox v-model="form.ssl">SSL</el-checkbox>
            <el-input v-model="form.smtp_port"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="saveSmtp">{{$t('btn.cancelBtn')}}</el-button>
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
      radio2: 0,
      dtitle: this.radio2 === 1 ? 'SMTP':'Exchange',
      dialogVisible: false,
      emailType: getCache('emailType'),
      form: {
        userid: getCache('userid'),
        type: '',
        account: '',
        pwd: '',
        smtp: '',
        smtp_port: '',
        exchange: '',
        domain: '',
        ssl: 0
      }
  	}
  },
  computed: {
    isShow: {
      get () {
        if (getCache('emailType') === 0) {
          return false
        } else {
          return true
        }
      },
      set () {}
    },
    switchOn: {
      get () {
        if (getCache('emailType') === 0) {
          return false
        } else {
          return true
        }
      },
      set () {}
    }
  },
  methods: {
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
      this.isShow = value
      if (value) {
        this.form.type = 3
      } else {
        this.form.type = 0
      }
      this.form.account = ''
      this.form.pwd = ''
      this.form.smtp = ''
      this.form.smtp_port = 0
      this.form.ssl = 0
      this.switchOn = booleanToNumber(value)
      this.updateEmail()
    }
  },
  created () {},
  mounted () {}
}
</script>