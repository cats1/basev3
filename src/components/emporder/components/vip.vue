<template>
<div class="vipwrap" >
    <div class="viptop">      
      <p><span>爱普生</span>VIP贵宾单 <!-- <clock :vshow="clockFlag" style="float:right"></clock> --></p>
    </div>
		<!-- <h3>贵宾接待依赖票</h3> -->
	<div class="lft-box-wrap">
		<div class="lft-box">
			<div class="lft-box-point red"></div>
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item ">
							<label for="">申请人</label>
							<el-input class="noedit" v-model="vipForm.empName"></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item ">
							<label for="">申请部门</label>				
							<template v-if="deptList.length>1">
								<el-select v-model="vipForm.deptid" placeholder="请选择" @change="getDept">
								    <el-option
								      v-for="item in deptList"
								      :key="item.deptid"
								      :label="item.deptName"
								      :value="item.deptid">
								    </el-option>
							    </el-select>
							</template>
							<template v-else>
								<el-input class="noedit" v-model="vipForm.deptName"></el-input>
							</template>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item">
							<label for="">申请日期</label>
              <el-date-picker v-model="vipForm.submitDate" style="width:100%"
                type="datetime" class="block noedit" value-format="yyyy-MM-dd HH:mm" :placeholder="$t('form.time.text3')">
              </el-date-picker>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item ">
							<label for="">接待日期</label>
							<el-date-picker v-model="vipForm.receptionDate" style="width:100%"
			          type="datetime" class="block" value-format="yyyy-MM-dd HH:mm" :placeholder="$t('form.time.text3')" :picker-options="options" :default-time="['14:00', '18:00']" @change="getReceptionDate">
			        </el-date-picker>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item ">
							<label for="">接待地点</label>
							<el-input v-model="vipForm.receptionPlace" @change="getReceptionPlace"></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="lft-box-cell">
						<div class="cell-item ">
							<label for="">访客人数</label>
							<el-input v-model="vipForm.vCount" @change="getReceptionPlace"></el-input>
						</div>
					</div>
				</el-col>
			</el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="lft-box-cell">
            <div class="cell-item ">
              <label for="">车牌号</label>
              <el-input v-model="plateNums" @change="getReceptionPlace"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="lft-box-cell">
            <div class="cell-item ">
              <label for="">被访者姓名</label>
              <el-input v-model="vipForm.interviewee" @change="getReceptionPlace"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="lft-box-cell">
            <div class="cell-item ">
              <label for="">访客单位</label>
              <el-input v-model="vcompany" @change="getReceptionPlace"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
		</div>
    <h3 class="ctitletip">申请理由</h3>
    <div class="lft-box paddingnone">
      <div class="lft-box-point yellow"></div>
      <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="vipForm.subReason" @change="getReason"></el-input>
    </div>
    <h3 class="ctitletip">选择贵宾类型</h3>
    <div class="lft-box">
      <div class="lft-box-point blue"></div>
      <el-radio v-model="radio" label="A" @change="getRadioType">A类(政府高层人员)</el-radio>
      <el-checkbox-group v-model="aList" @change="getTypeA">
          <el-checkbox label="支装水" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="鲜花" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="铭牌/条幅" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="茶水/咖啡" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="摄影" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="参观工场" :disabled="disabledA"></el-checkbox>
          <el-checkbox label="无线讲解接收器" :disabled="disabledA"></el-checkbox>
      </el-checkbox-group>
      <el-radio v-model="radio" label="B" @change="getRadioType">B类(政府机关业务担当)</el-radio>
        <el-checkbox-group v-model="bList" @change="getTypeB">
          <el-checkbox label="支装水" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="鞋套" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="茶水/咖啡" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="摄影" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="便当" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="参观工场" :disabled="disabledB"></el-checkbox>
          <el-checkbox label="无线讲解接收器" :disabled="disabledB"></el-checkbox>
      </el-checkbox-group>
      <el-radio v-model="radio" label="C" @change="getRadioType">C类(重要客户、SEC高层集团及经营会议成员以上认可的重要客人)</el-radio>、
        <el-checkbox-group v-model="cList" @change="getTypeC">
          <el-checkbox label="支装水" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="鲜花" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="鞋套" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="便当" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="茶水/咖啡/点心" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="摄影" :disabled="disabledC"></el-checkbox>      
          <el-checkbox label="参观工场" :disabled="disabledC"></el-checkbox>
          <el-checkbox label="无线讲解接收器" :disabled="disabledC"></el-checkbox>
      </el-checkbox-group>
    </div>
    <h3 class="ctitletip">依赖事项：(申请部门填写)</h3>
    <div class="lft-box paddingnone">
      <div class="lft-box-point pink"></div>
      <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="vipForm.dependenceItem" @change="getDependenceItem"></el-input>
    </div>
	</div>
