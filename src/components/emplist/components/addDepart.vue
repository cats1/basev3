<template>
	<div class="btnsection">
    <el-button @click="dialogVisible = true"><i class="fa fa-plus"></i>{{$t('btn.addDepartBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addDepartBtn')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="departform" :rules="rules" ref="departform" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('depart.departName')" prop="deptName">
			    <el-input v-model="departform.deptName"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('depart.prevDepartName')" >
          <div class="last_inner" @click="setDepShow">
            <span>{{parentObj.name}}</span>
          </div>
			  </el-form-item>
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
  	return {
  	  dialogVisible: false,
      innerVisible: false,
  	  departform: {
  	  	deptName: '',
  	  	parentId: '',
        deptManagerEmpid: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	deptName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      parentObj: this.parent,
      departArray: [],
      menuList: [],
      cobj: []
  	}
  },
  watch: {
    parent (val) {
      console.log(val)
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
  mounted () {
    console.log(this.parent)
  },
  methods: {
    setdepart (val) {
      if (val.length > 0) {
        this.parentObj = val[0]
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('depart.selectPrevDepart')
        })
      }
    },
    setDepShow () {
      this.innerVisible = true
    },
    saveProject () {
        this.$refs['departform'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('addDepartment',this.departform).then(res => {
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
            this.$store.dispatch('addDepartment',this.departform).then(res => {
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
    }
  }
}
</script>