<template>
	<div class="boxshadow paddinglr30 paddingtb20">
		<el-form :model="form">
			<el-form-item>
				<el-select v-model="svalue" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in $t('checkVtype')"
				      :key="item"
				      :label="item"
				      :value="index" @change="settype">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input v-model="value"></el-input>
			</el-form-item>
			<el-form-item>
				<el-date-picker
			      v-model="dvalue"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getVisitor">搜索</el-button>
			</el-form-item>
		</el-form>
		<data-pie></data-pie>
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {formatDate} from '@/utils/index'
import dataPie from '@/components/charts/dataPie'
export default {
  components: {dataPie},
  data () {
  	return {
  		form: {
  			'userid': getCache('userid'),
	        'name': '',
	        'empName': '',
	        'visitType': '',
	        'phone': '',
	        'date': formatDate(new Date(),'yyyy-MM-dd'),
	        'endDate': formatDate(new Date(),'yyyy-MM-dd'),
	        'vcompany': '',
	        'signInGate': ''
  		},
  		svalue: '',
  		value: '',
  		dvalue: '',
  		vlist: []
  	}
  },
  methods: {
  	settype (val) {},
  	getVisitor () {
  	  this.$store.dispatch('SearchVisitByCondition',this.form).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.vlist = result
          this.$emit('getvlist',result)
        }
      })
  	}
  }
}
</script>