<template>
	<div class="">
		<date-header :set-date="form.date" @getkit="getValue"></date-header>
    <type-header @changekit="getList" :total-num="totalNum" :leavel-num="leavelNum" :on-num="onNum" @totalkit="changeTotal" @leavelkit="changeLeavel" @onkit="changeOn"></type-header>
    <div class="vlist-wrap boxshadow margintop20 paddingtb20">
      <template v-if="vlist.length > 0">
        <template v-for="(vitem,index) in vlist">
          <visit-item :vdata="vitem" :index="index" ></visit-item>
        </template>
      </template>
      <template v-else>
        <p class="paddinglr30">{{$t('nodata')}}</p>
      </template>
    </div>
	</div>
</template>
<script>
import { dateHeader,typeHeader,visitItem } from './components'
import { getCache } from '@/utils/auth'
import {formatDate} from '@/utils/index'
export default {
  components: {dateHeader,typeHeader,visitItem},
  data () {
  	return {
      form: {
        userid: getCache('userid'),
        date: formatDate(new Date(),'yyyy-MM-dd'),
        endDate: formatDate(new Date(),'yyyy-MM-dd'),
        subaccountId: getCache('subaccountId') || 0
      },
      oform: {
        userid: getCache('userid'),
        date: formatDate(new Date(),'yyyy-MM-dd'),
        endDate: formatDate(new Date(),'yyyy-MM-dd')
      },
      vlist: [],
      totalList: [],
      leavelList: [],
      onList: [],
      totalNum: 0,
      leavelNum: 0,
      onNum: 0
    }
  },
  created () {},
  mounted () {
    this.getSignVisitor()
  },
  methods: {
    getValue (val) {
      let nval = formatDate(val,'yyyy-MM-dd')
      this.form.date = nval
      this.form.endDate = nval
      this.getSignVisitor()
    },
    changeTotal () {
      this.vlist = this.totalList
    },
    changeOn () {
      this.vlist = this.onList
    },
    changeLeavel () {
      this.vlist = this.leavelList
    },
    getList (val) {
      this.totalNum = 0
      this.leavelNum = 0
      this.onNum = 0
      if (val === 0) {
        this.getSignVisitor()
      } else if (val === 1) {
        this.getOrderVisitor()
      } else if (val === 2) {
        this.getInviteVisitor()
      } else if (val === 3) {
        this.getVisitVisitor()
      } else {
        this.getSignVisitor()
      }
    },
    getSignVisitor () {
      this.$store.dispatch('SearchVisitByCondition',this.form).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.totalList = result
          this.totalNum = result.length
          let _self = this
          let onArray = []
          let leavelArray = []
          result.forEach(function(element, index) {
            if (element.signOutDate) {
              _self.leavelNum ++
              leavelArray.push(element)
            } else if (element.visitdate && !element.signOutDate){
              _self.onNum ++
              onArray.push(element)
            }
          })
          this.leavelList = leavelArray
          this.onList = onArray
        }
      })
    },
    getOrderVisitor () {
      this.$store.dispatch('SearchAppointmentByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.totalList = result
          this.totalNum = result.length
          let _self = this
          let onArray = []
          let leavelArray = []
          result.forEach(function(element, index) {
            if (element.visitdate || element.signOutDate) {
              _self.onNum ++
              onArray.push(element)
            } else {
              _self.leavelNum ++
              leavelArray.push(element)
            }
          })
          this.leavelList = leavelArray
          this.onList = onArray
        }
      })
    },
    getInviteVisitor () {
      this.$store.dispatch('searchInviteByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.totalList = result
          this.totalNum = result.length
          let _self = this
          let onArray = []
          let leavelArray = []
          result.forEach(function(element, index) {
            if ((element.visitdate && !element.signOutDate) || (element.visitdate && element.signOutDate)) {
              _self.onNum ++
              onArray.push(element)
            } else if (element.appointmentDate && !element.visitdate) {
              _self.leavelNum ++
              leavelArray.push(element)
            }
          })
          this.leavelList = leavelArray
          this.onList = onArray
        }
      })
    },
    getVisitVisitor () {
      this.$store.dispatch('SearchRVisitorByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.totalList = result
          this.totalNum = result.length
          let _self = this
          let onArray = []
          let leavelArray = []
          result.forEach(function(element, index) {
            if (element.visitdate && element.signOutDate) {
              _self.leavelNum ++
              leavelArray.push(element)
            } else if (element.visitdate && !element.signOutDate) {
              _self.onNum ++
              onArray.push(element)
            }
          })
          this.leavelList = leavelArray
          this.onList = onArray
        }
      })
    }
  }
}
</script>