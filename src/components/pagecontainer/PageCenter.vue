<template>
	<div class="page-container-center">
		<el-row class="bom-row" :gutter="20">
			<el-col :span="16">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 36px;">汇总来访数</span>
				    <div class="box-date-select">
					    <el-date-picker
					      v-model="date"
					      type="daterange"
					      align="right"
					      unlink-panels
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期"
					      :picker-options="pickerOptions2" size="small">
					    </el-date-picker>
					</div>
				  </div>
				  <div class="card-body">
				    <line-chart height='100%' width='100%'></line-chart>
				  </div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 36px;">分公司占比</span>
				  </div>
				  <div class="card-body">
				    <pie-chart height='100%' width='100%' :piedata="pieDataArray"></pie-chart>
				  </div>
				</el-card>
			</el-col>
		</el-row>
		<el-row class="bom-row">
			<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 36px;">分公司来访详情</span>
				  </div>
				  <div class="text item">
				    000
				  </div>
			</el-card>
		</el-row>
	</div>
</template>
<script>
import PieChart from '@/components/charts/pie'
import LineChart from '@/components/charts/Line'
import {setDateFormat} from '@/utils/index'
export default {
  data () {
  	return {
  	  date: [this.parseTime('','-',0),this.parseTime('','-',0)],
  	  pickerOptions2: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
        }]
      },
      comlist: [],
      countlist: [],
      info: {
      	username: this.$store.state['superApi'].username
      },
      total: 0,
      pieDataArray: []
  	}
  },
  methods: {
    getRelatedAccount () {
      this.$store.dispatch('getRelatedAccount',this.info).then(data => {
      	let {status, result} = data
      	this.comlist = result
      	this.getAllSuperAccountVCount()
      })
    },
    getAllSuperAccountVCount () {
      this.$store.dispatch('getAllSuperAccountVCount',this.info).then(data => {
      	let {status, result} = data
      	this.total = result.total
      	this.countlist = result.vData
      	this.getPieData()
      })
    },
    getSupAccVCount(){
    	let info = {
    		endDate: this.date[0],
            startDate: this.date[1],
            username: this.info.username
    	}
    	this.$store.dispatch('getSupAccVCount',info).then(data => {
      	let {status, result} = data
      	
      })
    },
    getPieData () {
      let pieDataArray = this.comlist
      let _self = this
      pieDataArray.forEach(function(element, index) {
      	_self.countlist.forEach(function(ele, eindex) {
      	  if (element.userid === ele.userid) {
            _self.$set(element,'vcount',Math.ceil(ele.vcount/_self.total*100) + '%')
            _self.pieDataArray[index] = element
            _self.$set(_self.pieDataArray[index],'vcount',ele.vcount)
      	  }
      	})
      })
    },
    parseTime: setDateFormat
  },
  created () {
  	this.getRelatedAccount()
  	this.getSupAccVCount()
  },
  components: {PieChart,LineChart}
}
</script>
<style lang="scss" scoped>
.el-card__header{
  background: rgb(238,238,238);
}
.box-date-select{
	display:inline-block;
	float:right;
}
.bom-row{
	margin-top:20px;
}
.card-body{
  height:500px;
}
</style>