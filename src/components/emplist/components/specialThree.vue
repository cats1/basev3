<template>
	<div>
		<p>{{$t('emptip')}}</p>
		<div class="muttagswrap margintop20 paddingtb20 paddinglr30 border minheight100">
			<template v-for="(item,index) in empArray">
        <emp-tag :e-obj="item" :index="index" @checkkit="checkTag"></emp-tag> 
			</template>
		</div>
		<div class="margintop20">
			<el-button type="default" @click="doPrev">{{$t('prevStep')}}</el-button>
			<el-button type="primary" @click="doNext">{{$t('nextStep')}}</el-button>
		</div>
		
	</div>
</template>
<script>
import empTag from './empTag'
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
  components: {empTag},
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
  	  this.empArray = val
  	}
  },
  mounted () {},
  methods: {
    checkTag (type,index) {
      if (type === '') {
        this.$set(this.empArray[index],'egtype',0)
      } else {
        this.$set(this.empArray[index],'egtype',1)
      }
    },
  	doPrev () {
      this.$emit('prevkit',1,this.visitType)
  	},
    doNext () {
      let err = []
      let _self = this
      this.eArray.forEach(function(element, index) {
        let egtype = 0
        if (element.egtype && element.egtype === 1) {
          egtype = 1
        }
        let nform = {
          userid: getCache('userid'),
          employeeid: element.empid,
          emptype: egtype,
          visitType: _self.visitType
        }
        err.push(nform)
      })
      this.updateDefault(err)
    },
    doRemoveEmp (val) {
      this.$emit('removekit',false,this.empArray[val])
    },
    updateDefault (err) {
      this.$store.dispatch('updateDefaultNotify',err).then(res => {
      	let {status,result} = res
      	if (status === 0) {
          this.$emit('nextkit',0,'')
        }
      })
    }
  }
}
</script>