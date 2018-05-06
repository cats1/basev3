<template>
	<div>
		<ul class="processlist">
			<li class="active">1、关联拜访事由</li>
			<li>2、选择员工</li>  
			<li>3、选择抄送</li>
		</ul>
		<el-select class="margintop20" v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item"
		      :label="item"
		      :value="item">
		    </el-option>
		</el-select>
		<div class="margintop20">
			<el-button type="primary" @click="doNext">下一步</el-button>
		</div>
		
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {stringToArray,arrayToString} from '@/utils/common'
export default {
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
      options: [],
      value: ''
  	}
  },
  mounted () {
  },
  mounted () {
  	this.GetVisitType()
  },
  methods: {
    doNext () {
      if (this.value !== '') {
      	this.$emit('nextkit',1,this.value)
      } else {
      	this.$message({
      	  type: 'warning',
      	  message: '請選擇拜訪事由'
      	})
      } 
    },
    GetVisitType () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetVisitType',nform).then(res => {
      	let {status,result} = res
      	if (status === 0) {
          this.options = stringToArray(result.inputValue)
      	}
      })
    }
  }
}
</script>