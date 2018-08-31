<template>
	<el-dialog
		  :title="$t('visitTypeText')"
		  :visible.sync="dialogVisible"
		  width="30%"
		  @close="handleClose">
		  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form-inline">
		  	<el-form-item :label="$t('visitTypeText')" prop="vType">
			   <el-input v-model="form.vType" :placeholder="$t('visitTypeText')"></el-input>
			</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="saveBtn">{{$t('btn.confirmBtn')}}</el-button>
		  	<el-button type="danger" @click="deleteBtn" v-show="etype === 1">{{$t('btn.deleteBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		  </span>
	</el-dialog>
</template>
<script>
import { getCache } from '@/utils/auth'
import {isEmptyObject} from '@/utils/common'
export default {
  props: {
  	isShow: {
  	  type: Boolean,
  	  default: false
  	},
  	editType: {
  	  type: Number,
  	  default: 0
  	},
  	editObj: {
  	  type: Object,
  	  default: function () {
  	  	return {}
  	  }
  	}
  },
  data () {
  	return {
  	  dialogVisible: false,
  	  form: {
  	  	userid: getCache('userid'),
  	  	vType: '',
  	  	tid: 0
  	  },
  	  etype: this.editType,
  	  rules: {
  	  	vType: [
          { required: true, message: this.$t('pleaseInputVtype'), trigger: 'blur' }
        ]
  	  }
  	}
  },
  watch: {
  	isShow (val) {
  	  this.dialogVisible = val
  	},
  	editType (val) {
  	  this.etype = val
  	},
  	editObj (val) {
  	  if (!isEmptyObject(val)) {
      	this.form.vType = val.name
  	    this.form.tid = val.id
      } else {
      	this.form = {
	  	  userid: getCache('userid'),
	  	  vType: ''
	  	}
      }
  	}
  },
  mounted () {
  	console.log(this.editObj)
  },
  methods: {
  	handleClose () {
  	  this.$emit('wclose')
  	},
  	saveBtn () {
  	  if (this.etype == 0) {
  	  	this.addVisitType()
  	  } else if (this.etype == 1) {
  	  	this.updateVisitType()
  	  }
  	},
  	deleteBtn () {
  	  this.deleteVisitType()
  	},
  	addVisitType () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let nform = {
            userid: getCache('userid'),
            vType: this.form.vType
          }
          this.$store.dispatch('addVisitorType',nform).then(res => {
            let {status,result} = res
            if (status === 0) {
              this.dialogVisible = false
              this.form = {
                userid: getCache('userid'),
                vType: '',
                tid: 0
              }
            }
          })
        }
      })
  	},
  	updateVisitType () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let nform = {
            tid: this.form.tid,
            userid: getCache('userid'),
            vType: this.form.vType
          }
          this.$store.dispatch('updateVisitorType',nform).then(res => {
            let {status,result} = res
            if (status === 0) {
              this.dialogVisible = false
              this.form = {
                userid: getCache('userid'),
              vType: '',
              tid: 0
              }
            }
          })
        }
      })
  	},
  	deleteVisitType () {
  	  let nform = {
  	  	tid: this.form.tid,
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('delVisitorType',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
  	  	  this.dialogVisible = false
  	  	  this.form = {
  	  	  	userid: getCache('userid'),
	  	  	  vType: '',
	  	  	  tid: 0
  	  	  }
  	  	}
  	  })
  	}
  }
}
</script>