</div>
</template>
<script>
import clock from '@/components/clock/clock'
import { getCache } from '@/utils/auth'
import { formatDate } from '@/utils/index'
export default {
  components: {clock},
  props: {
  	vCount: {
  	  type: Number,
  	  default: 0
  	},
  	clearForm: {
  	  type: Boolean,
  	  default: false
  	},
  	vDate: null,
    clockShow: {
      type: Boolean,
      default: false
    },
    plateNum: {
      type: String,
      default: ''
    },
    vform: {
      type: Object,
      default: function () {
        return {
          empid: getCache('empid'),
          empName: getCache('empName'),
          deptid: '',
          deptName: '',
          submitDate: new Date(),
          receptionDate: new Date(),
          receptionPlace: '',
          vCount: '',
          subReason: '',
          typeA: '',
          typeB: '',
          typeC: '',
          dependenceItem: '',
          interviewee: ''
        }
      }
    }
  },
  data () {
  	return {
  	  radio: '',
  	  aList: [],
  	  bList: [],
  	  cList: [],
  	  vipForm: {
  	  	empid: getCache('empid'),
  	  	empName: getCache('empName'),
  	  	deptid: '',
  	  	deptName: '',
  	  	submitDate: new Date(),
  	  	receptionDate: '',
  	  	receptionPlace: '',
  	  	vCount: '',
  	  	subReason: '',
  	  	typeA: '',
  	  	typeB: '',
  	  	typeC: '',
  	  	dependenceItem: '',
        interviewee: ''
  	  },
  	  deptList: [],
  	  options: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      disabledA: false,
      disabledB: false,
      disabledC: false,
      curTime: '',
      clockFlag: this.clockShow,
      plateNums: '',
      vcompany: ''
  	}
  },
  watch: {
  	clearForm (val) {
      this.vipForm = {
  	  	empid: getCache('empid'),
  	  	empName: getCache('empName'),
  	  	deptid: '',
  	  	deptName: '',
  	  	submitDate: new Date(),
  	  	receptionDate: '',
  	  	receptionPlace: '',
  	  	vCount: 1,
  	  	subReason: '',
  	  	typeA: '',
  	  	typeB: '',
  	  	typeC: '',
  	  	dependenceItem: '',
        interval: null,
        interviewee: ''
  	  }
  	  this.aList = []
  	  this.bList = []
  	  this.cList = []
  	  this.radio = ''
  	  this.disabledA = false
      this.disabledB = false
      this.disabledC = false
      this.plateNums = ''
      this.vcompany = ''
    },
    clockShow (val) {
      this.clockFlag = val
      if (val) {
        this.vipForm = this.vform
        this.getDeptList()
        this.plateNums = ''
        this.vcompany = ''
      }
    }
  },
  created () {
    if (this.clockShow) {
      this.vipForm = this.vform
      this.getDeptList()
      this.plateNums = ''
      this.vcompany = ''
    }
  },
  methods: {
    formatDate: formatDate,
  	getRadioType(val) {
  	  if (val == 'A') {
        this.disabledA = false
        this.disabledB = true
        this.disabledC = true
  	    this.bList = []
  	    this.cList = []
  	  } else if (val == 'B') {
        this.disabledA = true
        this.disabledB = false
        this.disabledC = true
        this.aList = []
  	    this.cList = []
  	  } else if (val == 'C') {
        this.disabledA = true
        this.disabledB = true
        this.disabledC = false
        this.aList = []
  	    this.bList = []
  	  }
  	},
    getTypeA (val) {
      this.radio = 'A'
      this.disabledA = false
      this.disabledB = true
      this.disabledC = true
      this.vipForm.typeA = val.join(',')
      this.vipForm.typeB = ''
      this.vipForm.typeC = ''
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getTypeB (val) {
      this.radio = 'B'
      this.disabledA = true
      this.disabledB = false
      this.disabledC = true
      this.vipForm.typeB = val.join(',')
      this.vipForm.typeA = ''
      this.vipForm.typeC = ''
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getTypeC (val) {
      this.radio = 'C'
      this.disabledA = true
      this.disabledB = true
      this.disabledC = false
      this.vipForm.typeC = val.join(',')
      this.vipForm.typeA = ''
      this.vipForm.typeB = ''
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getReceptionDate (val) {
      this.vipForm.receptionDate = new Date(Date.parse(val.replace(/-/g, '/')))//new Date(val)
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getReceptionPlace (val) {
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getReason (val) {
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getDependenceItem (val) {
      this.$emit('getf',this.vipForm,this.plateNums,this.vcompany)
    },
    getDept (val) {},
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
          	//this.vipForm.deptName = result[0].deptName
          	//this.vipForm.deptid = result[0].deptid
            if (result[0].deptid != 0) {
              this.getParentDeptList(result[0].parentId)
            }
          }
        }
      })
    },
    getParentDeptList (deptid) {
      let nform = {
        deptid: deptid,
        userid: getCache('userid')
      }
      this.$store.dispatch('getDepartment',nform).then(res => {
        let {status,result} = res
        if (status == 0) {
          this.vipForm.deptName = result.deptName
          this.vipForm.deptid = result.deptid
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.vipwrap{
  background: #f8f8f8;
  padding-bottom:10px;
  .lft-box-wrap{
   margin: 0 10px;
  }
}
.viptop{
  background:#fff;
  margin-bottom:20px;
  p{
    height:40px;
    line-height:40px;
    font-weight:bold;
    font-size:18px;
    i{
      float:right;
      font-size:12px;
    }
  }
  span{
    background:#7499fc;
    color:#fff;
    height:40px;
    display:inline-block;
    line-height:40px;     
    padding:0 20px;
    margin-right:20px;
  }
}
</style>