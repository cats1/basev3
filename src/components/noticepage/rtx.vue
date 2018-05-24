<template>
	<div class="marginbom20">
      <one-notice class="bgwhite" :class="{'noedit': noedit}" :n-icon="imgSrc" :n-title="$t('notice.rtx.title')" :n-desc="$t('notice.rtx.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue"></one-notice>
      <p class="tiplink" :class="{'noedit': noedit}" v-show="linkShow">{{$t('notice.dd.tip')}}<a class="links" @click="goChangeType">{{$t('clickHere')}}</a>{{$t('notice.dd.tip1')}}</p>
      <el-dialog :title="$t('exporttype.ipSet')"
        :visible.sync="dialogVisible"
        width="30%" @close="resetForm">
          <el-form label-position="top" label-width="80px" :rules="rules" ref="rtxform" :model="form">
          <el-form-item :label="$t('exporttype.ip')" prop="rtxIp">
            <el-input v-model="form.rtxIp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('exporttype.port')" prop="rtxPort">
            <el-input v-model="form.rtxPort"></el-input>
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
    }
  },
  components: { oneNotice },
  data () {
    var checkIp = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
    var checkPort = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
  	return {
  	  switchOn: false,
      dialogVisible: false,
      imgSrc: require('@/assets/img/rtxv1.png'),
      noedit: parseInt(getCache('subAccount')) !== 1 ? false : true,
      form: {
        rtxIp: getCache('rtxip'),
        rtxPort: getCache('rtxport'),
        userid: getCache('userid')
      },
      linkShow: this.linkIsShow,
      rules: {
        rtxIp: [
          { validator: checkIp, trigger: 'blur' }
        ],
        rtxPort: [
          { validator: checkPort, trigger: 'blur' }
        ]
      }
  	}
  },
  watch: {
    linkIsShow (val) {
      this.linkShow = val
    }
  },
  methods: {
    goChangeType () {
      this.$router.push({'path': '/emp','query': {'export': 'rtx'}})
    },
    updateSetting () {
      this.$store.dispatch('updateRtxConf', this.form).then(res => {
        let { status } = res
        if (status === 0) {
          this.dialogVisible = false
          this.switchOn = newForm.ddnotify === 1 ? false : true
        }
      })
    },
    getSwitchValue (value) {
      if (value) {
        this.dialogVisible = true
      } else {
        this.form.rtxIp = ''
        this.form.rtxPort = ''
        this.switchOn = booleanToNumber(value)
        this.updateSetting()
      }
    },
    submitForm () {
      this.$refs.rtxform.validate((valid) => {
        if (valid) {
          if (parseInt(getCache('ddnotify')) === 1) {
               this.$message({
                  message: this.$t('exporttype.tip1'),
                  type: 'error'
               })
          } else {
            this.updateSetting()
          }
        }
      })
    },
    resetForm() {
      if(getCache('rtxip') && getCache('rtxport')) {
        this.switchOn = booleanToNumber(true)
      } else {
        this.switchOn = booleanToNumber(false)
      }
      this.dialogVisible = false
      this.$refs['rtxform'].resetFields()
    }
  },
  created () {
    if(getCache('rtxip') && getCache('rtxport')) {
      this.switchOn = true
    }
  }
}
</script>