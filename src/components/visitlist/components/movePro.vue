<template>
	<div class="btnsection">
	  <el-button @click="doMove"><i class="fa fa-unsorted"></i>{{$t('btn.moveProjectBtn')}}</el-button>
	  <el-dialog
		  :title="$t('btn.moveProjectBtn')"
		  :visible.sync="dialogVisible"
		  width="50%" >
		  <lr-menu :lelist="leftList" :rilist="cList" @menukit="getSelect"></lr-menu>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import lrMenu from '@/components/menu/lrMenu'
export default {
  components: {lrMenu},
  props: ['cardarray'],
  data () {
  	return {
  	  dialogVisible: false,
  	  proform: {
  	  	pName: '',
  	  	remark: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	pName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      leftList: [],
      cList: [],
      empArray: this.cardarray
  	}
  },
  watch: {
    cardarray (val) {
      this.empArray = val
      console.log(val)
    } 
  },
  mounted () {
    this.init()
  },
  methods: {
    getSelect (val) {
      console.log(val)
      this.cList = val
      console.log(this.empArray)
      this.empArray[0].pid = val[0].pid
      this.empArray[0].pName = val[0].pName
    },
    init () {
      if (this.empArray.length > 1) {
        this.$message({
          message: '最多选择一名员工',
          type: 'warning'
        })
      } else {
        this.getProjectList()
      }
    },
    doMove () {
      if (this.empArray.length>0) {
        this.dialogVisible = true
      } else {
        this.$message({
          message: '请先选择访客',
          type: 'warning'
        })
      }
    },
    saveProject () {
      this.$store.dispatch('updateResidentVisitor',this.empArray[0]).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('movekit')
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
          this.leftList = result
        }
      })
    }
  }
}
</script>