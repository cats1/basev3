<template>
	<div class="">
		<date-header :set-date="form.date" @getkit="getValue"></date-header>
    <type-header @changekit="getList"></type-header>
    <div class="vlist-wrap boxshadow margintop20 paddingtb20">
      <template v-if="vlist.length > 0">
        <template v-for="(vitem,index) in vlist">
          <visit-item :vdata="vitem" :index="index"></visit-item>
        </template>
      </template>
      <template v-else>
        暂无数据
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
      vlist: []
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
    getList (val) {
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
        }
      })
    },
    getOrderVisitor () {
      this.$store.dispatch('SearchAppointmentByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
        }
      })
    },
    getInviteVisitor () {
      this.$store.dispatch('searchInviteByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
        }
      })
    },
    getVisitVisitor () {
      this.$store.dispatch('SearchRVisitorByCondition',this.oform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
        }
      })
    }
  }
}
</script>