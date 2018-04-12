<template>
	<div class="box-section">
        <el-button type="primary" @click="dialogVisible = true">增加会议</el-button>
        <el-table
		    ref="meetTable"
		    :data="meetList"
		    border
		    highlight-current-row
		    style="width: 100%">
		    <el-table-column
		      type="index"
		      width="50" label="序号" align="center">
		    </el-table-column>
		    <el-table-column
		      property="name"
		      label="会议名称"
		      width="120" align="center">
		    </el-table-column>
		    <el-table-column
		      property="mdate"
		      label="时间" align="center">
		      <template slot-scope="scope">
		      	{{ scope.row.mdate | formatDate }}
		      </template>
		    </el-table-column>
		    <el-table-column
		      property="sponsor"
		      label="发起人" align="center">
		    </el-table-column>
		    <el-table-column
		      property="subject"
		      label="主题" align="center">
		    </el-table-column>
		    <el-table-column
		      label="二维码" align="center">
		      <template slot-scope="scope">
		      	<qr-code :mid="scope.row.mid"></qr-code>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="编辑" align="center">
		      <template slot-scope="scope">
		      	<el-button
		          size="mini"
		          type="primary" @click="meetEdit(scope.$index, scope.row)">会议管理</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-dialog
		  title="增加会议"
		  :visible.sync="dialogVisible"
		  width="50%">
		  <el-form :model="form" :rules="meetrules" ref="meetform" label-width="100px">
		  	<el-form-item label="会议名称" prop="name">
		  		<el-input type="text" v-model="form.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="时间" prop="mdate">
		  		<el-date-picker
			      v-model="form.mdate"
			      type="datetime"
			      placeholder="选择日期时间">
			    </el-date-picker>
		  	</el-form-item>
		  	<el-form-item label="发起人" prop="sponsor">
		  		<el-select v-model="form.sponsor" filterable placeholder="请选择员工" @change="setEmp">
		  			<template v-for="item in empList">
		  				<el-option :key="item.empid" :label="item.empName" :value="item.empid"></el-option>
		  			</template>
			    </el-select>
		  	</el-form-item>
		  	<el-form-item label="手机号" prop="phone">
		  		<el-input type="text" v-model="form.phone"></el-input>
		  	</el-form-item>
		  	<el-form-item label="主题" prop="subject">
		  		<el-input type="textarea" v-model="form.subject"></el-input>
		  	</el-form-item>
		  	<el-form-item label="备注" prop="remark">
		  		<el-input type="textarea" v-model="form.remark"></el-input>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addMeetingSave">确 定</el-button>
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
		'userid': '',
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
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        mdate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        phone: [
            { required: true, message: '请选择会议发起人', trigger: 'change' }
        ],
        sponsor: [
            { required: true, message: '请选择会议发起人', trigger: 'change' }
        ],
        subject: [
            { required: true, message: '请填写主题', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
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
  created () {
  	this.getEmpList()
    this.initList()
  },
  methods: {
  	getCache: getCache,
  	meetEdit (index,row) {},
  	setEmp (val) {
  		console.log(val)
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

            })
  	  	} else {}
  	  })
      
  	}
  }
}
</script>
