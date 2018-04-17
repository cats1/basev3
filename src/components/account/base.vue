<template>
	<div class="boxshadow">
    <h2 class="set-title borderbom">{{$t('account.base.title')}}</h2>
    <el-row class="paddingtb20 paddinglr30">
      <el-col :span="12">
        <el-form :model="form" label-width="80px" width="50%" ref="baseform">
          <el-form-item :label="$t('form.email.text')">
            <span>{{email}}</span>
            <el-checkbox style="float:right" v-model="unsubscribe" @change="updateEmail">{{$t('form.email.checktext')}}</el-checkbox>
          </el-form-item>
          <el-form-item prop="name" :label="$t('form.name.text')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="phone" :label="$t('form.phone.text')">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop="company" :label="$t('form.company.text')">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item prop="companypro" :label="$t('form.companypro.text')">
            <el-input v-model="cform.cardText"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="saveBase">{{$t('btn.saveBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <version></version>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('form.email.checktext')"
      :visible.sync="dialogVisible"
      width="30%" >
      <div class="codetitle borderbom">
        <span>{{$t('form.email.tiptitle')}}</span>
      </div>
      <p class="codecontent" v-html="$t('form.email.tipdesc')"></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="updateEmailOrder(0)">{{$t('btn.confirmBtn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {chineseFromUtf8Url,numberToBoolean} from '@/utils/common'
import {version} from './components'
export default {
  components: {version},
  data () {
  	return {
      form: {
        userid: getCache('userid'),
        name: getCache('username'),
        phone: getCache('phone'),
        company: getCache('company')
      },
      cform: {
        userid: getCache('userid'),
        cardText: chineseFromUtf8Url(getCache('cardText'))
      },
      unsubscribe: numberToBoolean(getCache('unsubscribe')),
      dialogVisible: false,
      formrules: {
        name: [{ required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        company: [{ required: true, message: this.$t('formCheck.validCompany.tip1'), trigger: 'blur' }],
        companypro: [{ required: true, message: this.$t('formCheck.validCompanyPro.tip1'), trigger: 'blur' },
        { min: 3, max: 6, message: this.$t('formCheck.validCompanyPro.tip2'), trigger: 'blur' }]
      }
    }
  },
  computed: {
    email: {
      get () {
        return getCache('email')
      },
      set () {}
    }
  },
  methods: {
    saveBase () {
      this.ModifyUserInfo()
      this.UpdateCardText()
    },
    ModifyUserInfo () {
      this.$store.dispatch('ModifyUserInfo',this.form)
    },
    UpdateCardText () {
      this.$store.dispatch('UpdateCardText',this.cform)
    },
    updateEmail (val) {
      if (!val) {
        this.dialogVisible = true
      } else {
        this.updateEmailOrder(1)
      }
    },
    updateEmailOrder (type) {
      let nform = {
        userid: getCache('userid'),
        unsubscribe: type
      }
      this.$store.dispatch('updateUnSubscribe',nform).then(res => {
        let {status} = res
        if (status === 0) {
          if (type === 0) {
            this.dialogVisible = false
          }
        }
      })
    }
  }
}
</script>