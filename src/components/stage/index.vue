<template>
	<div class="">
		<date-header :set-date="form.date" @getkit="getValue"></date-header>
    <type-header @changekit="getList" :total-num="totalNum" :leavel-num="leavelNum" :on-num="onNum" :check-array="checkArray" @totalkit="changeTotal" @leavelkit="changeLeavel" @onkit="changeOn" @outkit="doAllOut" @outconfirmkit="doAllConfirm" @searchkit="searchVisitor" @outcancelkit="doAllCancel"></type-header>
    <div class="vlist-wrap boxshadow margintop20 paddingtb20">
      <template v-if="vlist.length > 0">
        <template v-for="(vitem,index) in vlist">
          <visit-item :vdata="vitem" :index="index" :item-check="vCheck[index]" @checkkit="changeCheck"></visit-item>
        </template>
      </template>
      <template v-else>
        <p class="paddinglr30">{{$t('nodata')}}</p>
      </template>
    </div>
	</div>
</template>
<script>
import { dateHeader,typeHeader,visitItem } from '@/components/home/components'
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
      vCheck: [],
      totalList: [],
      leavelList: [],
      onList: [],
      totalNum: 0,
      leavelNum: 0,
      onNum: 0,
      checkArray: [],
      onShowType: 0
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
      this.oform.date = nval
      this.oform.endDate = nval
      this.getSignVisitor()
    },
    changeTotal () {
      this.onShowType = 0
      this.vlist = this.totalList
    },
    changeOn () {
      this.onShowType = 1
      this.vlist = this.onList
    },
    changeLeavel () {
      this.onShowType = 2
      this.vlist = this.leavelList
    },
    searchVisitor (val) {
      let _self = this
      if (val !== '') {
        let varray = []
        this.vlist.forEach(function(element, index) {
          if (element.vname.indexOf(val) > -1){
            varray.push(element)
          }
        })
        this.vlist = varray
      } else {
        this.initVlist()
      }
    },
    changeCheck (val,index) {
      console.log(val,index)
      this.vCheck[index] = val
      let _self = this
      let varray = []
      this.checkArray.forEach(function(element, index) {
        if (_self.vCheck[index]){
          varray.push(element)
        }
      })
      this.checkArray = varray
    },
    doAllOut () {
      this.checkArray = this.vlist
      let _self = this
      this.checkArray.forEach(function(element, index) {
        _self.vCheck[index] = true
      })
    },
    doAllConfirm () {
      let _self = this
      let varray = []
      this.vCheck.forEach(function(element, index) {
        _self.vCheck[index] = false
      })
      this.getList(0)
    },
    doAllCancel (val) {
      let _self = this
      let varray = []
      this.checkArray.forEach(function(element, index) {
        _self.vCheck[index] = false
      })
      this.checkArray = []
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
    initVlist () {
      if (this.onShowType === 0) {
        this.vlist = this.totalList
      } else if (this.onShowType === 1) {
        this.vlist = this.onList
      } else if (this.onShowType === 2) {
        this.vlist = this.leavelList
      } else {
        this.vlist = this.totalList
      }
      let _self = this
      let onArray = []
      this.vlist.forEach(function(element, index) {
        _self.vCheck[index] = false
      })
    },
    getSignVisitor () {
      this.$store.dispatch('SearchVisitByCondition',this.form).then(res => {
        let {status,result} = res
        if (status === 0) {
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
          this.initVlist()
        }
      })
    },
    getOrderVisitor () {
      this.$store.dispatch('SearchAppointmentByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
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
          this.initVlist()
        }
      })
    },
    getInviteVisitor () {
      this.$store.dispatch('searchInviteByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
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
          this.initVlist()
        }
      })
    },
    getVisitVisitor () {
      this.$store.dispatch('SearchRVisitorByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
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
          this.initVlist()
        }
      })
    }
  }
}
</script>