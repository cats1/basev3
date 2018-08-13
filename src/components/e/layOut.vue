<template>
	<div class="cardwrap">
        <div class="cardtop">
            <div class="cardavatar">
                <img :src="avatar" alt="">
                <div class="cardstatus" :style="{'background-color': status.color}">{{status.text}}</div>
            </div>
            <h3 class="empname">{{form.vname}}</h3>
            <div class="cardbutton" v-show="btnShow">
                <button class="btn green" id="yes" @click="doConfirm"><img :src="yesIcon" alt="" >授权</button>
                <button class="btn red" id="no" @click="doRefuse"><img :src="noIcon" alt="" >拒绝</button>
            </div>
        </div>
        <div class="cardbody">
            <p><strong class="light">{{$t('form.company.text2')}}：</strong><strong class="black vcompany">{{form.vcompany}}</strong></p>
            <p><strong class="light">{{$t('form.phone.text')}}：</strong><strong class="black vphone">{{form.vphone}}</strong></p>
            <p><strong class="light">{{$t('visitcause')}}：</strong><strong class="black visitType">{{form.visitType}}</strong></p>
            <p><strong class="light">{{$t('form.time.text')}}：</strong><strong class="black visitdate">{{form.vdate}}</strong></p>
            <p><strong class="light">{{$t('visitor.followPeople')}}：</strong><strong class="black memberName">{{form.memberName}}</strong></p>
            <p><strong class="light">{{$t('form.remark.text')}}：</strong><strong class="black remark"></strong>{{form.remark}}</p>
        </div>
    </div>
</template>
<script>
import { getCache } from '@/utils/auth'
import { getParameter,checkIsNull,getVStatus } from '@/utils/common'
import { getDateFormat } from '@/utils/index'
export default {
  data () {
  	return {
      avatar: require('@/assets/img/avatar.jpg'),
      yesIcon: require('@/assets/img/e/yes.png'),
      noIcon: require('@/assets/img/e/no.png'),
      digest: '',
      form: {
        vname: ''
      },
      status: {
        text: '',
        color: ''
      },
      btnShow: false
    }
  },
  created () {
    this.digest = getParameter('v')
  },
  mounted () {
    this.getPermissionRecordByLink()
    this.changeTitle()
  },
  methods: {
    changeTitle () {
      document.title = this.$t('empAuthor')
    },
    getDateFormat: getDateFormat,
    getPermissionRecordByLink () {
      this.$store.dispatch('getPermissionRecordByLink',{
        'digest': this.digest
      }).then(res => {
        let {status,result} = res
        if (status === 0) {
          if (result) {
            this.form = result
            let vdate = checkIsNull(result.appointmentDate) == '' ? checkIsNull(result.visitdate) : checkIsNull(result.appointmentDate)
            this.form.vdate = getDateFormat(vdate, '-', 2)
            this.status = getVStatus(result)
            if (checkIsNull(result.vphoto) !== '') {
              this.avatar = checkIsNull(result.vphoto)
            }
            if (result.permission == 0 && this.status !== 'outdate') {
                this.btnShow = true
            } else {
              this.btnShow = false
            }
          }
        }
      })
    },
    updatePermissionByLink (type) {
      this.$store.dispatch('updatePermissionByLink',{
        'digest': this.digest,
        'type': type
      }).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.getPermissionRecordByLink()
          this.btnShow = false
        }
      })
    },
    doConfirm () {
      this.updatePermissionByLink('p')
    },
    doRefuse () {
      this.updatePermissionByLink('n')
    }
  }
}
</script>