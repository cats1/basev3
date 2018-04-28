<template>
		<div class="visitwrap paddinglr30 paddingtb20">
        <div class="vavatar">
          <div class="vstatus" :style="{'background': color}">{{statusText}}</div>
            <img :src="vdata.vphoto" alt="" v-if="vdata.vphoto">
            <img :src="dlogo" alt="" v-else>
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
                <li>{{$t('visitor.followPeople')}}:{{}}</li>
                <li>{{$t('form.remark.text')}}:{{vdata.remark}}</li>
              </ul>
              <el-button type="text" slot="reference">{{vdata.vname}}</el-button>
            </el-popover>
            <!-- <el-button size="mini" >{{}}</el-button> -->
            <div class="vdatewrap" >
              <template v-if="parseInt(vdata.signinType) === 0 || parseInt(vdata.signinType) === 3">
                <p v-show="vdata.visitdate">{{$t('form.time.text')}}: {{vdata.visitdate|formatDate}}</p>
                <p v-show="vdata.signOutDate">{{$t('form.time.text1')}}: {{vdata.signOutDate|formatDate}}</p>
              </template>
              <template v-else-if="parseInt(vdata.signinType) === 2">
                <template v-if="vdata.visitdate">
                  <p v-show="vdata.visitdate">{{$t('form.time.text')}}: {{vdata.visitdate|formatDate}}</p>
                </template>
                <template v-else>
                  <p v-show="vdata.appointmentDate">{{$t('form.time.text2')}}: {{vdata.appointmentDate|formatDate}}</p>
                </template>
                <p v-show="vdata.signOutDate">{{$t('form.time.text1')}}: {{vdata.signOutDate|formatDate}}</p>
              </template>
              <template v-else-if="parseInt(vdata.signinType) === 1">
                <template v-if="vdata.visitdate">
                  <p v-show="vdata.visitdate">{{$t('form.time.text')}}: {{vdata.visitdate|formatDate}}</p>
                </template>
                <template v-else>
                  <p v-show="vdata.appointmentDate">{{$t('form.time.text3')}}: {{vdata.appointmentDate|formatDate}}</p>
                </template>
                <p v-show="vdata.signOutDate">{{$t('form.time.text1')}}: {{vdata.signOutDate|formatDate}}</p>
              </template>
              <template v-else>
                <p v-show="vdata.visitdate">{{$t('form.time.text')}}: {{vdata.visitdate|formatDate}}</p>
                <p v-show="vdata.signOutDate">{{$t('form.time.text1')}}: {{vdata.signOutDate|formatDate}}</p>
              </template>
            </div>
          </div>
          <div class="vcontentfooter paddingtb20">
            <ul class="vflist">
              <li>{{$t('checkVtype[2]')}}：{{vdata.empName}}</li>
              <li>{{$t('checkVtype[3]')}}:{{vdata.visitType}}</li>
              <li>{{$t('tablehead[6]')}}：{{vdata.vphone}}</li>
              <li>{{$t('form.remark.text')}}：{{vdata.remark}}</li>
            </ul>
          </div>
          <div class="itemcheck" v-show="checked">
            <el-checkbox v-model="checked" @change="doCheck"></el-checkbox>
          </div>
        </div>
    </div>
</template>
<script>
import {formatDate,timeDiff} from '@/utils/index'
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
    }
  },
  data () {
  	return {
      cdata: {},
      statusText: '',
      permissionSwitch: getCache('permissionSwitch'),
      color: '#36b22b',
      time: 0,
      dlogo: require('@/assets/img/avatar.jpg'),
      checked: false
    }
  },
  watch: {
    vdata (val) {
      this.checkStatus()
    },
    itemCheck (val) {
      this.checked = val
    }
  },
  filters:{
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created () {
    this.checkStatus()
  },
  mounted () {
    console.log(this.vdata)
    /*this.$nextTick(function(){
      this.cdata = this.vdata
    })*/
  },
  methods: {
    doCheck (val) {
      console.log(val)
      if (val) {

      } else {

      }
      this.$emit('checkkit',val,this.index)
    },
  	checkStatus () {
      if (parseInt(this.vdata.signinType) === 1) {//邀请访客
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
    }
  }
}
</script>