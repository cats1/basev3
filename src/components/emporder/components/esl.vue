<template>
	<div class="lft-box-wrap">
		<table class="esltable" cellpadding="0" cellspacing="0">
			<colgroup>
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
	      <col width="10%" />
      </colgroup>
			<tr>
				<td colspan="2">入库申请</td>
				<td >依赖部门</td>
				<td ><el-input class="noedit" v-model="eslForm.deptName"></el-input></td>
				<td>部门联络人</td>
				<td ><el-input class="noedit" v-model="eslForm.empName"></el-input></td>
				<td colspan="2">联络电话</td>
				<td colspan="2"><el-input class="noedit" v-model="eslForm.empPhone"></el-input></td>
			</tr>
			<tr>
				<td colspan="2">入库时间</td>
				<td >进入总务仓库楼层</td>
				<td ><el-input v-model="eslForm.floor" @change="getFloor"></el-input></td>
				<td>进入仓库人数</td>
				<td><el-input class="noedit" v-model="eslForm.pCount"></el-input></td>
				<td colspan="2">预约进入仓库日期</td>
				<td colspan="2">
					<el-date-picker
				    v-model="appEntryDate"
				    type="datetime" :picker-options="options" :default-time="['14:00:00', '18:00:00']"
				    placeholder="选择日期时间" @change="getAppEntryDate">
				  </el-date-picker>
				</td>
			</tr>
      <template v-for="(item,index) in infoList">
        <template v-if="index == 0">
          <tr>
            <td :rowspan="inforowspan" colspan="2">
              入库人员信息<el-button type="success" icon="el-icon-plus" circle size="mini" @click="addInfoList"></el-button>
            </td>
            <template v-for="(citem,cindex) in item">
              <td >姓名</td>
              <td >
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="citem.name" @change="getInfoList(index,cindex)">
                </el-input>
              </td>
            </template>
          </tr>
          <tr>
            <template v-for="(citem,cindex) in item">
              <td >工号</td>
              <td >
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="citem.empNo" @change="getInfoList(index,cindex)">
                </el-input>
              </td>
            </template>
          </tr>
        </template>
        <template v-else>
            <tr >
              <template v-for="(citem,cindex) in item">
                <td >姓名</td>
                <td ><el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="citem.name" @change="getInfoList(index,cindex)">
                </el-input></td>
              </template>
            </tr>
            <tr >
              <template v-for="(citem,cindex) in item">
                <td >工号</td>
                <td ><el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="citem.empNo" @change="getInfoList(index,cindex)">
                </el-input></td>
              </template>
            </tr>
        </template>
      </template>
      <tr>
        <td colspan="2">一般文书业务类别</td>
        <td colspan="8">
          <el-radio-group v-model="eslForm.opType" @change="getopType">
            <el-radio label="入库">入库</el-radio>
            <el-radio label="出库">出库</el-radio>
            <el-radio label="查看">查看</el-radio>
            <el-radio label="废弃">废弃</el-radio>
          </el-radio-group>
        </td>
      </tr>
			<tr v-show="dataInfoShow">
				<td :rowspan="dataInfoRowspan" colspan="2">
          一般文书资料信息(入库、废弃等)<el-button type="success" icon="el-icon-plus" circle size="mini" @click="addDataInfoList"></el-button>
        </td>
				<td>序号</td>
				<td colspan="2">文件名</td>
				<td colspan="2">箱号</td>
				<td colspan="2">数量</td>
				<td >担当</td>
			</tr>
			<template v-for="(item,index) in dataInfoList">
				<tr v-show="dataInfoShow">
					<td>{{index+1}}</td>
					<td colspan="2">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="item.filename" @change="getFilename(index)">
            </el-input>
					</td>
					<td colspan="2">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="item.boxNumber" @change="getFilename(index)">
            </el-input>
					</td>
					<td colspan="2">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="item.number" @change="getFilename(index)">
            </el-input>
					</td>
					<td >
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="item.abay" @change="getFilename(index)">
            </el-input>
					</td>
				</tr>
			</template>
			<tr v-show="dataOutShow">
				<td rowspan="4" colspan="2">一般文书资料信息（查看、出库）</td>
        <td>查看文书名称</td>
        <template v-for="(item,index) in checkList">
          <template v-if="index != 3">
            <td colspan="2">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="checkList[index]" @change="getCheckList">
              </el-input>
            </td>
          </template>
          <template v-else>
            <td>
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="checkList[index]" @change="getCheckList">
              </el-input>
            </td>
          </template>
        </template>
			</tr>
			<tr v-show="dataOutShow">
				<td rowspan="3" >查看出库文书名称</td>
				<td colspan="2"><el-input v-model="checkOutList[0]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[1]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[2]" @change="getCheckOutList"></el-input></td>
        <td ><el-input v-model="checkOutList[3]" @change="getCheckOutList"></el-input></td>
			</tr>
			<tr v-show="dataOutShow">
				<td colspan="2"><el-input v-model="checkOutList[4]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[5]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[6]" @change="getCheckOutList"></el-input></td>
        <td colspan="3"><el-input v-model="checkOutList[7]" @change="getCheckOutList"></el-input></td>
			</tr>
			<tr v-show="dataOutShow">
				<td colspan="2"><el-input v-model="checkOutList[8]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[9]" @change="getCheckOutList"></el-input></td>
        <td colspan="2"><el-input v-model="checkOutList[10]" @change="getCheckOutList"></el-input></td>
        <td colspan="3"><el-input v-model="checkOutList[11]" @change="getCheckOutList"></el-input></td>
			</tr>
		</table>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import { formatDate } from '@/utils/index'
