<template>
  <div class="btnsection">
  	<el-button @click="addEmp"><i class="fa fa-edit"></i>{{$t('btn.dotUpdateBtn')}}</el-button>
  	<transition name="el-zoom-in-bottom">
	  	<div ref="bomwins" class="bottomwins boxshadow" v-show="bomShow">
        <el-dropdown >
          <el-button type="primary">{{$t('as')}}</el-button>
          <el-dropdown-menu slot="dropdown" >
            <template v-for="ditem in comList">
              <el-dropdown-item ><span @click="handleClick(ditem)">{{ditem.companyName}}</span></el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
	  		<el-button type="danger" icon="el-icon-delete" @click="deleteEmp">{{$t('btn.deleteBtn')}}</el-button>
	  		<el-button @click="cancelEdit">{{$t('btn.cancelBtn')}}</el-button>
	  	</div>
    </transition>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
    btnType: {
      type: Number,
      default: 2
    },
    slist: {
      type: Array,
      default: []
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
      bomShow: false,
      sempArray: this.slist,
      comList:[]
  	}
  },
  watch: {
    btnType (val) {
      if (val === 2) {
        this.bType = 'primary'
      } else {
        this.bType = 'default'
      }
    },
    slist (val) {
      this.sempArray = val
    },
    $route (){
      alert("改变")
    }
  },
  mounted () {
    if (this.btnType === 2) {
      this.bType = 'primary'
    } else {
      this.bType = 'default'
    }
  },
  methods: {
    fetchDate () {
      console.log(888)
      return false
    },
    addEmp () {
      this.getSubAccountByUserid()
      document.body.appendChild(this.$refs.bomwins)
      this.bomShow = true
      this.$emit('addkit',2)
    },
    cancelEdit () {
      this.bomShow = false
      this.$emit('cancelkit',2)
    },
    deleteEmp () {
      let sarr = []
      this.sempArray.forEach(function(ele,index){
        sarr.push(ele.empid)
      })
      let nform = {
        userid: getCache('userid'),
        empids: sarr
      }
      this.$store.dispatch('batchDelEmployee',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.bomShow = false
          this.$emit('deletekit')
        }
      })
    },
    handleClick (val) {
      let sarr = []
      this.sempArray.forEach(function(ele,index){
        sarr.push(ele.empid)
      })
      let nform = {
        subaccountId: val.id,
        empids: sarr
      }
      this.$store.dispatch('updateEmpSubAccount',nform).then(res => {
        let {status} = res
        if (status === 0) {
          this.$emit('comkit')
        }
      })
    },
    getSubAccountByUserid () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getSubAccountByUserid',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          let comArray = [{
            id: 0,
            companyName: this.$t('defaultText')
          }]
          for (let i=0;i<result.length;i++) {
            let item = result[i]
            comArray.push(item)
          }
          this.comList = comArray
        }
      })
    },
  }
}
</script>