<template>
  <div class="marginbom20">
    <notice-show >
      <div slot="header" class="clearfix">
        <one-notice :is-box="false" :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('notice.team.title')" :n-desc="$t('notice.team.desc')" :switch-flag="switchOn" @gswitch="getSwitchValue" ></one-notice>
        <div class="showbody marginlr20 paddingtb20" v-show="isShow">
          <one-notice :is-box="false" :is-no-padding="true" :topzero="true" n-icon="" :n-title="$t('notice.vset.title')" :n-desc="$t('notice.vset.cdesc')" :btn-flag="true" @btn-click="showDown"></one-notice>
        </div>
      </div>
    </notice-show>
    <el-dialog title="访客登记设置" :visible.sync="visible"
      width="50%" >
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.empid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.peopleCount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTeam">保存</el-button>
          <el-button >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice,noticeShow } from '@/components/notice'
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { oneNotice,noticeShow },
  data () {
    return {
      imgSrc: require('@/assets/img/team.png'),
      isShow: false,
      visible: false,
      switchOn: numberToBoolean(getCache('comeAgain')),
      form: {
        name: '',
        empid: '',
        phone: '',
        peopleCount: ''
      },
      g_team_config_arr: []
    }
  },
  created () {
    this.getExtendVisitor()
  },
  methods: {
    showDown () {
      this.visible = !this.visible
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    getExtendVisitor () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetExtendVisitor',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          console.log(result)
          this.g_team_config_arr = []
          let team_setting_fg = 0
          for (let i = 0; i < result.length; i++) {
            let conf_item = {
              userid: result[i].userid,
              displayName: result[i].displayName,
              fieldName: result[i].fieldName,
              inputType: result[i].inputType,
              inputValue: result[i].inputValue,
              inputOrder: result[i].inputOrder,
              required: result[i].required,
              placeholder: result[i].placeholder
            }      
            this.g_team_config_arr.push(conf_item)
            if (result[i].placeholder !== null && result[i].placeholder !== '') {
              team_setting_fg = 1
              for (let key in this.form) {
                if (result[i].fieldName === key) {
                  this.form[key] = result[i].displayName
                }
              }
            }
          }
          console.log(this.g_team_config_arr)
          if (team_setting_fg === 0) {
            this.isShow = false
          } else {
            this.isShow = true
          }
        }
      })
    },
    getSwitchValue (value) {
      this.switchOn = booleanToNumber(value)
      if (value) {
        this.submitDefault()
      } else {
        this.cleanTeamSetting()
      }
    },
    cleanTeamSetting () {
      if (this.g_team_config_arr.length === 0) {
        return false
      }
      var g_team_config_arr = this.g_team_config_arr
      var req_obj = []
      for (var i = 0; i < g_team_config_arr.length; i++) {
        if (g_team_config_arr[i].placeholder == null || g_team_config_arr[i].placeholder == "") {
          var conf_item = {
            "userid": g_team_config_arr[i].userid,
            "displayName": g_team_config_arr[i].displayName,
            "fieldName": g_team_config_arr[i].fieldName,
            "inputType": g_team_config_arr[i].inputType,
            "inputValue": g_team_config_arr[i].inputValue,
            "inputOrder": g_team_config_arr[i].inputOrder,
            "required": g_team_config_arr[i].required,
            "placeholder": g_team_config_arr[i].placeholder
          }
          req_obj.push(conf_item)
        }
      }
      this.saveTeam(req_obj,0)
    },
    submitDefault () {
      if (this.g_team_config_arr.length === 0) {
        return false
      }
      var g_team_config_arr = this.g_team_config_arr
      var req_obj = []
      for (var i = 0; i < g_team_config_arr.length; i++) {
        if (g_team_config_arr[i].placeholder == null || g_team_config_arr[i].placeholder == "") {
          var conf_item = {
            "userid": g_team_config_arr[i].userid,
            "displayName": g_team_config_arr[i].displayName,
            "fieldName": g_team_config_arr[i].fieldName,
            "inputType": g_team_config_arr[i].inputType,
            "inputValue": g_team_config_arr[i].inputValue,
            "inputOrder": g_team_config_arr[i].inputOrder,
            "required": g_team_config_arr[i].required,
            "placeholder": g_team_config_arr[i].placeholder
          }
          req_obj.push(conf_item)
        }
      }
      var order = g_team_config_arr.length + 1
      var item_name = {
        userid: getCache('userid'),
        displayName: '团队名称',
        fieldName: 'name',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_name)
      // 拜访的人  empid
      order = order + 1
      var item_emp = {
        userid: getCache('userid'),
        displayName: '拜访的人',
        fieldName: 'empid',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_emp)
      order = order + 1
      var item_phone = {
        userid: getCache('userid'),
        displayName: '拜访人的联系电话',
        fieldName: 'phone',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_phone)
      order = order + 1
      var item_count = {
        userid: getCache('userid'),
        displayName: '团队人数',
        fieldName: 'peopleCount',
        inputType: 'text',
        inputValue: '',
        inputOrder: order,
        required: 1,
        placeholder: '1'
      }
      req_obj.push(item_count)
      this.saveTeam(req_obj,1)
    },
    saveSetting () {
      this.$store.dispatch('updateSecureProtocol',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    },
    saveTeam (obj,type) {
      this.$store.dispatch('addExtendVisitor',obj,type).then(res => {
        let {status} = res
        if (status === 0) {
          
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.quillcons{
  overflow: hidden;
  min-height: 385px;
} 
</style>