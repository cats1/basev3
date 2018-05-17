<template>
	<div class="btnsection">
	  <el-button @click="doMove" :type="bType"><i class="fa fa-unsorted"></i>{{$t('btn.moveProjectBtn')}}</el-button>
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
  props: {
    btnType: {
      type: Number,
      default: 3
    },
    proList: {
      type: Array,
      default: []
    },
    cardarray: {
      type: Array,
      default: []
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
  	  proform: {
  	  	pName: '',
  	  	remark: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	pName: [
  	  	  { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }]
  	  },
      leftList: this.proList,
      cList: [],
      empArray: this.cardarray
  	}
  },
  watch: {
    btnType (val) {
      if (val === 3) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    },
    cardarray (val) {
      this.empArray = val
    },
    proList(val) {
      this.leftList = val
    }
  },
  mounted () {
    if (this.btnType === 3) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    getSelect (val) {
      this.cList = val
      this.empArray[0].pid = val[0].pid
      this.empArray[0].pName = val[0].pName
    },
    init () {
      console.log(this.empArray.length)
      if (this.empArray.length > 1) {
        this.$message({
          message: this.$t('moreOneVisit'),
          type: 'warning'
        })
      } else if (this.empArray.length === 0) {
        this.$message({
          message: this.$t('selectVisit'),
          type: 'warning'
        })
      } else {
        this.$emit('movebtn',3)
        this.dialogVisible = true
      }
    },
    doMove () {
      this.init()
    },
    saveProject () {
      this.$store.dispatch('updateResidentVisitor',this.empArray[0]).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('movekit')
        }
      })
    }
  }
}
</script>