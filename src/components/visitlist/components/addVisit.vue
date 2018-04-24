<template>
	<div class="btnsection">
	  <el-button @click="dialogVisible = true"><i class="fa fa-user-plus"></i>{{$t('btn.addVisitorBtn')}}</el-button>
	  <el-dialog
		  title="新增访客"
		  :visible.sync="dialogVisible"
		  width="60%" >
		  <el-form :model="proform" :rules="rules" ref="proform" label-width="100px" class="demo-ruleForm">
			  <el-form-item >
			    <upload-user-photo :photourl="proform.avatar" @sendkit="getUserPhoto"></upload-user-photo>
			  </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="proform.name"></el-input>
        </el-form-item>
			  <el-form-item label="性别" prop="sex">
          <el-select v-model="proform.sex" placeholder="请选择">
            <el-option
              v-for="item in $t('sex')"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
			  </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="proform.age"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="proform.company"></el-input>
        </el-form-item>
        <el-form-item label="项目选择" prop="pName">
          <el-select v-model="proform.pName" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.pName"
              :label="item.pName"
              :value="item.pName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="proform.leader"></el-input>
        </el-form-item>
        <el-form-item label="负责人手机" prop="phone">
          <el-input v-model="proform.phone"></el-input>
        </el-form-item>
        <el-form-item label="工作区域" prop="area">
          <el-input v-model="proform.area"></el-input>
        </el-form-item>
        <el-form-item label="工作内容" prop="job">
          <el-input v-model="proform.job"></el-input>
        </el-form-item>
        <el-form-item label="业务部门" prop="department">
          <el-input v-model="proform.department"></el-input>
        </el-form-item>
        <el-form-item label="服务期限" prop="startDate">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间" @change="setrange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="proform.remark"></el-input>
        </el-form-item>
      </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveVisit">确 定</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {uploadUserPhoto} from '@/components/upload'
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
export default {
  components: {uploadUserPhoto},
  props: ['pid'],
  data () {
  	return {
  	  dialogVisible: false,
  	  proform: {
  	  	pName: '',
  	  	remark: '',
        avatar: '',
        company: '',
        name: '',
        age: '',
        sex: '',
        leader: '',
        phone: '',
        area: '',
        startDate: '',
        endDate: '',
        job: '',
        department: '',
        rid: this.pid,
  	  	userid: getCache('userid')
  	  },
      dateRange: [],
  	  rules: {
  	  	name: [
  	  	  { required: true, message: '项目名称不能为空', trigger: 'blur' }],
        company: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }],
        leader: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }],
        phone: [
          { required: true, message: '负责人手机不能为空', trigger: 'blur' }],
        startDate: [
          { required: true, message: '日期不能为空', trigger: 'blur' }]
  	  },
      list: []
  	}
  },
  created () {
    this.getProjectList()
  },
  methods: {
    getUserPhoto (url) {
      this.proform.avatar = url
    },
    setrange (val) {
      this.proform.startDate = formatDate(new Date(val[0]),'yyyy-MM-dd')
      this.proform.endDate = formatDate(new Date(val[1]),'yyyy-MM-dd')
    },
    saveVisit () {
        this.$refs['proform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addResidentVisitor',this.proform).then(res => {
		   	  	let {status} = res
		   	  	if (status === 0) {
		          this.dialogVisible = false
              this.$emit('sendav',this.pid)
		   	  	}
		   	})
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    getProjectList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getProject',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.list = result
        }
      })
    }
  }
}
</script>