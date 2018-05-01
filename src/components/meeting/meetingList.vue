<template>
	<div class="box-section">
        <el-button type="primary" @click="dialogVisible = true"><i class="fa fa-plus"></i>{{$t('btn.addMeeting')}}</el-button>
        <el-table
		    ref="meetTable"
		    :data="meetList"
		    border
		    highlight-current-row
		    style="width: 100%" class="margintop20">
		    <el-table-column
		      type="index"
		      width="50" :label="$t('tablehead[0]')" align="center">
		    </el-table-column>
		    <el-table-column
		      property="name" :label="$t('tablehead[1]')"
		      width="120" align="center">
		    </el-table-column>
		    <el-table-column
		      property="mdate"
		      :label="$t('tablehead[2]')" align="center">
		      <template slot-scope="scope">
		      	{{ scope.row.mdate | formatDate }}
		      </template>
		    </el-table-column>
		    <el-table-column
		      property="sponsor" :label="$t('tablehead[3]')" align="center">
		    </el-table-column>
		    <el-table-column
		      property="subject" :label="$t('tablehead[4]')" align="center">
		    </el-table-column>
		    <el-table-column :label="$t('tablehead[5]')" align="center">
		      <template slot-scope="scope">
		      	<qr-code :mid="scope.row.mid" :width="36" :height="36"></qr-code>
		      </template>
		    </el-table-column>
		    <el-table-column
		      :label="$t('btn.editBtn')" align="center">
		      <template slot-scope="scope">
		      	<el-button
		          size="mini"
		          type="primary" @click="meetEdit(scope.$index, scope.row)">{{$t('btn.editMeeting')}}</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-dialog
		  :title="$t('btn.addMeeting')"
		  :visible.sync="dialogVisible"
		  width="50%">
		  <el-form :model="form" :rules="meetrules" ref="meetform" label-width="100px">
		  	<el-form-item :label="$t('tablehead[1]')" prop="name">
		  		<el-input type="text" v-model="form.name"></el-input>
		  	</el-form-item>
		  	<el-form-item :label="$t('tablehead[2]')" prop="mdate">
		  		<el-date-picker
			      v-model="form.mdate"
			      type="datetime">
			    </el-date-picker>
		  	</el-form-item>
		  	<el-form-item :label="$t('tablehead[3]')" prop="sponsor">
		  		<el-select v-model="form.sponsor" filterable @change="setEmp">
		  			<template v-for="item in empList">
		  				<el-option :key="item.empid" :label="item.empName" :value="item.empid"></el-option>
		  			</template>
			    </el-select>
		  	</el-form-item>
		  	<el-form-item :label="$t('tablehead[6]')" prop="phone">
		  		<el-input type="text" v-model="form.phone"></el-input>
		  	</el-form-item>
		  	<el-form-item :label="$t('tablehead[4]')" prop="subject">
		  		<el-input type="textarea" v-model="form.subject"></el-input>
		  	</el-form-item>
		  	<el-form-item :label="$t('form.remark.text')" prop="remark">
		  		<el-input type="textarea" v-model="form.remark"></el-input>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="addMeetingSave">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
		</el-dialog>
    </div>
</template>
<script>
import qrCode from '@/components/qrCode/qrCode'
import { getCache } from '@/utils/auth'
import { formatDate } from '@/utils'
export default {
  components: { qrCode },
  data () {
  	return {
  	  meetList: [],
  	  empList: [],
  	  dialogVisible: false,
  	  form: {
  	  	'name': '',
		'phone': '',
		'email': '',
		'userid': getCache('userid'),
		'subject': '', //主题
		'mdate': '',
	    'sponsor': '', //发起人
	    'remark': '',
	    'empid': '',
	    'inviteContent': '',
	    'address': '',
	    'longitude': '',
	    'latitude': '',
	    'companyProfile': '',
	    'traffic': ''
  	  },
  	  meetrules: {
  	  	name:[
            { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }
        ],
        mdate: [
            { type: 'date', required: true, message: this.$t('formCheck.time.tip1'), trigger: 'change' }
        ],
        phone: [
            { required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }
        ],
        sponsor: [
            { required: true, message: this.$t('formCheck.validName.tip4'), trigger: 'change' }
        ],
        subject: [
            { required: true, message: this.$t('formCheck.meeting.tip1'), trigger: 'blur' }
        ],
        remark: [
            { required: true, message: this.$t('formCheck.remark.tip1'), trigger: 'blur' }
        ]
  	  }
  	}
  },
  filters:{
  	formatDate (time) {
  	  let date = new Date(time)
  	  return formatDate(date, 'yyyy-MM-dd hh:mm')
  	}
  },
  mounted () {
  	this.getEmpList()
    this.initList()
  },
  methods: {
  	getCache: getCache,
  	meetEdit (index,row) {
      this.$router.push({name:'mdetail',
      	params: { 
      		'mid': row.mid
      	}})
  	},
  	setEmp (val) {
  		let _self = this
  		this.empList.forEach(function(ele,index){
          if (ele.empid === val) {
          	_self.form.phone = ele.empPhone
          }
  		})
  	},
  	initList () {
  	  let nfrom = {
  	  	userid: this.getCache('userid')
  	  }
      this.$store.dispatch('getMeetingByUserid',nfrom).then(res => {
      	let { status, result } = res
      	if (status === 0) {
          this.meetList = result
      	}
      })
  	},
  	getEmpList () {
  		let newForm = {
  			userid: getCache('userid')
  		}
  		this.$store.dispatch('GetEmpList',newForm).then(res => {
  			let { status, result } = res
	      	if (status === 0) {
	          this.empList = result
	      	}
  		})
  	},
  	addMeetingSave () {
  	  this.$refs.meetform.validate(valid => {
  	  	if (valid) {
  	  		this.$store.dispatch('addMeeting',this.form).then(res => {
              let { status } = res
              if (status === 0) {
              	this.initList()
              	this.$refs['meetform'].resetFields()
		        this.dialogVisible = false
              }
            })
  	  	}
  	  })
      
  	}
  }
}
</script>
