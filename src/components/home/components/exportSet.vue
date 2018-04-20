<template>
	<div>
		<el-button @click="dialogVisible = true">导出配置</el-button>
		<el-dialog
		  title="访客列表导出项设置"
		  :visible.sync="dialogVisible"
		  width="60%">
		  <div class="exportwap">
		  	<span class="exsection">拜访者
		  		<el-checkbox v-model="exportTable[0]"></el-checkbox>
		  	</span>
            <span class="exsection">联系方式
            	<el-checkbox v-model="exportTable[1]"></el-checkbox></span>
            <span class="exsection">被访者
            	<el-checkbox v-model="exportTable[2]"></el-checkbox></span>
            <span class="exsection">被访者联系方式
            	<el-checkbox v-model="exportTable[3]"></el-checkbox></span>
            <span class="exsection">拜访事由
                <el-checkbox v-model="exportTable[4]"></el-checkbox></span>
            <span class="exsection">签入门岗
                <el-checkbox v-model="exportTable[5]"></el-checkbox></span>
            <span class="exsection">签出门岗
                <el-checkbox v-model="exportTable[6]"></el-checkbox>
            </span>
            <span class="exsection">签入警卫
                <el-checkbox v-model="exportTable[7]"></el-checkbox>
            </span>
            <span class="exsection">签出警卫
                <el-checkbox v-model="exportTable[8]"></el-checkbox>
            </span>
            <span class="exsection">工作单位
                <el-checkbox v-model="exportTable[9]"></el-checkbox>
            </span>
            <span class="exsection">证件号码
                <el-checkbox v-model="exportTable[10]"></el-checkbox>
            </span>
            <span class="exsection">证件扫描件
                <el-checkbox v-model="exportTable[11]"></el-checkbox>
            </span>
            <span class="exsection">来访人数
                <el-checkbox v-model="exportTable[12]"></el-checkbox>
            </span>
            <span class="exsection">随访人员清单
            	<el-checkbox v-model="exportTable[13]"></el-checkbox></span>
            <span class="exsection">备注
            	<el-checkbox v-model="exportTable[14]"></el-checkbox></span>
            <span class="exsection">签到时间
            	<el-checkbox v-model="exportTable[15]"></el-checkbox></span>
            <span class="exsection">签出时间
            	<el-checkbox v-model="exportTable[16]"></el-checkbox></span>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="success" @click="getExport">导出</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import {downloadDoc} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  props: ['vtype','nform'],
  data () {
  	return {
  	  dialogVisible: false,
  	  exportTable:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	  type: this.vtype
  	}
  },
  watch: {
  	vtype (val) {
  	  this.type = val
  	}
  },
  methods: {
  	getExport () {
  	  let cArray = []
      let _self = this
      this.exportTable.forEach(function(element, index) {
      	if (element) {
      	  _self.$set(_self.exportTable,index,1)
      	}
      })
      let params
      if(this.type === 1) {
        if (this.nform.name !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&name=' + this.nform.name +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else if(this.type === 2) {
        if (this.nform.empName !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&empName=' + this.nform.empName +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else if(this.type === 3) {
        if (this.nform.visitType !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&visitType=' + this.nform.visitType +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else if(this.type === 4) {
        if (this.nform.phone !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&phone=' + this.nform.phone +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else if(this.type === 5) {
        if (this.nform.vcompany !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&vcompany=' + this.nform.vcompany +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else if(this.type === 6) {
        if (this.nform.signInGate !=='') {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&signInGate=' + this.nform.signInGate +'&subaccountId=0'
        } else {
        	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
        }
      } else {
      	params = '?userid=' + getCache('userid') + '&date=' + this.nform.date + '&endDate=' + this.nform.endDate + '&subaccountId=0'
      }
      params += '&exportCols=' + this.exportTable.join('') + '&token=' + getCache('token')
      downloadDoc(params)
  	}
  }
}
</script>