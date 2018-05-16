<template>
	<div>
		<h3 class="margintop20 marginbom20 right">
			<down-invite-moban></down-invite-moban>
	    <upload-invite id="excel" eType="success" @sendkit="getUpload"></upload-invite>
		</h3>
		<el-table class="marginbom20" :data="table" border>
			<el-table-column
		      type="index"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      property="name"
		      :label="$t('form.name.text')">
		        <template slot-scope="scope">
				    <el-input v-model="scope.row.name"></el-input>
				</template>
		    </el-table-column>
		    <el-table-column property="phone"
		      :label="$t('form.phone.text')">
		        <template slot-scope="scope">
				    <el-input v-model="scope.row.phone"></el-input>
				</template>
		    </el-table-column>
		    <el-table-column
		      property="vcompany"
		      :label="$t('form.company.text2')">
		        <template slot-scope="scope">
				    <el-input v-model="scope.row.vcompany"></el-input>
				</template>
		    </el-table-column>
		    <el-table-column
		      property="date"
		      :label="$t('form.remark.text')">
		        <template slot-scope="scope">
				    <el-input v-model="scope.row.remark"></el-input>
				</template>
		    </el-table-column>
		    <el-table-column prop="status" :label="$t('btn.edit1')" width="120">
				<template slot-scope="scope">
					<el-button type="error" v-if="scope.row.etype === 1" @click="delettype">{{$t('btn.deleteBtn')}}</el-button>
				    <el-button type="primary" v-else @click="edittype">{{$t('btn.addBtn')}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<meeting-moban :isshow="isshow" :mid="mid" :mdata="table" @savekit="saveMeeting" @sendkit="sendMeetInvite"></meeting-moban>
    <moban-dialog :mobanFlag="mobanFlag" :ptip="$t('moban.tip1')" @closekit="getClose"></moban-dialog>	
	</div>
</template>
<script>
import {downInviteMoban} from '@/components/download'
import {uploadInvite} from '@/components/upload'
import { getCache } from '@/utils/auth'
import {mobanDialog} from '@/components/dialog'
import meetingMoban from '@/components/moban/meettingMoban'
export default {
  components: {downInviteMoban,uploadInvite,meetingMoban,mobanDialog},
  props: ['mid','isshow'],
  data () {
  	return {
  	  table: [{
      	address: '',
      	appointmentDate: '',
      	companyProfile: '',
      	empid: '',
      	inviteContent: '',
      	latitude: '',
      	longitude: '',
      	name: '',
      	phone: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: '',
      	etype: 0
      },{
      	address: '',
      	appointmentDate: '',
      	companyProfile: '',
      	empid: '',
      	inviteContent: '',
      	latitude: '',
      	longitude: '',
      	name: '',
      	phone: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: '',
      	etype: 0
      },{
      	address: '',
      	appointmentDate: '',
      	companyProfile: '',
      	empid: '',
      	inviteContent: '',
      	latitude: '',
      	longitude: '',
      	name: '',
      	phone: '',
      	qrcodeConf: '',
      	qrcodeType: '',
      	remark: '',
      	traffic: '',
      	userid: '',
      	vcompany: '',
      	visitType: '',
      	etype: 0
      }],
  	  form: {
        mid: ''
      },
      mobj: {},
      mobanShow: true,
      mobanFlag: false
  	}
  },
  watch: {
  	mid (val,old) {
  	  this.form.mid = val
  	}
  },
  created () {},
  methods: {
  	getUpload (result) {
      this.table = result
      let _self = this
      this.table.forEach(function(ele,index){
        _self.$set(ele,'etype',1)
      })
    },
    edittype (index) {
      this.$set(this.table[index],'etype',1)
    },
    delettype (index) {
      if (this.table.length > 1) {
        this.table.splice(index,1)
      } else {
        this.$message({
          type: 'error',
          message: this.$t('moban.tip5')
        })
      }
    },
    saveMeeting (val) {
      this.$store.dispatch('updateMeeting',val)
    },
    sendMeetInvite (val) {
      let nform = []
      let _self = this
      this.table.forEach(function(ele,index){
        if (ele.name&&ele.phone) {
          let vobj = {
            userid: getCache('userid'),
            empid: val.empid,
            name: ele.name,
            phone: ele.phone,
            appointmentDate: val.mdate,
            visitType: "会议",
            inviteContent: val.inviteContent,
            address: val.address,
            longitude: val.longitude,
            latitude: val.latitude,
            companyProfile: "",
            traffic: "",
            vcompany: ele.vcompany,
            remark: ele.remark,
            mid: val.mid
          }
          nform.push(vobj)
        }
      })
      if (nform.length === 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: this.$t('moban.tip6')
        })
      } else {
        this.$store.dispatch('addAppointment',nform).then(res => {
          let {status} = res
          if (status === 0) {
            this.mobanFlag = true
          }
        })
      }
    },
    getClose () {
      console.log('8989')
    }
  }
}
</script>