<template>
	<div>
	  <div class="boxshadow bgwhite paddinglr30 paddingtb20 marginbom20">
		<el-button type="default" @click="dialogVisible = true"><i class="fa fa-user-times"></i>{{$t('btn.addBlackBtn')}}</el-button>
		<el-button type="redline" @click="deleteBlack"><i class="fa fa-trash-o"></i>{{$t('btn.dotDeleteBtn')}}</el-button>
	  </div>
	  <div class="boxshadow bgwhite paddinglr30 paddingtb20">
	  	<el-table :data="list" border  @selection-change="handleSelectionChange">
	  		<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	  		<el-table-column prop="name" :label="$t('form.name.text')"></el-table-column>
	  		<el-table-column prop="credentialNo" :label="$t('form.idnum.text')"></el-table-column>
	  		<el-table-column prop="phone" :label="$t('form.phone.text')"></el-table-column>
	  	</el-table>
	  	<div class="page-footer">
	  		<el-pagination background
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
          @prev-click="handleCurrentChange"
          @next-click="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="requestedCount"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	  	</div>
	  </div>
	  <el-dialog
      :title="$t('black.wins.title')"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="form" ref="blackform" :rules="rules" :inline="true">
        <el-form-item prop="name" :label="$t('form.name.text')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" :label="$t('form.phone.text')" >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="credentialNo" :label="$t('form.idnum.text')">
          <el-input v-model="form.credentialNo"></el-input>
        </el-form-item>
        <el-form-item >
          <p>{{$t('phoneIdnum.text')}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="addBlack">{{$t('btn.saveBtn')}}</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import rightWindow from '@/components/window/rightWindow'
import { isvalidatPhone, checkIdCard } from '@/utils/validate'
export default {
  components: {rightWindow},
  data () {
    const isvalidPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('formCheck.validphone.tip2')))
      } else if (!isvalidatPhone(value)) {
        callback(new Error(this.$t('validphone.tip1')))
      } else {
        callback()
      }
    }
    const isvalidIdNum = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (checkIdCard(value) !== '验证通过!') {
        callback(new Error(checkIdCard(value)))
      } else {
        callback()
      }
    }
  	return {
  	  list: [],
  	  form: {
  	  	'userid': getCache('userid'),
        'credentialNo': '',
        'name': '',
        'phone': '',
        'startIndex': 1,
        'requestedCount': 10
  	  },
      rules: {
        name: [
          { required: true, message: this.$t('formCheck.validName.tip3'), trigger: 'blur' }
        ],
        phone: [{ required: true,trigger: 'blur', validator: isvalidPhone }],
        credentialNo: [{ required: false,trigger: 'blur', validator: isvalidIdNum }]
      },
  	  total: 0,
      currentPage: 1,
      requestedCount: 10,
  	  dform: {
  	  	userid: getCache('userid'),
  	  	bids: []
  	  },
      editType: 0,
      dialogVisible: false
  	}
  },
  computed: {
    dTitle () {
      if (this.editType === 0) {
        return this.$t('black.wins.title')
      } else if (this.editType === 1) {
        return this.$t('black.wins.title')
      }
    }
  },
  methods: {
  	getList () {
  	  this.$store.dispatch('getBlacklist',this.form).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.list = result.list
  	  	  this.total = result.count
  	  	}
  	  })
  	},
  	handleSizeChange (val) {
      this.currentPage = 1
      this.requestedCount = val
      this.form.startIndex = 1
  	  this.form.requestedCount = val
      this.getList()
  	},
  	handleCurrentChange (val) {
  	  this.form.startIndex = (val - 1) * this.requestedCount + 1
      this.getList()
  	},
  	handleSelectionChange (val) {
  	  //this.clist = val
  	  let _self = this
  	  val.forEach(function(ele,index){
        _self.dform.bids.push(ele.bid)
  	  })
  	},
    addBlack () {
      this.$refs.blackform.validate((valid) => {
        if (valid) {
          if (this.form.credentialNo === '' && this.form.phone ==='') {
            this.$message({
              showClose: true,
              message: this.$t('phoneIdnum.tips'),
              type: 'error'
            })
          } else {
            let nform = {
              userid: getCache('userid'),
              credentialNo: this.form.credentialNo,
              name: this.form.name,
              phone: this.form.phone
            }
            this.$store.dispatch('addBlacklist',nform).then(res => {
              let {status} = res
              if (status === 0) {
                this.dialogVisible = !this.dialogVisible
                this.$refs.blackform.resetFields()
                this.$refs.blackform.clearValidate()
                this.getList()
              }
            })
          }
        }
      })
    },
  	deleteBlack () {
      if (this.dform.bids.length > 0) {
        this.$store.dispatch('delBlacklist',this.dform).then(res => {
          let {status} = res
          if (status === 0) {
            this.getList()
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('selectOneMore'),
          type: 'warning'
        })
      }
  	}
  },
  created () {
  	this.getList()
  }
}
</script>