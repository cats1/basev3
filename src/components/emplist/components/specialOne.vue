<template>
	<div>
		<el-select class="margintop20" v-model="visitType" placeholder="选择关联拜访事由">
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
  props: {
    vtype: {
      type: String,
      default: ''
    }
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
      options: [],
      visitType: this.vtype
  	}
  },
  watch: {
    vtype (val) {
      this.visitType = val
    }
  },
  mounted () {
  	this.GetVisitType()
  },
  methods: {
    doNext () {
      if (this.visitType !== '') {
      	this.$emit('nextkit',1,this.visitType)
      } else {
      	this.$message({
      	  type: 'warning',
      	  message: '选择关联拜访事由'
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