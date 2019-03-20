<template>
	<div>
		<el-dialog
		  :visible.sync="dialogVisible"
		  width="1000px"
		  @close="handleClose">
		  <!--startprint-->
		  <div id="printcontent">
        <p style="font-size:32px;line-height:76px;color: rgb(51, 51, 51);text-align:center;">一般文书仓库依赖票</p>
		<table id="printtable" width="1000px" border="1" cellpadding="0" cellspacing="0" style="font-size:16px;color:#333;text-align:center;border-collapse: collapse;zoom:0.9;" align="center">
			<!-- <caption style="font-size:36px;line-height:76px;">一般文书仓库依赖票</caption> -->
      <caption style="font-size:18px;line-height:76px;text-align:left;">日期：{{form.submitDate}}</caption>
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
			<tr >
				<td colspan="2" style="height:36px;line-height:36px;">入库申请</td>
				<td style="height:36px;line-height:36px;">依赖部门</td>
				<td style="height:36px;line-height:36px;"><p>{{form.deptName}}</p></td>
				<td style="height:36px;line-height:36px;">部门联络人</td>
				<td style="height:36px;line-height:36px;"><p>{{form.empName}}</p></td>
				<td colspan="2" style="height:36px;line-height:36px;">联络电话</td>
				<td colspan="2" style="height:36px;line-height:36px;"><p>{{form.empPhone}}</p></td>
			</tr>
			<tr>
				<td colspan="2" style="height:36px;line-height:36px;">入库时间</td>
				<td style="height:36px;line-height:36px;">进入总务仓库楼层</td>
				<td style="height:36px;line-height:36px;"><p>{{form.floor}}</p></td>
				<td style="height:36px;line-height:36px;">进入仓库人数</td>
				<td style="height:36px;line-height:36px;"><p>{{form.pCount}}</p></td>
				<td colspan="2" style="height:36px;line-height:36px;">预约进入仓库日期</td>
				<td colspan="2" style="height:36px;line-height:36px;"><p>{{form.appEntryDate}}</p></td>
			</tr>
	      <template v-for="(item,index) in infoList">
	        <template v-if="index == 0">
	          <tr>
	            <td :rowspan="inforowspan" colspan="2" style="height:36px;line-height:36px;">
	              入库人员信息
	            </td>
	            <template v-for="(citem,cindex) in item">
	              <td style="height:36px;line-height:36px;">姓名</td>
	              <td style="height:36px;line-height:36px;"><p>{{citem.name}}</p></td>
	            </template>
	          </tr>
	          <tr>
	            <template v-for="(citem,cindex) in item">
	              <td style="height:36px;line-height:36px;">工号</td>
	              <td style="height:36px;line-height:36px;"><p>{{citem.empNo}}</p></td>
	            </template>
	          </tr>
	        </template>
	        <template v-else>
	            <tr >
	              <template v-for="(citem,cindex) in item">
	                <td style="height:36px;line-height:36px;">姓名</td>
	                <td style="height:36px;line-height:36px;"><p>{{citem.name}}</p></td>
	              </template>
	            </tr>
	            <tr >
	              <template v-for="(citem,cindex) in item">
	                <td style="height:36px;line-height:36px;">工号</td>
	                <td style="height:36px;line-height:36px;"><p>{{citem.empNo}}</p></td>
	              </template>
	            </tr>
	        </template>
	      </template>
	        <tr>
		        <td colspan="2" style="height:36px;line-height:36px;">一般文书业务类别</td>
		        <td colspan="8" style="height:36px;line-height:36px;">
		        	<span><span class="gdcheckbg" style="display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    margin-right: 8px;
    pointer-events: none;position:relative;"><label v-show="form.opType == '入库'" style="position: absolute;
    top: 0;
    left: 2px;font-size:14px;line-height:14px;">√</label></span>入库</span>
		        	<span><span class="gdcheckbg" style="display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    margin-right: 8px;
    pointer-events: none;position:relative;"><label v-show="form.opType == '出库'" style="position: absolute;
    top: 0;
    left: 2px;font-size:14px;line-height:14px;">√</label></span>出库</span>
		        	<span><span class="gdcheckbg" style="display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    margin-right: 8px;
    pointer-events: none;position:relative;"><label v-show="form.opType == '查看'" style="position: absolute;
    top: 0;
    left: 2px;font-size:14px;line-height:14px;">√</label></span>查看</span>
		        	<span><span class="gdcheckbg" style="display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    margin-right: 8px;
    pointer-events: none;position:relative;"><label v-show="form.opType == '废弃'" style="position: absolute;
    top: 0;
    left: 2px;font-size:14px;line-height:14px;">√</label></span>废弃</span>
		        </td>
	        </tr>
			<tr>
				<td :rowspan="dataInfoRowspan" colspan="2" style="height:36px;line-height:36px;">
                一般文书资料信息(入库、废弃等)
                </td>
				<td style="height:36px;line-height:36px;">序号</td>
				<td colspan="2" style="height:36px;line-height:36px;">文件名</td>
				<td colspan="2" style="height:36px;line-height:36px;">箱号</td>
				<td colspan="2" style="height:36px;line-height:36px;">数量</td>
				<td style="height:36px;line-height:36px;">担当</td>
			</tr>
			<template v-for="(item,index) in dataInfoList">
				<tr>
					<td style="height:36px;line-height:36px;">{{index+1}}</td>
					<td colspan="2" style="height:36px;line-height:36px;">
						<p v-html="item.filename"></p>
					</td>
					<td colspan="2" style="height:36px;line-height:36px;">
					  <p>{{item.boxNumber}}</p>
					</td>
					<td colspan="2" style="height:36px;line-height:36px;">
					  <p>{{item.number}}</p>
					</td>
					<td style="height:36px;line-height:36px;">
					  <p>{{item.abay}}</p>
					</td>
				</tr>
			</template>
			<tr>
				<td rowspan="4" colspan="2" style="height:36px;line-height:36px;">一般文书资料信息（查看、出库）</td>
        <td style="height:36px;line-height:36px;">查看文书名称</td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkList[0]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkList[1]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkList[2]"></p></td>
        <td style="height:36px;line-height:36px;"><p v-html="checkList[3]"></p></td>
			</tr>
			<tr>
				<td rowspan="3" style="height:36px;line-height:36px;">查看出库文书名称</td>
				<td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[0]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[1]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[2]"></p></td>
        <td style="height:36px;line-height:36px;"><p v-html="checkOutList[3]"></p></td>
			</tr>
			<tr>
				<td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[4]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[5]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[6]"></p></td>
        <td style="height:36px;line-height:36px;"><p v-html="checkOutList[7]"></p></td>
			</tr>
			<tr>
				<td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[8]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[9]"></p></td>
        <td colspan="2" style="height:36px;line-height:36px;"><p v-html="checkOutList[10]"></p></td>
        <td style="height:36px;line-height:36px;"><p v-html="checkOutList[11]"></p></td>
			</tr>
			<tr>
				<td colspan="3" style="height:36px;line-height:36px;">部长课长及以上签名</td>
				<td colspan="3" style="height:36px;line-height:36px;">{{nameArray[1]}}</td>
				<td style="height:36px;line-height:36px;">日期</td>
				<td colspan="3" style="height:36px;line-height:36px;">{{formatDate(new Date(dateArray[1]),'yyyy-MM-dd hh:mm')}}</td>	
			</tr>
			<tr>
				<td colspan="10" style="height:36px;line-height:36px;">总务业务主管部门填写</td>
			</tr>
			<tr>
				<td colspan="2" style="height:36px;line-height:36px;">一般文书仓库仓管员</td>
				<td colspan="1" style="height:36px;line-height:36px;">{{nameArray[2]}}</td>
				<td style="height:36px;line-height:36px;">复核</td>
				<td style="height:36px;line-height:36px;">{{nameArray[3]}}</td>
				<td colspan="1" style="height:36px;line-height:36px;">课长确认</td>
				<td style="height:36px;line-height:36px;">{{nameArray[4]}}</td>
				<td style="height:36px;line-height:36px;">日期</td>
				<td colspan="2" style="height:36px;line-height:36px;">{{formatDate(new Date(dateArray[4]),'yyyy-MM-dd hh:mm')}}</td>
			</tr>
		</table>
	    </div>
		<!--endprint-->		
		<span slot="footer" class="dialog-footer">
			<template v-if="ieShow">
				<el-button type="primary" @click="printPdf">打印</el-button>
			</template>
			<template v-else>
				<el-button type="primary" v-print="'#printtable'">打印</el-button>
			</template>
		    
		</span>
	</el-dialog>
	</div>
