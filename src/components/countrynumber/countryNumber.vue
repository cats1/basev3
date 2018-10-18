<template>
	<div class="tellinputwrap">
    <div class="tellcountry" >
      <span class="cflag" :class="counClass"></span>
    </div>
    <el-select class="tellinputselect" @change="getSelect" v-model="value" placeholder="" popper-class="countrylist">
      <el-option
        v-for="item in list"
        :key="item.i" :value="item.d"><span class="cflag" :class="item.i"></span>{{item.n}}
      </el-option>
    </el-select>
    <span class="countrynumber">{{value}}</span>
    <input type="text" class="tellinput" v-model="phone" @change="getInput">		
	</div>
</template>
<script>
import country from './country.js'
export default {
  props: {
    pValue: {
      type: String,
      default: ''
    }
  },
  data () {
  	return {
      list: country.allCountries,
      first: '00',
      value: '86',
      counClass: 'cn',
      phone: this.pValue
  	}
  },
  watch: {
    pValue (val) {
      this.phone = val
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      //$("#countryphone").intlTelInput();
    },
    getSelect (val) {
      let _self = this
      this.list.forEach(function(element, index) {
        if (element.d == val) {
          _self.counClass = element.i          
        }
      })
      this.$emit('sendcode',this.first,this.value,this.phone)
    },
    getInput () {
      this.$emit('sendcode',this.first,this.value,this.phone)
    }
  }
}
</script>