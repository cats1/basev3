<template>
	<div class="btnsection">
    <el-button @click="doShow"><i class="fa fa-user-plus"></i>{{$t('btn.addMember')}}</el-button>
	  <el-dialog
		  :title="$t('btn.addMember')"
		  :visible.sync="dialogVisible"
		  width="50%" @close="handleClose">
      <vemp-menu :search-flag="dialogVisible" :left-data="list" :right-data="vemp" @menukit="getSEmp"></vemp-menu>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		    <el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
		  </span>
	  </el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {formatDate} from '@/utils/index'
import vempMenu from '@/components/menu/vempMenu'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  props: ['parent','dlist','vemp'],
  components: {vempMenu},
  data () {
  	return {
  	  dialogVisible: false,
  	  form: {
        rid: '',
        empids: []
  	  },
      list: []
  	}
  },
  watch: {
    parent (val) {
      this.form.rid = val.pid
    }
  },
  mounted () {},
  methods: {
    stringToArray: stringToArray,
    doShow () {
      if(!this.parent.type || this.parent.type === 0) {
        this.$message({
          showClose: true,
          message: this.$t('role.tip2'),
          type: 'error'
        })
      } else {
        this.getEmpList()
      }
    },
    getSEmp (val) {
      let varray = []
      val.forEach(function(element, index) {
        varray.push(element.empid)
      })
      this.form.empids = varray
    },
    getEmpList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.list = result
          this.dialogVisible = true
        }
      })
    },
    saveProject () {
      this.$store.dispatch('addEmpRole',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('addempkit')
        }
      })
    },
    handleClose () {
      this.$emit('closeempkit')
    }
  }
}
</script>