</template>
<script>
import { formatDate } from '@/utils/index'
export default {
  name: 'eslForm',
  props: {
  	vShow: {
  	  type: Boolean,
  	  default: false
  	},
  	eForm: {
  	  type: Object,
  	  default: function () {
  	  	return {}
  	  }
  	},
  	eRecord:{
  	  type: Array,
  	  default: function () {
  	  	return []
  	  }
  	}
  },
  data () {
  	return {
  	  dialogVisible: this.vShow,
  	  form: {
        empid:'',
      	empName:'',
      	empPhone:'',
      	deptid:'',
      	deptName:'',
      	floor:'',
      	pCount:0,
      	appEntryDate:'',
        submitDate: '',
      	personInfo:'',
      	opType:'',
      	dataInfo:'',
      	checkName:'',
      	checkOutputName:''
  	  },
  	  record: this.eRecord,
  	  infoList: [],
  	  inforowspan: 4,
  	  dataInfoRowspan: 11,
  	  dataInfoList:[],
  	  checkList:[],
  	  checkOutList:[],
  	  ieShow: true,
      nameArray: [],
      dateArray: []
  	}
  },
  watch: {
  	vShow (val) {
      this.dialogVisible = val
  	},
  	eForm (val) {
      this.form = val
      this.form.appEntryDate = formatDate(new Date(val.appEntryDate),'yyyy-MM-dd hh:mm')
      this.form.submitDate = val.submitDate !='' ? formatDate(new Date(val.submitDate),'yyyy-MM-dd hh:mm') : ''
      this.getInfoList(val)
      this.getDataInfoList(val)
      this.getCheckList(val)
      this.getCheckOutList(val)
  	},
  	eRecord (val) {
      let nArray = []
      let dArray = []
      val.forEach(function(element, index) {
        nArray.push(element.rvwEmpName)
        dArray.push(element.submitTime)
      })
      this.nameArray = nArray
      this.dateArray = dArray
  	}
  },
  created () {
  	if (!!window.ActiveXObject || "ActiveXObject" in window) {
  	  this.ieShow = true
  	} else {
  	  this.ieShow = true
  	}
  },
  methods: {
    formatDate:formatDate,
  	getInfoList (val) {
  	  this.infoList = []      
      let personInfo = val.personInfo
      let personInfoArray = personInfo.split('|')
      let dataArr = new Array(Math.ceil(personInfoArray.length / 4))
      for(let i = 0; i < dataArr.length;i++) {
        dataArr[i] = new Array()
        for(let j = 0; j < 4; j++) {
            dataArr[i][j] = ''
        }
      }
      for(let i = 0; i < personInfoArray.length;i++) {
        let cArray = personInfoArray[i].split(/,|=/g)
        let obj = {
	        name: cArray[1],
	        empNo: cArray[3]
	    }
        dataArr[parseInt(i / 4)][i % 4] = obj
      }
      if (dataArr.length < 2) {
      	for (let i = dataArr.length;i<2;i++){
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
		  	dataArr.push(obj)
      	}
      }
      this.infoList = dataArr
      this.inforowspan = dataArr.length * 2
  	},
  	getDataInfoList (val){
  	  this.dataInfoList = []
      let dataInfo = val.dataInfo
      let dataInfoArray = dataInfo.split('|')
      let dataArray = []
      dataInfoArray.forEach(function(element, index) {
      	let cArray = element.split(/,|=/g)
      	let obj = {
	  	  filename: cArray[1],
	  	  boxNumber: cArray[3],
	  	  number: cArray[5],
	  	  abay: cArray[7]
	  	}
	  	dataArray.push(obj)
      })
      if (dataArray.length < 10) {
      	for (let i = dataArray.length;i<10;i++){
	      	let obj = {
		  	  filename: '',
		  	  boxNumber: '',
		  	  number: '',
		  	  abay: ''
		  	}
		  	dataArray.push(obj)
      	}
      }
      this.dataInfoList = dataArray
      this.dataInfoRowspan = dataArray.length+1
  	},
  	getCheckList (val) {
  	  let checkName = val.checkName
  	  this.checkList = checkName.split(',')
  	},
  	getCheckOutList (val) {
  	  let checkOutputName = val.checkOutputName
  	  this.checkOutList = checkOutputName.split(',')
  	},
  	handleClose () {
  	  this.dialogVisible = false
  	  this.$emit('eslform',this.dialogVisible)
  	},
  	printPdf () {
  	    let newWindow = window.open("_blank");   //打开新窗口
	    let codestr = document.getElementById("printcontent").innerHTML;   //获取需要生成pdf页面的div代码
	    console.log(codestr)
	    newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
	    newWindow.document.close();     //关闭document的输出流, 显示选定的数据
	    newWindow.print();   //打印当前窗口
	    return true;
  	},
  	printShow () {
  	  if (!!window.ActiveXObject || "ActiveXObject" in window) {
        let newstr = document.getElementById("printtable").innerHTML
        let oldstr = document.body.innerHTML
        document.body.innerHTML = newstr
        document.execCommand('print')
        document.body.innerHTML = oldstr
        window.location.reload()
      } else {
        let newstr = document.getElementById("testprint").innerHTML
        let oldstr = document.body.innerHTML
        document.body.innerHTML = newstr
        window.print()
        document.body.innerHTML = oldstr
        window.location.reload()
      }
  	}
  }
}
</script>