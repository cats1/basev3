<template>
	<div>
		<el-button @click="dialogVisible = true">{{$t('btn.exportBtn')}}</el-button>
		<el-dialog
		  :title="$t('export.title')"
		  :visible.sync="dialogVisible"
		  width="60%">
		  <div class="exportwap">
    		  	<span class="exsection">{{$t('form.name.text1')}}
    		  		<el-checkbox v-model="exportTable[0]" @change="changeCheck"></el-checkbox>
    		  	</span>
            <span class="exsection">{{$t('form.phone.text1')}}
            	<el-checkbox v-model="exportTable[1]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('form.name.text2')}}
            	<el-checkbox v-model="exportTable[2]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('form.phone.text2')}}
            	<el-checkbox v-model="exportTable[3]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('checkVtype[3]')}}
              <el-checkbox v-model="exportTable[4]" @change="changeCheck"></el-checkbox></span>
            <template v-if="isDoorShow">
              <span class="exsection">{{$t('notice.doorset.signinDoor')}}
                <el-checkbox v-model="exportTable[5]" @change="changeCheck"></el-checkbox></span>
              <span class="exsection">{{$t('notice.doorset.signoutDoor')}}
                  <el-checkbox v-model="exportTable[6]" @change="changeCheck"></el-checkbox>
              </span>
              <span class="exsection">{{$t('notice.doorset.signinGuard')}}
                  <el-checkbox v-model="exportTable[7]" @change="changeCheck"></el-checkbox>
              </span>
              <span class="exsection">{{$t('notice.doorset.signoutGuard')}}
                  <el-checkbox v-model="exportTable[8]" @change="changeCheck"></el-checkbox>
              </span>
            </template>
            <span class="exsection">{{$t('form.companypro.text2')}}
                <el-checkbox v-model="exportTable[9]" @change="changeCheck"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.idnum.text1')}}
                <el-checkbox v-model="exportTable[10]" @change="changeCheck"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.idnum.text2')}}
                <el-checkbox v-model="exportTable[11]" @change="changeCheck"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.count.text')}}
                <el-checkbox v-model="exportTable[12]" @change="changeCheck"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.count.text1')}}
            	<el-checkbox v-model="exportTable[13]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('form.remark.text')}}
            	<el-checkbox v-model="exportTable[14]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('form.time.text')}}
            	<el-checkbox v-model="exportTable[15]" @change="changeCheck"></el-checkbox></span>
            <span class="exsection">{{$t('form.time.text1')}}
            	<el-checkbox v-model="exportTable[16]" @change="changeCheck"></el-checkbox></span>
            <template v-if="firstAndLastRoomTime">
              <span class="exsection">第一次经过机房时间
                <el-checkbox v-model="exportTable[17]" @change="changeCheck"></el-checkbox></span>
              <span class="exsection">最后一次经过机房时间
                <el-checkbox v-model="exportTable[18]" @change="changeCheck"></el-checkbox></span>
            </template>
            <template v-if="tagShow">
              <span class="exsection">{{$t('tagText')}}
                <el-checkbox v-model="exportTable[17]" @change="changeCheck"></el-checkbox></span>
                <span class="exsection">{{$t('visitTypeText')}}
                <el-checkbox v-model="exportTable[18]" @change="changeCheck"></el-checkbox></span>
            </template>
            <template v-if="expExcDepAndCnumber">
              <span class="exsection">{{$t('form.depart.text')}}
                <el-checkbox v-model="exportTable[17]" @change="changeCheck"></el-checkbox></span>
              <span class="exsection">{{$t('carNumber')}}
                <el-checkbox v-model="exportTable[18]" @change="changeCheck"></el-checkbox></span>
              <span class="exsection">申请人
                <el-checkbox v-model="exportTable[19]" @change="changeCheck"></el-checkbox></span>
              <span class="exsection">工号
                <el-checkbox v-model="exportTable[20]" @change="changeCheck"></el-checkbox></span>
            </template>
            <template v-if="extendExportShow">
              <template v-for="(item,index) in extendArray">
                <span class="exsection">{{item.displayName}}
                <el-checkbox v-model="extendExportTable[index]" @change="changeCheck"></el-checkbox></span>
              </template>
            </template>
		  </div>
		  <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkAll">
          <template v-if="allCheckFlag">{{$t('btn.cancelBtn')}}</template>
          <template v-else>{{$t('CheckAll')}}</template></el-button>
		    <el-button type="success" @click="getExport">{{$t('btn.export')}}</el-button>
		  </span>
		</el-dialog>
    
	</div>
