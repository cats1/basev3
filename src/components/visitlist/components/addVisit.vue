<template>
	<div class="btnsection">
	  <el-button :type="bType" @click="doAddVisit"><i class="fa fa-user-plus"></i>{{$t('btn.addVisitorBtn')}}</el-button>
    <visit-edit :edit-type="etype" :cur-emp="curEmp" :is-show="dialogVisible" :pro-list="proList" @sendav="getEdit"></visit-edit>
	</div>
</template>
<script>
import visitEdit from './visitEdit'
import {getCache} from '@/utils/auth'
export default {
  components: {visitEdit},
  props: {
    btnType: {
      type: Number,
      default: 1
    },
    proList: {
      type: Array,
      default: []
    },
    editType: {
      type: Number,
      default: 0
    },
    curEmp: {
      type: Object,
      default: {}
    },
    pid: null
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
  	  proform: {
  	  	pName: '',
  	  	remark: '',
        avatar: '',
        company: '',
        name: '',
        age: '',
        sex: 0,
        leader: '',
        phone: '',
        area: '',
        startDate: '',
        endDate: '',
        job: '',
        department: '',
        rid: '',
  	  	userid: getCache('userid')
  	  },
      dateRange: [],
  	  rules: {
  	  	name: [
  	  	  { required: true, message: this.$t('pronameIsBlank'), trigger: 'blur' }],
        company: [
          { required: true, message: this.$t('comnameIsBlank'), trigger: 'blur' }],
        leader: [
          { required: true, message: this.$t('chargeIsBlank'), trigger: 'blur' }],
        phone: [
          { required: true, message: this.$t('chargePhoneIsBlank'), trigger: 'blur' }],
        startDate: [
          { required: true, message: this.$t('dateIsBlank'), trigger: 'blur' }]
  	  },
      list: this.proList,
      etype: this.editType
  	}
  },
  watch: {
    btnType (val) {
      if (val === 1) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    },
    proList(val) {
      this.list = val
    },
    pid (val) {
      this.proform.rid = val
    },
    editType (val) {
      this.etype = val
      if (val === 1) {
        this.doAddVisit()
      }
    },
    curEmp (val) {
      this.proform = val
      this.dateRange = [val.startDate,val.endDate]
    }
  },
  mounted () {
    if (this.btnType === 1) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    getEdit () {
      this.$emit('sendav',1)
      this.dialogVisible = false
    },
    doAddVisit () {
      this.$emit('addemp',1)
      this.dialogVisible = true
    },
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
            if (this.editType === 0) {
              this.addResidentVisitor()
            } else {
              this.updateResidentVisitor()
            }
          } else {
            return false;
          }
        })
    },
    addResidentVisitor () {
      this.$store.dispatch('addResidentVisitor',this.proform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',1)
          this.$refs.proform.resetFields()
        }
      })
    },
    updateResidentVisitor () {//updateResidentVisitor
      this.$store.dispatch('updateResidentVisitor',this.proform).then(res => {
        let {status} = res
        if (status === 0) {
          this.dialogVisible = false
          this.$emit('sendav',1)
          this.$refs.proform.resetFields()
        }
      })
    }
  }
}
</script>