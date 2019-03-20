<template>
  <div class="btnsection">
    <el-button @click="doMove"><i class="fa fa-unsorted"></i>{{$t('btn.moveDepart')}}</el-button>
    <el-dialog width="50%" :title="$t('depart.selectDepart')" :visible.sync="innerVisible" @close="handClose">
      <depart-menu :left-data="leftData" :right-data="cobj" :check-num="6" :check-value="true" @menukit="setdepart"></depart-menu>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        <el-button type="primary" @click="saveSelect">{{$t('btn.confirmBtn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import departMenu from '@/components/menu/departMenu'
export default {
  props: ['parent','semp','dlist'],
  components: { departMenu },
  data () {
    return {
      form: {
        deptIds: [],
        empids: [],
        userid: getCache('userid')
      },
      innerVisible: false,
      cobj: [],
      departArray: [],
      parentNodeObj: [],
      btnType: 4,
      leftData: this.dlist
    }
  },
  watch: {
    parent (val) {
      let carray = []
      carray.push(val)
      this.cobj = carray
      this.departArray = val
    },
    semp (val) {
      let arrays = []
      val.forEach(function(element, index) {
        arrays.push(element.empid)
      })
      this.form.empids = arrays
    },
    dlist (val) {
      this.leftData = val
      let carray = []
      carray.push(this.parent)
      this.cobj = carray
      this.departArray = this.parent
    }
  },
  methods: {
    handClose () {
      this.$emit('eclose')
    },
    doMove () {
      this.$emit('clickit',this.btnType)
      if (this.semp.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('selectEmpTip'),
          type: 'error'
        })
      } else {

        this.innerVisible = true
      }
    },
    saveSelect () {
      let arr = []
      this.cobj.forEach(function(element, index) {
        arr.push(element.pid)
      })
      this.form.deptIds = arr
      this.$store.dispatch('updateDeptEmpRelation',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.innerVisible = false
          this.$emit('movekit')
        }
      })
    },
    setdepart (val) {
      this.departArray = val
    },
  }
}
</script>