<template>
	<div class="btnsection">
    <el-button @click="editBtn()"><i class="fa fa-plus"></i>{{$t('btn.addDepartBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addDepartBtn')"
		  :visible.sync="dialogVisible"
		  width="30%" @close="handleClose">
		  <el-form :model="departform" :rules="rules" ref="departform" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('depart.departName')" prop="deptName">
			    <el-input v-model="departform.deptName"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('depart.prevDepartName')" >
          <template v-if="deptNoShow">
            <div class="last_inner noedit" @click="setDepShow" >
              <span>{{parentObj.name}}</span>
            </div>
          </template>
          <template v-else>
            <div class="last_inner" @click="setDepShow" >
              <span>{{parentObj.name}}</span>
            </div>
          </template>
			  </el-form-item>
        <template v-if="deptNoShow">
          <el-form-item :label="$t('departNo')" prop="deptNo" >
            <el-input maxlength="2" v-model="departform.deptNo"></el-input>
          </el-form-item>
          <el-form-item :label="$t('visitCount')" prop="vMaxCount" >
            <el-input v-model.number="departform.vMaxCount"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <el-dialog
      width="50%"
      :title="$t('depart.selectDepart')"
      :visible.sync="innerVisible"
      append-to-body>
        <depart-menu :left-data="dlist" :right-data="cobj" :check-value="false" :check-num="1" @menukit="setdepart"></depart-menu>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
          <el-button @click="innerVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        </span>
      </el-dialog>
		  <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
        <el-button type="primary" @click="saveAndProject">{{$t('btn.saveAndBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>  
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import departMenu from '@/components/menu/departMenu'
export default {
  props: ['parent','dlist'],
  components: { departMenu },
  data () {
    var checkCount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (parseInt(value) > 50) {
              callback(new Error('最多50人'));
            } else {
              callback();
            }
          }
        }, 1000);
    };
  	return {
  	  dialogVisible: false,
      innerVisible: false,
  	  departform: {
  	  	deptName: '',
        deptNo: '',
  	  	parentId: '',
        deptManagerEmpid: '',
        vMaxCount: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	deptName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip6'), trigger: 'blur' }
        ],
        deptNo: [
          { required: true, message: this.$t('formCheck.validName.tip8')}
        ],
        vMaxCount: [
          { required: true, validator: checkCount }
        ]
  	  },
      parentObj: this.parent,
      departArray: [],
      menuList: [],
      cobj: [],
      btnType: 0,
      deptNoShow: process.env.deptNoShow || false
  	}
  },
  watch: {
    parent (val) {
      this.parentObj = val
      let varray = []
      varray.push(val)
      this.cobj = varray
      this.departform.parentId = val.pid
      if (val.dp === 'root') {
        this.departform.parentId = ''
      }
    }
  },
  mounted () {},
  methods: {
    editBtn () {
      this.$emit('clickit',this.btnType)
      this.dialogVisible = true
    },
    setdepart (val) {
      if (val.length > 0) {
        this.parentObj = val[0]
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('depart.selectPrevDepart')
        })
      }
    },
    setDepShow () {
      this.$emit('clickit',0)
      this.innerVisible = true
    },
    saveProject () {
        this.$refs['departform'].validate((valid) => {
          if (valid) {
            let nform = {
              deptName: this.departform.deptName,
              parentId: this.departform.parentId,
              deptManagerEmpid: this.departform.deptManagerEmpid,
              userid: getCache('userid')
            }
            if (this.deptNoShow) {
              nform = {
                deptName: this.departform.deptName,
                deptNo: this.departform.deptNo,
                parentId: this.departform.parentId,
                deptManagerEmpid: this.departform.deptManagerEmpid,
                vMaxCount: this.departform.vMaxCount,
                userid: getCache('userid')
              }
            }
            this.$store.dispatch('addDepartment',nform).then(res => {
    		   	  	let {status} = res
    		   	  	if (status === 0) {
    		          this.dialogVisible = false
                  this.$refs['departform'].resetFields()
    		          this.$emit('addkit')
    		   	  	}
    		   	})
          } else {
            return false;
          }
        })
    },
    saveAndProject () {
        this.$refs['departform'].validate((valid) => {
          if (valid) {
            let nform = {
              deptName: this.departform.deptName,
              parentId: this.departform.parentId,
              deptManagerEmpid: this.departform.deptManagerEmpid,
              userid: getCache('userid')
            }
            if (this.deptNoShow) {
              nform = {
                deptName: this.departform.deptName,
                deptNo: this.departform.deptNo,
                parentId: this.departform.parentId,
                deptManagerEmpid: this.departform.deptManagerEmpid,
                vMaxCount: this.departform.vMaxCount,
                userid: getCache('userid')
              }
            }
            this.$store.dispatch('addDepartment',nform).then(res => {
                let {status} = res
                if (status === 0) {
                  this.$refs['departform'].resetFields()
                  this.$emit('addkit')
                }
            })
          } else {
            return false;
          }
        })
    },
    saveSelect () {
      this.departArray = this.menuList
      let arr = []
      this.departArray.forEach(function(element, index) {
        arr.push(element.pid)
      })
      this.innerVisible = false
    },
    handleClose () {
      this.$refs['departform'].resetFields()
    }
  }
}
</script>