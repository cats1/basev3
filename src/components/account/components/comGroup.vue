<template>
	<div>
		<h3>{{$t('notice.coms.dialog.title2')}}({{comlist.length}})</h3>
		<template v-for="(item,index) in comlist">
			<com-item :data="item" :index="index" @sendupdate="getUpdate" @senddelete="getDelete" ></com-item>
		</template>
    <div class="margintop20">
      <el-button type="default" @click="dialogVisible = true">
      {{$t('btn.addComBtn')}}</el-button>
      <down-company></down-company>
      <upload-company></upload-company>
    </div>
    <el-dialog
      :title="$t('notice.coms.dialog.title')"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="form" :rules="rules" ref="comform">
        <el-form-item prop="companyName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item>
          <upload-zi-logo ctype="2" :imglogo="form.logo" @changelogo="changelogo"></upload-zi-logo>
        </el-form-item>
        <h3>{{$t('notice.coms.dialog.title1')}}</h3>
        <el-form-item prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.floor"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item >
          <gate-group :check-array="stringToArray(form.egids)" @getclist="setgate"></gate-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="saveForm">{{$t('btn.saveBtn')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import comItem from './comItem'
import {getCache} from '@/utils/auth'
import gateGroup from './gateGroup'
import {stringToArray,arrayToString} from '@/utils/common'
import { uploadZiLogo,uploadCompany} from '@/components/upload'
import {downCompany} from '@/components/download'
export default {
  components: {comItem,gateGroup,uploadZiLogo,downCompany,uploadCompany},
  data () {
  	return {
  	  comlist: [],
      dialogVisible: false,
      form: {
        companyName: '',
        logo: '',
        phone: '',
        email: '',
        floor: '',
        roomNumber: '',
        egids: ''
      },
      etype: 0,
      rules: {
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
  	}
  },
  methods: {
    stringToArray: stringToArray,
  	getList () {
  	  let nform = {
  	  	userid: getCache('userid')
  	  }
  	  this.$store.dispatch('getSubAccountByUserid',nform).then(res => {
  	  	let {status,result} = res
  	  	if (status === 0) {
          this.comlist = result
  	  	}
  	  })
  	},
    getUpdate (data,index) {
      this.etype = 1
      this.form = data
      this.dialogVisible = true
    },
    getDelete (data,index) {
      this.getList()
    },
    setgate (value) {
      this.form.egids = arrayToString(value)
    },
    changelogo (url) {
      this.form.logo = url
    },
    saveForm () {
      this.$refs.comform.validate((valid) => {
        if (valid) {
          if (this.form.egids === '') {
            this.$message({
              message: '至少选择一组闸机',
              type: 'warning'
            })
          } else if (this.form.logo === '') {
            this.$message({
              message: '请上传头像',
              type: 'warning'
            })
          } else {
            if (this.etype === 0) {
              this.addForm()
            } else {
              this.updateForm()
            }
          }
        }
      })
    },
    addForm () {
      this.$store.dispatch('addSubAccount',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.etype = 0
          this.dialogVisible = false
        }
      })
    },
    updateForm () {
      this.$store.dispatch('updateSubAccount',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
        }
      })
    }
  },
  created () {
  	this.getList()
  }
}
</script>