</template>
<script>
import {downloadDoc} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  props: {
    nform: {
      type: Object,
      default: {}
    },
    vtype: {
      type: Number,
      default: 0
    },
    extendShow: {
      type: Boolean,
      default: true
    },
    extendList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
  	  exportTable:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	  type: this.vtype,
      isDoorShow: this.extendShow,
      dataErrorExport: process.env.dataErrorExport || false,
      allCheckFlag: false,
      expExcDepAndCnumber: process.env.expExcDepAndCnumber || false,
      extendExportShow: process.env.extendExportShow || false,
      extendArray: this.extendList,
      extendExportTable: [],
      tagShow: process.env.tagShow || false,
      firstAndLastRoomTime: process.env.firstAndLastRoomTime || false,
      applicantShow: process.env.applicantShow || false
  	}
  },
  computed: {},
  watch: {
  	vtype (val) {
  	  this.type = val
  	},
    extendShow (val) {
      this.isDoorShow = val
    },
    extendList (val) {
      this.extendArray = val
      let _self = this
      this.extendExportTable = Array(val.length).fill(0)
    }
  },
  created () {
    if (this.dataErrorExport) {
      this.exportTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      this.extendExportTable = Array(this.extendList.length).fill(0)
    } else if (this.expExcDepAndCnumber) {
      this.exportTable = [true, 0, true, 0, true, 0, 0, 0, 0, true, true, 0, 0, 0, true, true, true, true, true,0,0]
      this.extendExportTable = Array(this.extendList.length).fill(0)
    } else if (this.tagShow) {
      this.exportTable = Array(19).fill(0)
      this.extendExportTable = Array(this.extendList.length).fill(0)
    } else if (this.firstAndLastRoomTime) {
      this.exportTable = Array(19).fill(0)
      this.extendExportTable = Array(this.extendList.length).fill(0)
    } else {
      this.exportTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.extendExportTable = Array(this.extendList.length).fill(0)
    }
  },
  methods: {
    changeCheck (val) {
      let cFlag = true
      this.exportTable.forEach(function(element, index) {
        if (!element) {
          cFlag = false
          return false
        }
      })
      this.allCheckFlag = cFlag
    },
    checkAll () {
      this.allCheckFlag = !this.allCheckFlag
      if (this.allCheckFlag) {
        if (this.dataErrorExport) {
          this.exportTable = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
          this.extendExportTable = Array(this.extendList.length).fill(true)
        } else if (this.expExcDepAndCnumber) {
          this.exportTable = Array(21).fill(true)
          this.extendExportTable = Array(this.extendList.length).fill(true)
        } else if (this.tagShow) {
          this.exportTable = Array(19).fill(true)
          this.exportTable[5] = 0
          this.exportTable[6] = 0
          this.exportTable[7] = 0
          this.exportTable[8] = 0
          this.extendExportTable = Array(this.extendList.length).fill(true)
        }  else if (this.firstAndLastRoomTime) {
          this.exportTable = Array(19).fill(true)
          //this.extendExportTable = Array(this.extendList.length).fill(true)
        } else {
          this.exportTable = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
          //this.extendExportTable = Array(this.extendList.length).fill(true)
        }
      } else {
        if (this.dataErrorExport) {
          this.exportTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
          this.extendExportTable = Array(this.extendList.length).fill(0)
        } else if (this.expExcDepAndCnumber) {
          this.exportTable = Array(21).fill(false)
          //this.exportTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
          this.extendExportTable = Array(this.extendList.length).fill(0)
        } else if (this.tagShow) {
          this.exportTable = Array(19).fill(false)
          this.extendExportTable = Array(this.extendList.length).fill(0)
        } else if (this.firstAndLastRoomTime) {
          this.exportTable = Array(19).fill(false)
          this.extendExportTable = Array(this.extendList.length).fill(0)
        } else {
          this.exportTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          this.extendExportTable = Array(this.extendList.length).fill(0)
        }
      }
    },
  	getExport () {
  	  let cArray = []
      let _self = this
      this.exportTable.forEach(function(element, index) {
      	if (element) {
      	  _self.$set(_self.exportTable,index,1)
      	} else {
          _self.$set(_self.exportTable,index,0)
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
      if (this.extendExportShow) {
        let eString = ''
        let _self = this
        let sArray = []
        this.extendList.forEach(function(element, index) {
          let eValue = _self.extendExportTable[index] ? 1 : 0
          if (_self.extendExportTable[index]) {
            sArray.push(element.fieldName)
          }
        })
        eString = sArray.join(',')
        params += '&expExtCols=' + eString
      }
      params += '&exportCols=' + this.exportTable.join('') + '&token=' + getCache('token')
      downloadDoc(params)
  	}
  }
}
</script>