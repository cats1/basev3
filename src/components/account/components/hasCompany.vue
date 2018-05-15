<template>
	<div>      
		<h3>{{$t('notice.coms.dialog.title2')}}({{comlist.length}})</h3>
		<template v-for="(item,index) in comlist">
			<com-item :data="item" :index="index" @sendupdate="getUpdate" @senddelete="getDelete" ></com-item>
		</template>
    <div class="margintop20">
      <el-button type="default" @click="isShow = true">
      {{$t('btn.addComBtn')}}</el-button>
      <down-company></down-company>
      <upload-company></upload-company>
    </div>
    <edit-com :editType="etype" :coms="curObj" :dialog-show="isShow" @add="getAdd" @close="handClose"></edit-com>
	</div>
</template>
<script>
import editCom from './editCom'
import comItem from './comItem'
import {getCache} from '@/utils/auth'
import gateGroup from './gateGroup'
import {stringToArray,arrayToString} from '@/utils/common'
import { uploadZiLogo,uploadCompany} from '@/components/upload'
import {downCompany} from '@/components/download'
export default {
  components: {editCom,comItem,gateGroup,uploadZiLogo,downCompany,uploadCompany},
  props: {
    comArray: {
      type: Array,
      default: []
    }
  },
  data () {
  	return {
  	  comlist: this.comArray,
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
      isShow: false,
      curObj: {}
  	}
  },
  watch: {
    comArray (val) {
      this.comlist = val
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
      this.curObj = data
      this.isShow = true
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
  	//this.getList()
  }
}
</script>