<template>
	<div class="block boxshadow">
        <g-title>添加设备组</g-title>
        <el-row class="margintop20 paddinglr30">
			<el-col :span="4">
				<img :src="logoSrc" alt="">
			</el-col>
			<el-col :span="12">
				<el-form ref="eform" :rules="rules" :model="form" label-width="120px">
					<el-form-item label="组名">
					  <el-input v-model="form.egname"></el-input>
					</el-form-item>
					<el-form-item label="组名">
					  <el-radio-group v-model="form.status">
					      <el-radio label='1'>启用</el-radio>
					      <el-radio label='2'>禁用</el-radio>
					  </el-radio-group>
					</el-form-item>
					<el-form-item label="组名">
					  <el-radio-group v-model="form.etype">
					      <el-radio label="1">员工</el-radio>
					      <el-radio label="2">访客</el-radio>
					      <el-radio label="0">员工和访客</el-radio>
					  </el-radio-group>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					    <el-button @click="goBack">返回列表</el-button>
					</el-form-item>
				</el-form>
			</el-col>
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
  	  logoSrc: require('@/assets/img/equiment.png'),
  	  form: {
  	  	egname: '',
  	  	etype: '0',
  	  	status: '1',
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
      eid: 0
  	}
  },
  methods: {
  	submitForm () {
      if (this.editType === 1) {
        this.$refs.eform.validate(valid => {
          if (valid) {
            this.$store.dispatch('updateEquipmentGroup',this.form)
          }
        })
      } else {
        this.$refs.eform.validate(valid => {
          if (valid) {
            this.$store.dispatch('addEquipmentGroup',this.form)
          }
        })
      }
  	  
  	},
  	goBack () {
  	  this.$router.push({path:'group'})
  	}
  },
  created () {
  	if (this.$route.params.type) {
      this.editType = 1
  	} else {
      this.form = this.$store.state.key.groupD
      this.form.etype = valueToString(this.form.etype)
      this.form.status = valueToString(this.form.status)
    }
  },
  mounted () {

  }
}
</script>