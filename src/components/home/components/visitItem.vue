<template>
		<div class="visitwrap paddinglr30 paddingtb20">
        <div class="vavatar">
          <div class="vstatus" :style="{'background': color}">{{statusText}}</div>
            <img :src="vdata.vphoto" alt="">
        </div>
        <div class="vcontent">
          <div class="vcontentheader">
            <el-popover
              placement="bottom-start"
              title="访客详细信息"
              width="200"
              trigger="hover">
              <ul class="vdlist">
                <li>访客姓名:{{vdata.vname}}</li>
                <li>访客手机号:{{vdata.vphone}}</li>
                <li>访客公司:{{vdata.vcompany}}</li>
                <li>受访人姓名:{{vdata.empName}}</li>
                <li>受访人手机号:{{vdata.empPhone}}</li>
                <li>受访人公司:{{vdata.company}}</li>
                <li>预约时间:{{vdata.appointmentDate|formatDate}}</li>
                <li>来访时间:{{vdata.visitdate|formatDate}}</li>
                <li>离开时间:{{vdata.signOutDate|formatDate}}</li>
                <li>随访人员:{{}}</li>
                <li>备注:{{vdata.remark}}</li>
              </ul>
              <el-button type="text" slot="reference">{{vdata.vname}}</el-button>
            </el-popover>
            <!-- <el-button size="mini" >{{}}</el-button> -->
            <div class="vdatewrap" >
              <p v-show="vdata.visitdate">签到时间: {{vdata.visitdate|formatDate}}</p>
              <p v-show="vdata.signOutDate">签出时间: {{vdata.signOutDate|formatDate}}</p>
            </div>
          </div>
          <div class="vcontentfooter paddingtb20">
            <ul class="vflist">
              <li>受访者：{{vdata.empName}}</li>
              <li>拜访事由：{{vdata.visitType}}</li>
              <li>手机号：{{vdata.vphone}}</li>
              <li>备注信息：{{vdata.remark}}</li>
            </ul>
          </div>
         </div>
    </div>
</template>
<script>
import {formatDate} from '@/utils/index'
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
    }
  },
  data () {
  	return {
      cdata: {},
      statusText: '',
      permissionSwitch: getCache('permissionSwitch'),
      color: '#36b22b',
      time: 0
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
  	checkStatus () {
      if (parseInt(this.vdata.signinType) === 1) {//邀请访客
        switch (this.vdata.status) {
          case 0:
            this.statusText = '已发送'
            this.color = '#36b22b'
          case 1:
            this.statusText = '已签到'
            this.color = '#36b22b'
          case 2:
            this.statusText = '已查看'
            this.color = '#996b33'
          case 3:
            this.statusText = '已接受'
            this.color = '#2c9ffd'
          case 4:
            this.statusText = '已拒绝'
            this.color = '#db231c'
          default:
            this.statusText = '已发送'
            this.color = '#36b22b'
        }
        if (this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
          this.statusText = '已签到'
          this.color = '#36b22b'
        } else if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = '已签出'
          this.color = '#2c9ffd'
        }
      } else if (parseInt(this.vdata.signinType) === 2) {//2预约访客
        if (this.permissionSwitch === 1) {
          if (this.vdata.signOutDate) {
            if (item.visitdate && item.appointmentDate) {
              //this.statusText = '已签出'
            } else if (!item.visitdate && item.appointmentDate) {
              
            }
            this.statusText = '已签出'
            this.color = '#2c9ffd'
          } else {
            this.statusText = '已签到'
            this.color = '#36b22b'
            if (item.appointmentDate && item.visitdate) {
              //this.statusText = '已签到'
            } else {
              if (permission == 0) { //
                this.statusText = '未授权'
                this.color = '#e36101'
              } else if (permission == 1) { //
                this.statusText = '已授权'
                this.color = '#e8b000'
              } else if (permission == 2) {
                this.statusText = '已拒绝'
                this.color = '#db231c'
              }
            }
          }
        } else {
          if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
            this.statusText = '已签出'
            this.color = '#2c9ffd'
          } else if (this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
            this.statusText = '已签到'
            this.color = '#36b22b'
          } else if (!this.vdata.visitdate && !this.vdata.signOutDate && this.vdata.appointmentDate) {
            if (this.vdata.permission === 1) {
              this.statusText = '已授权'
              this.color = '#e8b000'
            } else if (this.vdata.permission === 2) {
              this.statusText = '已拒绝'
              this.color = '#db231c'
            } else {
              this.statusText = '已预约'
              this.color = '#ef4f20'
            }
          }
        }
      } else if (parseInt(this.vdata.signinType) === 3) {//3常驻访客
        if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = '已签出'
          this.color = '#2c9ffd'
        } else if (!this.vdata.signOutDate && this.vdata.visitdate) {
          this.statusText = '已签到'
          this.color = '#36b22b'
        }
      } else if (parseInt(this.vdata.signinType) === 0) {
        if ((this.vdata.signOutDate && this.vdata.visitdate && this.vdata.appointmentDate) || (this.vdata.signOutDate)) {
          this.statusText = '已签出'
          this.color = '#2c9ffd'
        } else if (this.vdata.visitdate && !this.vdata.signOutDate) {
          this.statusText = '已签到'
          this.color = '#36b22b'
        } else if (!this.vdata.visitdate && !this.vdata.signOutDate) {
          this.statusText = '已预约'
          this.color = '#ef4f20'
        }
      }
    }
  }
}
</script>