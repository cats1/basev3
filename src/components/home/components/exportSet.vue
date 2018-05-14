<template>
	<div>
		<el-button @click="dialogVisible = true">{{$t('btn.exportBtn')}}</el-button>
		<el-dialog
		  :title="$t('export.title')"
		  :visible.sync="dialogVisible"
		  width="60%">
		  <div class="exportwap">
    		  	<span class="exsection">{{$t('form.name.text1')}}
    		  		<el-checkbox v-model="exportTable[0]"></el-checkbox>
    		  	</span>
            <span class="exsection">{{$t('form.phone.text1')}}
            	<el-checkbox v-model="exportTable[1]"></el-checkbox></span>
            <span class="exsection">{{$t('form.name.text2')}}
            	<el-checkbox v-model="exportTable[2]"></el-checkbox></span>
            <span class="exsection">{{$t('form.phone.text2')}}
            	<el-checkbox v-model="exportTable[3]"></el-checkbox></span>
            <span class="exsection">{{$t('checkVtype[3]')}}
                <el-checkbox v-model="exportTable[4]"></el-checkbox></span>
            <template v-if="isDoorShow">
              <span class="exsection">{{$t('notice.doorset.signinDoor')}}
                <el-checkbox v-model="exportTable[5]"></el-checkbox></span>
              <span class="exsection">{{$t('notice.doorset.signoutDoor')}}
                  <el-checkbox v-model="exportTable[6]"></el-checkbox>
              </span>
              <span class="exsection">{{$t('notice.doorset.signinGuard')}}
                  <el-checkbox v-model="exportTable[7]"></el-checkbox>
              </span>
              <span class="exsection">{{$t('notice.doorset.signoutGuard')}}
                  <el-checkbox v-model="exportTable[8]"></el-checkbox>
              </span>
            </template>
            <span class="exsection">{{$t('form.companypro.text2')}}
                <el-checkbox v-model="exportTable[9]"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.idnum.text1')}}
                <el-checkbox v-model="exportTable[10]"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.idnum.text2')}}
                <el-checkbox v-model="exportTable[11]"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.count.text')}}
                <el-checkbox v-model="exportTable[12]"></el-checkbox>
            </span>
            <span class="exsection">{{$t('form.count.text1')}}
            	<el-checkbox v-model="exportTable[13]"></el-checkbox></span>
            <span class="exsection">{{$t('form.remark.text')}}
            	<el-checkbox v-model="exportTable[14]"></el-checkbox></span>
            <span class="exsection">{{$t('form.time.text')}}
            	<el-checkbox v-model="exportTable[15]"></el-checkbox></span>
            <span class="exsection">{{$t('form.time.text1')}}
            	<el-checkbox v-model="exportTable[16]"></el-checkbox></span>
		  </div>
		  <span slot="footer" class="dialog-footer">
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
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
  	  exportTable:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	  type: this.vtype,
      isDoorShow: this.extendShow
  	}
  },
  computed: {},
  watch: {
  	vtype (val) {
  	  this.type = val
  	},
    extendShow (val) {
      this.isDoorShow = val
    }
  },
  mounted () {},
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