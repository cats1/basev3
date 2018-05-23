<template>
	<div class="boxshadow bgwhite">
    <h2 class="set-title borderbom">{{$t('account.stage.title')}}</h2>
    <el-row class="paddingtb20 paddinglr30">
      <el-col :span="12">
        <el-form :model="form" label-width="100px" :rules="rules" ref="baseform">
          <el-form-item label="">
            <p>{{$t('account.stage.tip')}}</p>
          </el-form-item>
          <el-form-item :label="$t('form.stageaccount.text')" prop="account">
            <el-input type="text" v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password.text1')" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.name.text')" prop="sname">
            <el-input type="text" v-model="form.sname"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="saveBase">{{$t('btn.saveBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="paddingtb20 paddinglr30">
      <el-table :data="list" border >
        <el-table-column prop="account" :label="$t('account.stage.title')">
          <template slot-scope="scope">
            {{scope.row.account}}
          </template>
        </el-table-column>
        <el-table-column prop="password" :label="$t('form.password.text1')">
          <template slot-scope="scope">
            <template v-if="checkArray[scope.$index] === true">
              <el-input type="password" v-model="scope.row.password" :disabled="false"></el-input>
            </template>
            <template v-else>
              <el-input type="password" v-model="scope.row.password" :disabled="true"></el-input>
            </template>
            
          </template>
        </el-table-column>
        <el-table-column prop="sname" :label="$t('form.name.text')">
          <template slot-scope="scope">
            {{scope.row.sname}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('btn.edit1')">
          <template slot-scope="scope">
            <template v-if="checkArray[scope.$index] === true">
              <el-button type="text" size="small" @click="saveManager(scope.row,scope.$index)">{{$t('btn.saveBtn')}}</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="small" @click="changeCheck(scope.$index,scope.row)">{{$t('btn.updateBtn')}}</el-button>
            </template>
            <el-button type="text" size="small" @click="DeleteManager">{{$t('btn.deleteBtn')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {
      form: {
        userId: getCache('userid'),
        account: '',
        password: '',
        sname: ''
      },
      renewpwd:'',
      list: [],
      rules: {
        account: [
          { required: true, message: this.$t('formCheck.validAccont.tip1'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('formCheck.validPassword.tip4'), trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('validPassword.tip2'), trigger: 'blur' }
        ],
        sname: [
          { required: true, message: this.$t('formCheck.validName.tip3'), trigger: 'blur' },
        ]},
      checkArray: []
    }
  },
  methods: {
    saveBase () {
      this.AddManager()
    },
    AddManager () {
      this.$refs['baseform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('AddManager',this.form).then(res => {
              let {status} = res
              if (status === 0) {
                this.$refs.baseform.resetFields()
                this.$refs.baseform.clearValidate()
                this.GetManagerByUser()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    GetManagerByUser () {
      let nform = {
        userId: getCache('userid')
      }
      this.$store.dispatch('GetManagerByUser',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.list = result
          let checkArray = []
          this.list.forEach(function(element, index) {
            checkArray.push(false)
          })
          this.checkArray = checkArray
        }
      })
    },
    DeleteManager (row) {
      let nform = {
        account: row.account
      }
      this.$store.dispatch('DeleteManager',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.GetManagerByUser()
        }
      })
    },
    changeCheck (index,row) {
      this.$set(this.checkArray,index,true)
    },
    saveManager (row,index) {
      let nform = {
        account: row.account,
        password: row.password
      }
      this.$store.dispatch('UpdateManager',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.GetManagerByUser()
        }
      })
    }
  },
  created () {
    this.GetManagerByUser()
  }
}
</script>