<template>
	<div>
	  <div class="boxshadow paddinglr30 paddingtb20 block bgwhite">
	  	<export-address-list :btn-type="btnType" @exportkit="changeBtnType"></export-address-list>
      <add-com-emp :btn-type="btnType" @addkit="changeBtnType"></add-com-emp>
      <dot-update :btn-type="btnType" :slist="sempArray" @addkit="changeUpdate" @cancelkit="changeCancel" @deletekit="changeDeleteEmp" @comkit="changeComEmp"></dot-update>
      <edit-special :btn-type="btnType" @addkit="changeBtnType" ></edit-special>
      <dot-send-card></dot-send-card>
	  </div>
	  <el-row :gutter="20">
	  	<el-col :span="6" >
	  		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
          <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" value-key="empName" @select="handleSelect" :placeholder="$t('sempholder')">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-autocomplete>
          <div class="comempwrap">
            <div class="comwraptitle">
              <div class="comwraplogo">
                <i class="fa fa-users fa-2x"></i>
                <p>{{$t('depart.allEmp')}}({{total}})</p>
              </div>
              <ul class="emplist">
                <li :class="{'active': showType === 0}" @click="selectType(0)"><i class="fa fa-sitemap"></i></li>
                <li :class="{'active': showType === 1}" @click="selectType(1)"><i class="fa fa-align-justify"></i></li>
              </ul>
            </div>
            <transition name="el-fade-in-linear">
              <template v-if="showType ===0">
                <com-show :slist="sempArray" :all-show="allShow" :update-show="updateShow" :is-show="showType === 0" @scheckkit="getCurList" @sempkit="getCurEmp" @removedkit="changeRemove" @sendlist="getAllEmp"></com-show>
              </template>
              <template v-else>
                <emp-show :slist="sempArray" :all-show="allShow" :update-show="updateShow" :is-show="showType ===1" @scheckkit="getCurList" @sempkit="getCurEmp" @removedkit="changeRemove" @sendlist="getAllEmp"></emp-show>
              </template>
            </transition>
          </div>
	  		</div>
	  	</el-col>
	  	<el-col :span="18" >     
        <template v-if="btnType === 1">
          <add-com-emp-show class="bgwhite" :edit-type="editType" :emp-obj="curEmp"></add-com-emp-show>
        </template>
        <template v-else-if="btnType === 3">
          <special class="bgwhite" :slist="sempArray" @onekit="doOneNext" @removekit="getCurList" @twokit="setTwoAccount" @donekit="specialDone"></special>
        </template>
        <template v-else>
          <export-address-book  @upab="getUploadAB"></export-address-book>
        </template>         
	  	</el-col>
	  </el-row>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {getCgBarList} from '@/utils/common'
import {addComEmp,addComEmpShow,dotUpdate,editSpecial,dotSendCard,empDetail,empShow,comShow,exportAddressBook,special} from './components'
import {exportAddressList,useExcel,useRtx,useDing,changeUploadType} from '@/components/upload'
import {stringToArray,arrayToString} from '@/utils/common'
import { formatDate } from '@/utils'
export default {
  components: {addComEmp,addComEmpShow,dotUpdate,editSpecial,empShow,comShow,exportAddressList,useExcel,useRtx,useDing,changeUploadType,dotSendCard,empDetail,exportAddressBook,special},
  data () {
  	return {
      showType:1,
      total:0,
      dialogVisible: false,
      btnType: 0,
      editType: 0,
      curEmp: {},
      allShow: false,
      sform: {
        name: '',
        userid: getCache('userid')
      },
      form: {
        userid: getCache('userid')
      },
      rightType: 3,
      sempArray: [],
      updateShow: false,
      empList: [],
      restaurants: [],
      state4: '',
      timeout:  null
  	}
  },
  watch: {
    $route (to, from){
      alert("改变")
    }
  },
  computed: {
  	vtype: {
  	  get: function () {
  	  	return this.$route.name
  	  },
  	  set: function () {}
  	}
  },
  filters:{
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  created () {    
    let subAccount = parseInt(getCache('subAccount')) || 0
  },
  methods: {
    changeComEmp () {
      this.sempArray = []
    },
    getUploadAB () {
      this.allShow = false
      this.btnType = 0
      this.showType = 1
    },
    specialDone () {
      console.log('done')
      this.sempArray = []
    },
    changeBtnType (type) {
      let varray = []
      //console.log(this.sempArray)
      this.sempArray = varray
      this.btnType = type
    },
    changeRemove () {
      this.updateShow = true
      this.allShow = false
    },
    changeCancel (type) {
      this.allShow = false
      this.btnType = 0
      this.showType = 1
    },
    changeDeleteEmp () {
      this.allShow = false
      this.btnType = 0
      this.showType = 1
    },
    setTwoAccount () {
      this.allShow = false
      //this.sempArray = []
    },
    selectType (type) {
      this.showType = type
    },
    changeUpdate (type) {
      this.allShow = true
      this.btnType = type
    },
    doOneNext (type) {
      this.allShow = true
    },
    getCurList (item,val) {
      if (val) {
        this.sempArray.push(item)
      } else {
        this.removeSitem(item)
      }
    },
    removeSitem (item) {
      let _self = this
      let cArray = []
      this.sempArray.forEach(function(ele,index){
        if (item.empid !== ele.empid) {
          cArray.push(ele)
        }
      })
      this.sempArray = cArray
    },
    getCurEmp (pitem) {
      this.btnType = 1
      this.editType = 1
      this.curEmp = pitem
    },
    getAllEmp (result) {
      this.restaurants = result
      this.empList = result
      this.total = result.length
    },
    editEmp (row, event, column) {
      this.curEmp = row
      this.dialogVisible = true
    },
    searchEmp (val) {
      if (val !== '') {
        let sform = {
          name: val,
          userid: getCache('userid')
        }
        this.$store.dispatch('getEmpByName',sform).then(res => {
          let {status,result} = res
          if (status === 0) {
            //console.log(result)
          }
        })
      }
    },
    getChangetype (type) {
      this.rightType = type
    },
    getAddkit () {
      this.getProjectList()
      this.getEmpList()
    },
    getDelete () {
      this.getProjectList()
      this.getEmpList()
    },
    getmove () {
      this.getProjectList()
      this.getEmpList()
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
          cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.empName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect(item) {
      this.btnType = 1
      this.editType = 1
      this.curEmp = item
    }
  }
}
</script>