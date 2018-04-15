<template>
	<div class="block boxshadow">
      <g-title>设备信息</g-title>
      <el-row class="margintop20 paddinglr30">
				<el-form ref="eform" :rules="rules" :model="form" label-width="120px">
					<el-form-item label="设备名称">
					  <el-input v-model="form.deviceName"></el-input>
					</el-form-item>
          <el-form-item label="设备标识">
            <el-input v-model="form.deviceCode"></el-input>
          </el-form-item>
          <el-form-item label="扩展标识">
            <el-input v-model="form.extendCode"></el-input>
          </el-form-item>
          <el-form-item label="门号">
            <el-input v-model="form.roomNum"></el-input>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="form.deviceIp"></el-input>
          </el-form-item>
          <el-form-item label="设备端口号">
            <el-input v-model="form.devicePort"></el-input>
          </el-form-item>
          <el-form-item label="读头编号">
            <el-input v-model="form.deviceQrcode"></el-input>
          </el-form-item>
					<el-form-item label="设备组分配">
					  <el-table
              ref="multipleTable"
              :data="table"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="组名称">
                <template slot-scope="scope">{{ scope.row.egname }}</template>
              </el-table-column>
              <el-table-column
                label="开启状态" >
                <template slot-scope="scope">{{ scope.row.status }}</template>
              </el-table-column>
            </el-table>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">确认保存</el-button>
					    <el-button @click="goBack">返回列表</el-button>
					</el-form-item>
				</el-form>
		</el-row>
	</div>
</template>
<script>
import { gTitle } from '@/components/title'
import { getCache } from '@/utils/auth'
import { valueToString } from '@/utils/common'
export default {
  components: {gTitle},
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
  	  title: this.editType === 0 ? this.$t('key.group.addtitle') : this.$t('key.group.edittitle'),
      rules: {
      	egname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      editType: 0,
      eid: 0,
      table: []
  	}
  },
  methods: {
    handleSelectionChange () {},
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
      if (this.editType === 1) {
        this.$refs.eform.validate(valid => {
          if (valid) {
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
  	  this.$router.push({path:'list'})
  	}
  },
  created () {
    this.getGroupList()
  	if (this.$route.params.type) {
      this.editType = 1
      this.form = this.$store.state.key.groupD
      this.form.etype = valueToString(this.form.etype)
      this.form.status = valueToString(this.form.status)
  	}
  },
  mounted () {

  }
}
</script>