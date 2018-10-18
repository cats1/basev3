<template>
	<div class="lrmenuwrap">
		<div class="lrmenu-left">
		  <h3>{{$t('depart.smember')}}</h3>
      <el-input v-model="sname" @change="searchItem"></el-input>
      <div class="leadheadwrap">
        <div class="c_selector_navbar_item" @click="getAllItem"><span>{{$t('depart.allEmp')}}</span></div>
      </div>
      <div class="lrmenu-check-wrap">
  		  <template v-for="(item,index) in leftItem">
          <check-item :index="index" :emp-obj="item" :check-value="checkValue" :check-array="rightItem" @click="getItem"></check-item>
  		  </template>
      </div>
		</div>
		<div class="lrmenu-right">
      <h3>{{$t('depart.hasMember')}}</h3>
		  <template v-for="(item,index) in rightItem">
		  	<p class="lrmenu-item"><img :src="logo" alt="">{{item.empName}}
		  		<span class="lrmenu-item-close" @click="removeItem(item,index)"><i class="fa fa-close"></i></span></p>
		  </template>
		</div>
	</div>
</template>
<script>
import checkItem from './checkItem'
export default {
  props: {
    leftData: {
      type: Array,
      default: []
    },
    rightData: {
      type: Array,
      default: []
    },
    checkValue: {
      type: Boolean,
      default: true
    },
    checkNum: {
      type: Number,
      default: 0
    },
    searchFlag: {
      type: Boolean,
      default: false
    }
  },
  components: {checkItem},
  data () {
  	return {
      sname: '',
  	  leftList: this.leftData,
  	  clist: this.rightData,
      leftItem: [],
      rightItem: this.rightData,
      headItem: [],
      checkArray: [],
  	  logo: require('@/assets/img/spot.png')
  	}
  },
  watch: {
    leftData (val) {
      this.leftList = val
      this.leftItem = this.checkIsSelect(val)
    },
    rightData (val) {
      this.clist = val
      this.rightItem = val
    },
    checkValue (val) {},
    checkNum (val) {},
    searchFlag (val) {
      this.sname = ''
    }
  },
  mounted () {
    this.rightItem = this.rightData
    this.leftItem = this.checkIsSelect(this.leftData)
  },
  methods: {
    getItem (val,index,item) {
      if (val) {
        if (!this.checkRightIsSelect(item)) {
          this.rightItem.push(item)
        }
      } else {
        this.removeRightSelect(item)
      }
      this.$emit('menukit',this.rightItem)
    },
    checkRightIsSelect (item) {
      let _self = this
      let sFlag = false
      this.rightItem.forEach(function(element, index) {
        if (element.empid === item.empid) {
          sFlag = true
        }
      })
      return sFlag
    },
    removeRightSelect (item) {
      let _self = this
      let sArray = []
      this.rightItem.forEach(function(element, index) {
        if (element.empid !== item.empid) {
          sArray.push(element)
        }
      })
      this.rightItem = sArray
    },
    getAllItem () {
      this.leftItem = this.checkIsSelect(this.leftList)
    },
    searchItem (val) {
      let _self = this
      let sArray = []
      this.leftList.forEach(function(element, index) {
        if (element.empName.indexOf(val) > -1) {
          sArray.push(element)
        }
      })
      this.checkIsSelect(sArray)
      this.leftItem = sArray
    },
    checkIsSelect (item) {
      let _self = this
      this.checkArray = []
      item.forEach(function(element, index) {    
        _self.rightItem.forEach(function(rele, rindex) {
          if (element.empid === rele.empid) {
            element.isChecked = true
            _self.$set(_self.checkArray,index,true)
          }
        })
      })
      return item
    },
  	removeItem (item,index) {
      this.rightItem.splice(index,1)
      this.leftItem = this.checkIsSelect(this.leftItem)
      this.$emit('menukit',this.rightItem)
  	}
  }
}
</script>
<style lang="scss" scoped></style>