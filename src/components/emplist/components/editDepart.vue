<template>
	<div class="btnsection">
    <el-button @click="doEdit"><i class="fa fa-edit"></i>{{$t('btn.editDepart')}}</el-button>
	  <el-dialog
		  :title="$t('btn.editDepart')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <el-form :model="departform" :rules="rules" ref="departform" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="$t('depart.departName')" prop="deptName">
			    <el-input v-model="departform.deptName"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('depart.prevDepartName')" >
          <div class="last_inner" @click="setDepShow">
            <template v-for="item in parentNodeObj">
              <span>{{item.name}}</span>
            </template>
          </div>
			  </el-form-item>
        <el-form-item :label="$t('depart.manager')">
          <div class="last_inner" @click="setManerShow">
            <template v-for="item in mlist">
              <span>{{item.empName}}</span>
            </template>
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
      <el-dialog
      width="50%"
      :title="$t('depart.smember')"
      :visible.sync="innerVisible1"
      append-to-body>
        <emp-menu :left-data="empList" :right-data="managerObj" @menukit="setemp"></emp-menu>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible1 = false">{{$t('btn.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveSelectManer">{{$t('btn.confirmBtn')}}</el-button>
        </span>
      </el-dialog>
		  <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProject">{{$t('btn.saveBtn')}}</el-button>
        <el-button type="redline" @click="deleteProject">{{$t('btn.deleteBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import departMenu from '@/components/menu/departMenu'
import empMenu from '@/components/menu/empMenu'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  props: ['parentNode','parent','empList','dlist'],
  components: { departMenu,empMenu },
  data () {
  	return {
  	  dialogVisible: false,
      innerVisible: false,
      innerVisible1: false,
  	  departform: {
  	  	deptName: this.parent.name,
  	  	parentId: '',
        deptid: this.parent.pid,
        deptManagerEmpid: this.parent.dp,
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	deptName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      parentObj: this.parent,
      mlist: [],
      departArray: [],
      menuList: [],
      cobj: [],
      parentNodeObj: [],
      managerObj: [],
      btnType: 3
  	}
  },
  computed: {
    dp: {
      get () {
        if (this.parent.dp) {
          return stringToArray(this.parent.dp)
        } else {
          return []
        }
      },
      set () {}
    }
  },
  watch: {
    parentNode (val) {
      console.log(val)
      let parray = []
      parray.push(val)
      this.parentNodeObj = parray
      let carray = []
      carray.push(val)
      this.cobj = carray
      if (val.dp === 'root') {
        this.departform.parentId = ''
      } else {
        this.departform.parentId = val.dp
      }
    },
    parent (val) {
      console.log(val)
      this.parentObj = val
      this.departform.deptid = val.pid      
      this.departform.deptName = val.name
    },
    empList (val) {
      console.log(val)
      let earray = []
      let _self = this
      val.forEach(function(element, index) {
        _self.dp.forEach(function(delement, dindex) {
          if (delement === element.empid) {
            earray.push(element)
          }
        })
      })
      this.managerObj = earray
      console.log(this.managerObj)
    }
  },
  mounted () {
    console.log(this.parent)
    this.setMlist()
  },
  methods: {
    saveSelect () {
      this.departArray = this.menuList
      let arr = []
      this.departArray.forEach(function(element, index) {
        arr.push(element.pid)
      })
      this.innerVisible = false
    },
    saveSelectManer (val) {
      this.mlist = this.managerObj
      this.innerVisible1 = false
    },
    setdepart (val) {
      console.log(val)
      this.parentNodeObj = val
    },
    setemp (val) {
      console.log(val)

      this.managerObj = val
    },
    setDepShow () {
      this.innerVisible = true
    },
    setManerShow () {
      if (this.empList.length > 0) {
        this.innerVisible1 = true
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('depart.noemp')
        })
      }
      
    },
    setMlist () {
      let marray = []
      console.log(this.dp)
      let _self = this
      this.empList.forEach(function(element, index) {
        _self.dp.forEach(function(delement, dindex) {
          if (delement === element.pid) {
            marray.push(element)
          }
        })
      })
      this.mlist = marray
    },
    doEdit () {
      if (this.parent.dp === 'root') {
        this.$message({
          message: this.$t('depart.tip'),
          type: 'error'
        })
      } else {
        this.$emit('clickit',this.btnType)
        this.dialogVisible = true
      }
    },
    saveProject () {
        this.$refs['departform'].validate((valid) => {
          if (valid) {
            this.departform.parentId = this.parentNodeObj[0].pid
            //this.departform.deptManagerEmpid = this.parentNodeObj[0].pid
            let eids = []
            this.mlist.forEach(function(element, index) {
              eids.push(element.empid)
            })
            this.departform.deptManagerEmpid = arrayToString(eids)
            this.$store.dispatch('updateDepartment',this.departform).then(res => {
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
    deleteProject () {
      this.$confirm(this.$t('deleteTip.desc'), this.$t('deleteTip.title'), {
          confirmButtonText: this.$t('btn.confirmBtn'),
          cancelButtonText: this.$t('btn.cancelBtn'),
          type: 'warning'
      }).then(() => {
        let nform = {
          deptid: this.departform.deptid,
          userid: getCache('userid')
        }
        this.$store.dispatch('delDepartment',nform).then(res => {
            let {status} = res
            if (status === 0) {
              this.$message({
                type: 'success',
                message: this.$t('deleteTip.success')
              })
              this.dialogVisible = false
              this.$refs['departform'].resetFields()
              this.$emit('addkit')
            }
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('deleteTip.cancelD')
          })       
      })
    }
  }
}
</script>