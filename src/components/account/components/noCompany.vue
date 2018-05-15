<template>
	<div class="margintb20">
		<div class="center">
			<img :src="comSrc" alt="">
		    <div class="margintop20">
		      <el-button type="default" @click="isShow = true">
		      {{$t('btn.addComBtn')}}</el-button>
		      <div class="margintop20"><down-company></down-company></div>
		      <div class="margintop20"><upload-company></upload-company></div>
		    </div>
		</div>
		<edit-com :editType="0" :dialog-show="isShow" @add="getAdd" @close="handClose"></edit-com>
	</div>
</template>
<script>
import editCom from './editCom'
import gateGroup from './gateGroup'
import {getCache} from '@/utils/auth'
import {stringToArray,arrayToString} from '@/utils/common'
import { uploadZiLogo,uploadCompany} from '@/components/upload'
import {downCompany} from '@/components/download'
export default {
  components: {uploadZiLogo,downCompany,uploadCompany,gateGroup,editCom},
  data () {
  	return {
      comSrc: require('@/assets/img/commac.png'),
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
      },
      isShow: false
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
    },
    getAdd () {
      this.$emit('addkit')
    },
    handClose () {
      this.isShow = false
    }
  },
  created () {
  	this.getList()
  }
}
</script>