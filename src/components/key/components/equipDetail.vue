<template>
	<div class="block bgwhite boxshadow">
      <template v-if="editType === 1">
        <template v-if="!areaEquipShow">
          <g-title>{{$t('key.addGroup')}}</g-title>
        </template>
        <template v-else>
          <g-title>{{$t('addAreaGroup')}}</g-title>
        </template>
      </template>
      <template v-else>
        <template v-if="!areaEquipShow">
          <g-title>{{$t('key.updateGroup')}}</g-title>
        </template>
        <template v-else>
          <g-title>{{$t('updateAreaGroup')}}</g-title>
        </template>
      </template>      
      <el-row class="margintop20 paddinglr30">
  			<el-col :span="4">
  				<img :src="logoSrc" alt="">
  			</el-col>
  			<el-col :span="12">
  				<el-form ref="eform" :rules="rules" :model="form" label-width="120px">
            <template v-if="!areaEquipShow">
              <el-form-item :label="$t('key.groupName')" prop="egname">
                <el-input v-model="form.egname"></el-input>
              </el-form-item>
              <el-form-item :label="$t('key.groupRule')">
                <el-radio-group v-model="form.status">
                    <el-radio label='1'>{{$t('status.on')}}</el-radio>
                    <el-radio label='2'>{{$t('status.off')}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('key.groupAuth')">
                <el-radio-group v-model="form.etype">
                    <el-radio label="1">{{$t('people.emp')}}</el-radio>
                    <el-radio label="2">{{$t('people.visit')}}</el-radio>
                    <el-radio label="0">{{$t('people.emp')}}{{$t('people.and')}}{{$t('people.visit')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item :label="$t('key.groupName')" prop="egname">
                <el-input v-model="form.egname"></el-input>
              </el-form-item>
              <el-form-item :label="$t('key.groupRule')">
                <el-radio-group v-model="form.status">
                    <el-radio label='1'>{{$t('status.on')}}</el-radio>
                    <el-radio label='2'>{{$t('status.off')}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('authorArea')">
                <el-radio-group v-model="form.etype">
                    <el-radio label='1'>{{$t('unengineRoom')}}</el-radio>
                    <el-radio label='2'>{{$t('engineRoom')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>  					
  					<el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.saveBtn')}}</el-button>
  					  <el-button @click="goBack">{{$t('btn.backListBtn')}}</el-button>
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
      areaEquipShow: process.env.areaEquipShow || false,
  	  form: {
  	  	egname: '',
  	  	etype: '0',
  	  	status: '1',
  	  	userid: getCache('userid')
  	  },
      rules: {
      	egname: [
          { required: true, message: this.$t('exporttype.isNull'), trigger: 'blur' }
        ]
      },
      editType: 0,
      eid: 0
  	}
  },
  methods: {
  	submitForm () {
      if (parseInt(this.editType) !== 1) {
        this.$refs.eform.validate(valid => {
          if (valid) {
            this.$store.dispatch('updateEquipmentGroup',this.form).then(res => {
              let {status} = res
              if (status === 0) {
                this.$router.back(-1)
                this.$store.commit('remove_group')
              }
            })
          }
        })
      } else {
        this.$refs.eform.validate(valid => {
          if (valid) {
            this.$store.dispatch('addEquipmentGroup',this.form).then(res => {
              let {status} = res
              if (status === 0) {
                this.$router.back(-1)
              }
            })
          }
        })
      }  	  
  	},
  	goBack () {
  	  this.$router.push({name:'group'})
      this.$store.commit('remove_group')
  	}
  },
  created () {
    if (this.areaEquipShow) {
      this.form.etype = '1'
    }
  	if (this.$route.params.egid) {
      this.$store.commit('get_group',this.$route.params.egid)
      this.form = this.$store.state.key.groupD
      this.form.etype = valueToString(this.form.etype)
      this.form.status = valueToString(this.form.status)      
  	} else {
      this.editType = 1
    }
  }
}
</script>