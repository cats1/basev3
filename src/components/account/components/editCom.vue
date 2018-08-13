<template>
	<el-dialog
      :title="$t('notice.coms.dialog.title')"
      :visible.sync="dialogVisible"
      width="50%" @close="handClose">
      <el-form :model="form" :rules="rules" ref="comform">
        <el-form-item prop="companyName">
          <el-input v-model="form.companyName" :placeholder="$t('comNameHolder')"></el-input>
        </el-form-item>
        <el-form-item><!--  -->
          <show-photo class="marginlr20" :img-src="form.logo" @deletekit="changeDele"></show-photo>
          <p>{{$t('picTips.logotip')}}</p>
          <upload-pic-btn class="margintop20" :imgtype="0" @sendkit="changelogo"></upload-pic-btn>
        </el-form-item>
        <h3>{{$t('notice.coms.dialog.title1')}}</h3>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('form.phone.text')"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" :placeholder="$t('form.email.text')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.floor" :placeholder="$t('floorNumber')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.roomNumber" :placeholder="$t('roomNumber')"></el-input>
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
</template>
<script>
import comItem from './comItem'
import {getCache} from '@/utils/auth'
import gateGroup from './gateGroup'
import {stringToArray,arrayToString} from '@/utils/common'
import { uploadZiLogo,uploadCompany} from '@/components/upload'
import {downCompany} from '@/components/download'
import {showPhoto} from '@/components/photo'
import uploadPicBtn from '@/components/upload/uploadPicBtn'
export default {
  components: {comItem,gateGroup,uploadZiLogo,downCompany,uploadCompany,showPhoto,uploadPicBtn},
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    editType: {
      type: Number,
      default: 0
    },
    coms: {
      type: Object,
      default: this.form
    }
  },
  data () {
  	return {
      dialogVisible: this.dialogShow,
      comObj: this.coms,
      form: {
        companyName: '',
        logo: '',
        phone: '',
        email: '',
        floor: '',
        roomNumber: '',
        egids: '',
        balance: 0,
        userid: getCache('userid')
      },
      etype: this.editType,
      rules: {
        companyName: [
          { required: true, message: this.$t('comNameHolder'), trigger: 'blur' },
          { min: 1, max: 6, message: this.$t('comNameHolder'), trigger: 'blur' }
        ],
        phone: [{ required: true, message: this.$t('formCheck.validphone.tip2'), trigger: 'blur' }],
        email: [{ required: true, message: this.$t('formCheck.validEmail.tip2'), trigger: 'blur' }]
      }
  	}
  },
  watch: {
    coms (val) {
      this.form.companyName = val.companyName,
      this.form.logo = val.logo,
      this.form.phone  = val.phone,
      this.form.email  = val.email,
      this.form.floor  = val.floor,
      this.form.roomNumber  = val.roomNumber,
      this.form.egids  = val.egids
      this.form.id = val.id
    },
    dialogShow (val) {
      this.dialogVisible = val
    },
    editType (val) {
      this.etype = val
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
    changeDele () {
      this.form.logo = ''
    },
    changelogo (url) {
      this.form.logo = url
    },
    saveForm () {
      this.$refs.comform.validate((valid) => {
        if (valid) {
          if (this.form.egids === '') {
            this.$message({
              showClose: true,
              message: this.$t('lessOneGate'),
              type: 'warning'
            })
          } else if (this.form.logo === '') {
            this.$message({
              showClose: true,
              message: this.$t('form.photo.tip'),
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
          this.$emit('add')
        }
      })
    },
    updateForm () {
      this.$store.dispatch('updateSubAccount',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.etype = 0
          this.dialogVisible = false
          this.$emit('add')
        }
      })
    },
    handClose () {
      this.$emit('close')
    }
  }
}
</script>