export default {
  props: {
    clearForm: {
      type: Boolean,
      default: false
    },
    vDate: null,
    eslShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
  	return {
  	  emplist: [],
  	  appEntryDate: '',
  	  options: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
  	  checkList: ['','','',''],
  	  checkOutList: ['','','','','','','','','','','',''],
      dataInfoRowspan: 11,
  	  dataInfoList: [{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  },{
  	  	filename: '',
  	  	boxNumber: '',
  	  	number: '',
  	  	abay: ''
  	  }],
      infoList: [
        [{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        }],
        [{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        }]
      ],
  	  deptList: [],
  	  dataList: [],
  	  eslForm: {
  	  	empid:getCache('empid'),
    		empName:getCache('empName'),
    		empPhone:getCache('empPhone'),
    		deptid:'',
    		deptName:'',
    		floor:'',
    		pCount:0,
    		appEntryDate:'',
    		personInfo:'',
    		opType:'',
    		dataInfo:'',
    		checkName:'',
    		checkOutputName:''
  	  },
      dataInfoShow: false,
      dataOutShow: false
  	}
  },
  computed: {
    inforowspan: {
      get () {
        return this.infoList.length * 2
      },
      set () {}
    }
  },
  watch: {
    clearForm (val) {
      if(val){
        this.init()
      }
    },
    eslShow (val) {
      if (val) {
        this.init()
        this.getDeptList()
      }
    }
  },
  mounted () {
  	this.$nextTick(()=> {
  		this.getDeptList()
  	})
  },
  methods: {
    init () {
      this.dataInfoRowspan = 11
      this.eslForm = {
        empid:getCache('empid'),
        empName:getCache('empName'),
        empPhone:getCache('empPhone'),
        deptid:'',
        deptName:'',
        floor:'',
        pCount:0,
        appEntryDate:'',
        personInfo:'',
        opType:'',
        dataInfo:'',
        checkName:'',
        checkOutputName:''
      }
      this.infoList = [
        [{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        }],
        [{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        }]
      ]
      this.dataInfoList = [{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      },{
        filename: '',
        boxNumber: '',
        number: '',
        abay: ''
      }]
      this.checkOutList = ['','','','','','','','','','','','']
      this.checkList = ['','','','']
    },
  	getDeptList () {
      let nform = {
        empid: getCache('empid'),
        userid: getCache('userid')
      }
      this.$store.dispatch('getDeptByEmpid',nform).then(res => {
        let {status,result} = res
        if (status == 0) {
          this.deptList = result
          if (result.length == 1) {
          	this.eslForm.deptName = result[0].deptName
          	this.eslForm.deptid = result[0].deptid
          }
        }
      })
    },
    getAppEntryDate (val) {
      this.eslForm.appEntryDate = new Date(val)
      this.$emit('eslform',this.eslForm)
    },
    getFloor (val) {
      this.$emit('eslform',this.eslForm)
    },
    getInfoList (index,cindex) {
      let _self = this
      let infoArray = []
      let personInfoString = ''
      this.infoList.forEach(function(element, index) {
        element.forEach(function(cele, celeindex) {
          if (cele.name != '' && cele.empNo != '') {
            infoArray.push(element)
            if (personInfoString == '') {
              personInfoString += 'name=' + cele.name + ',empNo=' + cele.empNo
            } else {
              personInfoString += '|name=' + cele.name + ',empNo=' + cele.empNo
            }
          }
        })
      })
      this.inforowspan = this.infoList.length * 2
      this.eslForm.personInfo = personInfoString
      this.eslForm.pCount = infoArray.length
      this.$emit('eslform',this.eslForm)
    },
    getFilename (index) {
      let _self = this
      let infoArray = []
      let personInfoString = ''
      this.dataInfoList.forEach(function(element, index) {
      	if (element.filename != '' && element.boxNumber != ''&& element.number != ''&& element.abay != '') {
          infoArray.push(element)
          if (personInfoString == '') {
          	personInfoString += 'filename=' + element.filename + ',boxNumber=' + element.boxNumber + ',number=' + element.number + ',abay=' + element.abay 
          } else {
          	personInfoString += '|filename=' + element.filename + ',boxNumber=' + element.boxNumber + ',number=' + element.number + ',abay=' + element.abay
          }
      	}
      })
      this.eslForm.dataInfo = personInfoString
      this.$emit('eslform',this.eslForm)
    },
    addInfoList () {
        let obj = [{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        },{
          name: '',
          empNo: ''
        }]
      this.infoList.push(obj)
    },
    addDataInfoList () {
      if (this.dataInfoList.length >= 20) {
        this.$message({
          showClose: true,
          message: '最多20条',
          type: 'warning'
        })
        return false
      } else {
        let obj = {
          filename: '',
          boxNumber: '',
          number: '',
          abay: ''
        }
        this.dataInfoList.push(obj)
        this.dataInfoRowspan = this.dataInfoList.length + 1
      }
    },
    getopType (val) {
      if (val == '入库'||val == '废弃') {
        this.dataInfoShow = true
        this.dataOutShow = false
      } else if (val == '出库'||val == '查看') {
        this.dataInfoShow = false
        this.dataOutShow = true
      }
      this.$emit('eslform',this.eslForm)
    },
    getCheckList (val) {
      let _self = this
      let infoArray = []
      this.checkList.forEach(function(element, index) {
      	if (element != '') {
          infoArray.push(element)
      	}
      })
      this.eslForm.checkName = infoArray.join(',')
      this.$emit('eslform',this.eslForm)
    },
    getCheckOutList (val) {
      let _self = this
      let infoArray = []
      this.checkOutList.forEach(function(element, index) {
      	if (element != '') {
          infoArray.push(element)
      	}
      })
      this.eslForm.checkOutputName = infoArray.join(',')
      this.$emit('eslform',this.eslForm)
    }
  }
}
</script>