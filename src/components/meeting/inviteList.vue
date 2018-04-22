<template>
	<div>
		<el-table :data="inviteArray" border>
			<el-table-column
		      type="index"
		      :label="$t('tablehead[0]')"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      :label="$t('tablehead[1]')">
		    </el-table-column>
		    <el-table-column
		      prop="phone"
		      :label="$t('tablehead[6]')">
		    </el-table-column>
		    <el-table-column
		      prop="visitType"
		      :label="$t('tablehead[7]')">
		    </el-table-column>
		    <el-table-column
		      prop="appointmentDate"
		      :label="$t('tablehead[8]')">
		      <template slot-scope="scope">
		        {{scope.row.appointmentDate | formatDate}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="company"
		      :label="$t('tablehead[9]')">
		    </el-table-column>
		    <el-table-column
		      prop="remark"
		      :label="$t('form.remark.text')">
		    </el-table-column>
		    <el-table-column
		      prop="status"
		      :label="$t('tablehead[10]')">
		      <template slot-scope="scope">
		        {{scope.row.status | formatMeetStatus}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="sendStatus"
		      :label="$t('tablehead[11]')">
		      <template slot-scope="scope">
		        {{scope.row.sendStatus | formatMeetSendStatus}}
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
import { formatDate } from '@/utils'
import { formatMeetStatus,formatMeetSendStatus } from '@/utils/common'
export default {
  props: [ 'mid'],
  data () {
  	return {
  	  inviteArray: []
  	}
  },
  filters:{
  	formatDate (time) {
  	  let date = new Date(time)
  	  return formatDate(date, 'yyyy-MM-dd hh:mm')
  	},
  	formatMeetStatus (num) {
  	  return formatMeetStatus(num)
  	},
  	formatMeetSendStatus (num) {
  	  return formatMeetSendStatus(num)
  	} 
  },
  methods: {
  	getInviteList () {
  	  let newForm = {
  	  	mid: this.mid
  	  }
  	  this.$store.dispatch('getAppointmentByMid',newForm).then(res => {
  	  	let { status, result } = res
  	  	if (status === 0) {
  	  		this.inviteArray = result
  	  	}
  	  })
  	}
  },
  mounted () {
  	this.$nextTick(function(){
  		this.getInviteList()
  	})
  }
}
</script>