<template>
	<div>
    <h3>关联闸机组</h3>
		<ul class="gatelist">
		  <template v-for="(item,index) in gatelist">
		  	<li><el-checkbox v-model="checkValue[index]" @change="setchange(item,index)"></el-checkbox>{{item.egname}}</li>
		  </template>
		</ul>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {valueToString} from '@/utils/common'
export default {
  props: {
    checkArray: {
      type: Array,
      default: []
    }
  },
  data () {
  	return {
  	  form: {
  	  	userid: getCache('userid')
  	  },
  	  gatelist: [],
  	  checkValue: []
  	}
  },
  methods: {
  	getGateList () {
  	  this.$store.dispatch('getEquipmentGroupByUserid',this.form).then(res => {
        let {status,result} = res
        if (status === 0) {
          let _self = this
          result.forEach(function(element, index) {
            _self.checkArray.forEach(function(ele, eindex) {
             if (element.egid === parseInt(ele)) {
              _self.checkValue[index] = true
             }
            })
          })
          this.gatelist = result
        }
      })
    },
    setchange (item,index) {
      this.getList()
    },
    getList () {
      let _self = this
      let cArray = []
      this.gatelist.forEach(function(element, index) {
        if (_self.checkValue[index]) {
          cArray.push(element.egid)
        }
      })
      this.$emit('getclist',cArray)
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getGateList()
    })
  }
}
</script>