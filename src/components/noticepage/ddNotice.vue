<template>
	<div class="marginbom20" >
      <one-notice class="bgwhite" :class="{'noedit': noedit}" :n-icon="imgSrc" :n-title="$t('notice.dd.title')" :n-desc="$t('notice.dd.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
      <p class="tiplink" :class="{'noedit': noedit}" v-show="linkShow">{{$t('notice.dd.tip')}}<a class="links" @click="goChangeType">{{$t('clickHere')}}</a>{{$t('notice.dd.tip1')}}</p>
      <el-dialog :title="$t('exporttype.ddSet')"
      :visible.sync="dialogVisible"
      width="30%" @close="resetForm">
        <el-form label-position="top" label-width="80px" :rules="rules" ref="rtxform" :model="form">
        <el-form-item :label="$t('exporttype.CorpID')" prop="ddcorpid">
          <el-input v-model="form.ddcorpid"></el-input>
        </el-form-item>
        <el-form-item :label="$t('exporttype.CorpSecret')" prop="ddcorpsecret">
          <el-input v-model="form.ddcorpsecret"></el-input>
        </el-form-item>
        <el-form-item :label="$t('exporttype.agentid')" prop="ddagentid">
          <el-input v-model="form.ddagentid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{$t('btn.saveBtn')}}</el-button>
          <el-button @click="resetForm">{{$t('btn.cancelBtn')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>	
	</div>
</template>
<script>
import oneNotice from '@/components/notice/oneNotice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: {
    switchoff: {
      type: Boolean,
      default: false
    },
    linkIsShow: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  components: { oneNotice },
  data () {
    var checkNull = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
  	return {
      dialogVisible: false,
  	  switchOn: numberToBoolean(getCache('ddnotify')),
      imgSrc: require('@/assets/img/ddv1.png'),
      linkShow: this.linkIsShow,
      isOpenShow: this.open,
      noedit: parseInt(getCache('subAccount')) !== 1 ? false : true,
      form: {
        ddnotify: getCache('ddnotify'),
        ddautosync: getCache('ddautosync'),
        ddcorpid: getCache('ddcorpid'),
        ddcorpsecret: getCache('ddcorpsecret'),
        ddagentid: getCache('ddagentid'),
        userid: getCache('userid')
      },
      rules: {
        ddcorpid: [
            { validator: checkNull, trigger: 'blur' }
        ],
        ddcorpsecret: [
            { validator: checkNull, trigger: 'blur' }
        ],
        ddagentid: [
            { validator: checkNull, trigger: 'blur' }
        ]
      }
  	}
  },
  watch: {
    linkIsShow (val) {
      this.linkShow = val
    },
    open (val) {
      this.isOpenShow = val
    }
  },
  methods: {
    goChangeType () {
      this.$router.push({'path': '/emp','query': {'export': 'dd'}})
    },
    updateSetting () {
      let newForm = {
        userid: getCache('userid'),
        ddnotify: booleanToNumber(this.switchOn),
        ddautosync:this.form.ddautosync,
        ddcorpid: this.form.ddcorpid,
        ddcorpsecret: this.form.ddcorpsecret,
        ddagentid: this.form.ddagentid
      }
      this.$store.dispatch('updateDDNotify', newForm).then(res => {
        let { status } = res
        if (status === 0) {
          this.switchOn = newForm.ddnotify === 1 ? false : true
        }
      })
    },
    getSwitchValue (value) {
      if (value) {
        this.dialogVisible = true
      } else {
        this.form.ddautosync = 0
        this.form.ddcorpid = ''
        this.form.ddcorpsecret = ''
        this.form.ddagentid = ''
        this.switchOn = booleanToNumber(value)
        this.updateSetting()
      }
    },
    submitForm () {
      this.$refs.rtxform.validate((valid) => {
        if (valid) {
          if (getCache('rtxip')&&getCache('rtxport')) {
               this.$message({
                  message: this.$t('exporttype.tip2'),
                  type: 'error'
               })
          } else {
            this.form.ddnotify = 1
            this.form.ddautosync = 0
            this.updateSetting()
          }
        }
      })
    },
    resetForm() {
      if(getCache('ddnotify') === 1) {
        this.switchOn = booleanToNumber(true)
      } else {
        this.switchOn = booleanToNumber(false)
      }
      this.dialogVisible = false
      this.$refs['rtxform'].resetFields()
    }
  }
}
</script>