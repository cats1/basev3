<template>
	<div class="block boxshadow">
      <g-title>{{$t('key.title')}}</g-title>
      <el-row class="margintop20 paddinglr30" style="width:60%;">
				<el-form ref="eform" :rules="rules" :model="form" label-width="120px" >
					<el-form-item :label="$t('key.equipeName')" prop="deviceName">
					  <el-input v-model="form.deviceName"></el-input>
					</el-form-item>
          <el-form-item :label="$t('key.equipMark')" prop="deviceCode">
            <el-input v-model="form.deviceCode"></el-input>
          </el-form-item>
          <el-form-item :label="$t('key.extendMark')" prop="extendCode">
            <el-input v-model="form.extendCode"></el-input>
          </el-form-item>
          <el-form-item :label="$t('key.doorNumber')">
            <el-input v-model="form.roomNum"></el-input>
          </el-form-item>
          <el-form-item :label="$t('key.equipIp')">
            <el-input v-model="form.deviceIp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('key.equipPort')">
            <el-input v-model="form.devicePort"></el-input>
          </el-form-item>
          <el-form-item :label="$t('key.headNumber')" prop="deviceQrcode">
            <el-input v-model="form.deviceQrcode"></el-input>
          </el-form-item>
					<el-form-item :label="$t('key.equipDist')">
					  <egroup :eid="eid" @skit="getSelect"></egroup>
					</el-form-item>
					<el-form-item>
					  <el-button type="primary" @click="submitForm">{{$t('btn.saveBtn')}}</el-button>
					  <el-button @click="goBack">{{$t('btn.backListBtn')}}</el-button>
					</el-form-item>
				</el-form>
		</el-row>
	</div>
</template>
<script>
import { gTitle } from '@/components/title'
import { getCache } from '@/utils/auth'
import { valueToString } from '@/utils/common'
import egroup from './egroup'
export default {
  components: {gTitle,egroup},
  data () {
  	return {
  	  form: {
  	  	deviceCode: '',
  	  	deviceIp: '',
  	  	deviceName: '',
        devicePort: '',
        deviceQrcode: '',
        extendCode: '',
        roomNum: '',
        egids: [],
  	  	userid: getCache('userid')
  	  },
      rules: {
      	deviceName: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }
        ],
        deviceCode: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }
        ],
        extendCode: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }
        ],
        deviceQrcode: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }
        ]
      },
      editType: 0,
      eid: '',
      table: [],
      stable: []
  	}
  },
  methods: {
    getSelect (val) {
      console.log(val)
      let varray = []
      val.forEach(function(ele,index){
        varray.push(ele.egid)
      })
      this.form.egids = varray
    },
    getGroupList () {
      let newForm = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getEquipmentGroupByUserid',newForm).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.table = result
        }
      })
    },
  	submitForm () {
      console.log(parseInt(this.editType))
      if (parseInt(this.editType) !== 1) {
        this.$refs.eform.validate(valid => {
          if (valid) {
            console.log(this.form)
            this.$store.dispatch('updateEquipment',this.form)
          }
        })
      } else {
        this.$refs.eform.validate(valid => {
          if (valid) {
            this.$store.dispatch('addEquipment',this.form)
          }
        })
      }  	  
  	},
  	goBack () {
  	  this.$router.push({name:'equiplist'})
  	}
  },
  created () {
    this.getGroupList()
  	if (this.$route.params.eid) {      
      this.form = this.$store.state.key.groupD
      if (this.form.egids === null) {
        this.form.egids = []
      }
      this.form.eid = this.$route.params.eid
      this.eid = this.$route.params.eid
  	} else {
      this.editType = 1
    }
  },
  mounted () {

  }
}
</script>