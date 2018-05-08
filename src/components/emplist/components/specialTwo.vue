<template>
	<div>
		<p>{{$t('visitcause')}}: {{visitType}}</p>
		<p>{{$t('semp')}}:</p>
		<div class="muttagswrap margintop20 paddingtb20 paddinglr30 border minheight100">
			<template v-for="(item,index) in empArray">
				<el-tag class="marginr10"
				  :key="item.empName"
				  closable @close="doRemoveEmp(index)">
				  {{item.empName}}
				</el-tag>
			</template>
		</div>
		<div class="margintop20">
			<el-button type="default" @click="doPrev">{{$t('prevStep')}}</el-button>
			<el-button type="primary" @click="doNext">{{$t('nextStep')}}</el-button>
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
  	},
  	eArray: {
  	  type: Array,
  	  default: []
  	}
  },
  data () {
  	return {
  	  dialogVisible: false,
      bType: 'default',
      options: [],
      visitType: this.vtype,
      empArray: this.eArray
  	}
  },
  watch: {
  	vtype (val) {
  	  this.visitType = val
  	},
  	eArray (val) {
  		console.log(val)
  	  this.empArray = val
  	}
  },
  mounted () {},
  methods: {
  	doPrev () {
      this.$emit('prevkit',0,this.visitType)
  	},
    doNext () {
      let err = []
      let _self = this
      this.empArray.forEach(function(element, index) {
        let nform = {
          userid: getCache('userid'),
          employeeid: element.empid,
          emptype: 1,
          visitType: _self.visitType
        }
        err.push(nform)
      })
      this.updateEmp(err)
    },
    doRemoveEmp (val) {
      this.$emit('removekit',false,this.empArray[val])
    },
    updateEmp (err) {
      this.$store.dispatch('updateEmpVisitType',err).then(res => {
      	let {status,result} = res
      	if (status === 0) {
          this.$emit('nextkit',2,this.visitType) 
      	}
      })
    }
  }
}
</script>