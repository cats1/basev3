<template>
		<div class="visitwrap paddinglr30 paddingtb20">
        <div class="vavatar" @mouseover.prevent="doHover" @mouseout.prevent="doHoverOut">
          <div class="vstatus" :style="{'background': color}">{{statusText}}</div>
            <img :src="vdata.vphoto" alt="" v-if="vdata.vphoto">
            <img :src="dlogo" alt="" v-else>
            <transition name="el-fade-in">
              <div v-show="maskShow" class="vavatar-mask" >
                <el-button type="primary" @click.prevent="signOutRecord">签出</el-button>
                <!-- <i class="fa fa-trash-o fa-4x"></i> -->
              </div>
            </transition>
          </div>
        <div class="vcontent">
          <div class="vcontentheader">
            <el-popover
              placement="bottom-start"
              :title="$t('visitor.list')"
              width="200"
              trigger="hover">
              <ul class="vdlist">
                <li>{{$t('visitor.vname')}}:{{vdata.vname}}</li>
                <li>{{$t('visitor.vphone')}}:{{vdata.vphone}}</li>
                <li>{{$t('visitor.vcom')}}:{{vdata.vcompany}}</li>
                <li>{{$t('visitor.ename')}}:{{vdata.empName}}</li>
                <li>{{$t('visitor.ephone')}}:{{vdata.empPhone}}</li>
                <li>{{$t('visitor.ecom')}}:{{vdata.company}}</li>
                <li>{{$t('visitor.ordertime')}}:{{vdata.appointmentDate|formatDate}}</li>
                <li>{{$t('visitor.visittime')}}:{{vdata.visitdate|formatDate}}</li>
                <li>{{$t('visitor.leavetime')}}:{{vdata.signOutDate|formatDate}}</li>
                <li>{{$t('visitor.followPeople')}}:{{vdata.memberName}}</li>
                <li>{{$t('form.remark.text')}}:{{vdata.remark}}</li>
              </ul>
              <el-button class="" type="text" slot="reference">{{vdata.vname}}</el-button>
            </el-popover>
            <el-button size="mini" v-show="vtext !==''">{{vtext}}</el-button>
            <div class="vdatewrap" >
              <template v-if="parseInt(vdata.signinType) === 1">
                <p v-show="vdata.appointmentDate&&!vdata.signOutDate">{{$t('form.time.text3')}}: {{vdata.appointmentDate|formatDate}}</p>
              </template>
              <template v-else>
                <p v-show="vdata.appointmentDate&&!vdata.signOutDate">{{$t('form.time.text2')}}: {{vdata.appointmentDate|formatDate}}</p>
              </template>
              <p v-show="vdata.visitdate">{{$t('form.time.text')}}: {{vdata.visitdate|formatDate}}</p>
              <p v-show="vdata.signOutDate">{{$t('form.time.text1')}}: {{vdata.signOutDate|formatDate}}</p>
            </div>
          </div>
          <div class="vcontentfooter">
            <ul class="vflist">
              <template v-if="teamShow">
                <li>{{$t('checkVtype[2]')}}：{{vdata.empName}}</li>
                <li>{{$t('tablehead[6]')}}：{{vdata.vphone}}</li>
                <li>{{$t('form.count.text')}}：{{peopleCount}}</li>
              </template>
              <template v-else>
                <li>{{$t('checkVtype[2]')}}：{{vdata.empName}}</li>
                <li>{{$t('checkVtype[3]')}}:{{vdata.visitType}}</li>
                <li>{{$t('tablehead[6]')}}：{{vdata.vphone}}</li>
                <li>{{$t('form.remark.text')}}：{{vdata.remark}}</li>
                <template v-show="extendColArray.length > 0">
                  <li v-for="extend in extendColArray">{{extend.name}}：{{extend.value}}</li>
                </template>
              </template>
            </ul>
          </div>
          <div class="itemcheck" v-show="checked">
            <el-checkbox v-model="checked" @change="doCheck"></el-checkbox>
          </div>
        </div>
        <el-dialog
          :title="$t('signOutWinTitle')"
          :visible.sync="dialogVisible"
          width="30%" center>
          <div class="center">
            <h3>{{$t('isLeave')}}</h3>
            <span>{{vdata.vname}} {{vdata.vphone}}</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="signOutConfirm">{{$t('btn.confirmBtn')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import {formatDate,timeDiff} from '@/utils/index'
import {stringToArray,arrayToString,judgeModel,moveBlank,splitArray,checkIsNull} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  props: {
    vdata: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
    itemCheck: {
      type: Boolean,
      default: false
    },
    extendCol:{
      type: Array,
      default: []
    }
  },
  data () {
  	return {
      dialogVisible: false,
      cdata: {},
      statusText: '',
      permissionSwitch: getCache('permissionSwitch'),
      color: '#36b22b',
      time: 0,
      dlogo: require('@/assets/img/avatar.jpg'),
      checked: false,
      vtext: '',
      maskShow: false,
      remarkValue: '',
      teamShow: false,
      peopleCount: 0,
      extendColSet: this.extendCol,
      extendColArray: [],
      vlist: ''
    }
  },
  watch: {
    vdata (val) {
      this.checkStatus()
      this.getextendCol()
    },
    itemCheck (val) {
      this.checked = val
    },
    extendCol (val) {
      this.extendColSet = val
    }
  },
  filters:{
    formatDate (time) {
      if (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return ''
      }
    }
  },
  created () {},
  mounted () {
    this.checkStatus()
    this.getextendCol()
  },
  methods: {
    doHover () {
      if (!this.vdata.signOutDate) {
        if (parseInt(this.vdata.signinType) === 0) {
          this.maskShow = true
        }
      }
    },
    doHoverOut () {
      this.maskShow = false
    },
    signOutRecord () {
      let remarkValue = ''
      let pdetail = ''
      if (this.vdata.remark) {
        pdetail = this.vdata.vname + ' ' + this.vdata.vphone
        remarkValue = this.vdata.remark + '\n';
      }
      this.remarkValue = remarkValue
      this.dialogVisible = true
    },
    signOutConfirm () {
      let nform = {
        vid: this.vdata.vid
      }
      this.$store.dispatch('VisitorSignOutByVid',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('outkit')
        }
      })
    },
    doCheck (val) {
      if (val) {

      } else {

      }
      this.$emit('checkkit',val,this.index)
    },
  	checkStatus () {
      if (parseInt(this.vdata.signinType) === 1) {//邀请访客
        this.vtext = this.$t('vtype[2]')
        switch (this.vdata.status) {
          case 0:
            this.statusText = this.$t('vstatus[0]')
            this.color = '#36b22b'
          case 1:
            this.statusText = this.$t('vstatus[1]')
            this.color = '#36b22b'
          case 2:
            this.statusText = this.$t('vstatus[2]')
            this.color = '#996b33'
          case 3:
            this.statusText = this.$t('vstatus[3]')
            this.color = '#2c9ffd'
          case 4:
            this.statusText = this.$t('vstatus[4]')
            this.color = '#db231c'
          default:
            this.statusText = this.$t('vstatus[0]')
            this.color = '#36b22b'
        }
        if (this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
          this.statusText = this.$t('vstatus[1]')
          this.color = '#36b22b'
        } else if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = this.$t('vstatus[5]')
          this.color = '#2c9ffd'
        }
      } else if (parseInt(this.vdata.signinType) === 2) {//2预约访客
        if (this.permissionSwitch === 1) {
          if (this.vdata.signOutDate) {
            if (item.visitdate && item.appointmentDate) {
              //this.statusText = '已签出'
            } else if (!item.visitdate && item.appointmentDate) {
              
            }
            this.statusText = this.$t('vstatus[5]')
            this.color = '#2c9ffd'
          } else {
            this.statusText = this.$t('vstatus[1]')
            this.color = '#36b22b'
            if (item.appointmentDate && item.visitdate) {
              //this.statusText = '已签到'
            } else {
              if (permission == 0) { //
                this.statusText = this.$t('vstatus[6]')
                this.color = '#e36101'
              } else if (permission == 1) { //
                this.statusText = this.$t('vstatus[7]')
                this.color = '#e8b000'
              } else if (permission == 2) {
                this.statusText = this.$t('vstatus[4]')
                this.color = '#db231c'
              }
            }
          }
        } else {
          if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
            this.statusText = this.$t('vstatus[5]')
            this.color = '#2c9ffd'
          } else if (this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
            this.statusText = this.$t('vstatus[1]')
            this.color = '#36b22b'
          } else if (!this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
            if (this.vdata.permission === 1) {
              this.statusText = this.$t('vstatus[7]')
              this.color = '#e8b000'
            } else if (this.vdata.permission === 2) {
              this.statusText = this.$t('vstatus[4]')
              this.color = '#db231c'
            } else {
              this.statusText = this.$t('vstatus[8]')
              this.color = '#ef4f20'
            }
          }
        }
      } else if (parseInt(this.vdata.signinType) === 3) {//3常驻访客
        if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = this.$t('vstatus[5]')
          this.color = '#2c9ffd'
        } else if (!this.vdata.signOutDate && this.vdata.visitdate) {
          this.statusText = this.$t('vstatus[1]')
          this.color = '#36b22b'
        }
      } else if (parseInt(this.vdata.signinType) === 0) {
        if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = this.$t('vstatus[5]')
          this.color = '#2c9ffd'
        } else if (this.vdata.visitdate && !this.vdata.signOutDate) {
          this.statusText = this.$t('vstatus[1]')
          this.color = '#36b22b'
        } else if (!this.vdata.visitdate && !this.vdata.signOutDate) {
          this.statusText = this.$t('vstatus[8]')
          this.color = '#ef4f20'
        }
      }
      if (this.vdata.appointmentDate && !this.vdata.visitdate && !this.vdata.signOutDate) {
        let timeFlag = timeDiff(new Date(this.vdata.appointmentDate), new Date(), 0)
        if (timeFlag > 0) {
          this.statusText = this.$t('vstatus[9]')
          this.color = '#996b33'
        }
      }
    },
    getextendCol () {      
      if (this.vdata.extendCol != null) {
        let extendCol = splitArray(this.vdata.extendCol)
        let modaltype = judgeModel(extendCol)
        if (modaltype[0] == 0 || modaltype[0] == undefined) { //普通未添加自定义

        } else if (modaltype[0] == 1) { //添加自定义
          let extendColSet = this.extendColSet
          let patt1 = new RegExp("input_")
          let extendColArray = []
          for (let i = 0; i < extendCol.length; i++) {
            if (patt1.test(moveBlank(extendCol[i])) > 0) {
              for (let j = 0; j < extendColSet.length; j++) {
                let fieldName = extendColSet[j].fieldName
                if (fieldName === moveBlank(extendCol[i])) {
                  let exObj = {
                    name: extendColSet[j].displayName,
                    value: checkIsNull(extendCol[i+1])
                  }
                  extendColArray.push(exObj)
                }
              }
            }
          }
          this.extendColArray = extendColArray
        } else if (modaltype[0] == 2) {//团队
          this.vtext = this.$t('teamText')
          this.teamShow = true
          this.peopleCount = extendCol[modaltype[1]]
        }
      } else {
        this.vtext = ''
        this.teamShow = false
        this.peopleCount = 0
        this.extendColArray = []
      }
    }
  }
}
</script>