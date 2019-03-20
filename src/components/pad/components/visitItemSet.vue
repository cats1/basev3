<template>
	<div class="visitsetitem">
		<h3>{{item.displayName}}
            <template v-if="sort === true">
              <span class="arrange">
              	<span class="up disabled" v-if="first"></span>
              	<span class="up" v-else @click="doUp"></span>
              	<span class="down disabled" v-if="last"></span>
              	<span class="down" v-else @click="doDown"></span>
              </span>
            </template>
            <template v-else>
              <el-button class="right" type="text" @click="doEdit">{{$t('btn.editBtn')}}</el-button>
            </template>
        </h3>
        <div v-show="item.itemType !== 0">        	
        	<div v-show="item.itemType === 3">
        	  <p >{{$t('notice.vset.vdesc')}}</p>
        	</div>
        	<div v-show="item.itemType === 1 && item.addtion">
        	  <p v-if="item.checked">{{$t('notice.vset.vselfdesc')}}</p>
        	  <p v-else>{{$t('notice.vset.vselfdesc1')}}</p>
        	</div>
        </div>
        <el-collapse-transition>
          <div class="paddingtb20" v-show="isShow">
        	<div>
              <el-input class="marginbom20 inputwidth220" v-model="item.displayName" :disabled="readonly" :readonly="readonly"></el-input>
              <span v-if="item.itemType !== 0">
                <template v-if="item.itemType === 2">
                  <template v-if="defaultVsetIsDisplayPointShow">
                    <el-checkbox v-model="required" @change="setItemRequired">{{$t('btn.insetBtn')}}</el-checkbox>
                    <el-checkbox v-model="isDisplay" @change="setItemIsDisplay">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                  <template v-else>
                    <el-checkbox v-model="item.checked" @change="setItemChecked">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                </template>
                <template v-else-if="item.itemType === 3">
                  <template v-if="defaultVsetIsDisplayPointShow">
                    <el-checkbox v-model="required" @change="setItemRequired">{{$t('btn.insetBtn')}}</el-checkbox>
                    <el-checkbox v-model="isDisplay" @change="setItemIsDisplay">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                  <template v-else>
                    <el-checkbox v-model="item.checked" @change="setItemChecked">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                </template>
                <template v-else>
                  <template v-if="defaultVsetIsDisplayPointShow">
                    <el-checkbox v-model="required" @change="setItemRequired">{{$t('btn.insetBtn')}}</el-checkbox>
                    <el-checkbox v-model="isDisplay" @change="setItemIsDisplay">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                  <template v-else>
                    <el-checkbox v-model="item.checked" @change="setItemChecked">{{$t('btn.visible')}}</el-checkbox>
                  </template>
                </template>
              </span>
              <span v-else>
                <template v-if="defaultVsetIsDisplayPointShow">
                  <el-checkbox v-model="required" @change="setItemRequired">{{$t('btn.insetBtn')}}</el-checkbox>
                  <el-checkbox v-model="isDisplay" @change="setItemIsDisplay">{{$t('btn.visible')}}</el-checkbox>
                </template>                
              </span>            
            </div>
            <div v-show="item.inputType === 'button'">
            	<template v-for="(citem,cindex) in inputArray" >
                    <input-one :value="citem" :index="cindex" @getv="setValueItem" @delekit="deleteValueItem"></input-one>
                </template>
                <el-button class="block margintb20" @click="addInputValue" v-show="inputArray.length < 4">{{$t('btn.addSelectBtn')}}</el-button>
            </div>
            <div class="block">
	          <el-button type='success' @click="saveEdit">{{$t('btn.saveBtn')}}</el-button>
	          <el-button type='default' @click="cancelEdit">{{$t('btn.cancelBtn')}}</el-button>
	          <el-button v-show="item.itemType === 1" class="right" type='redfont' @click="deleteEdit">{{$t('btn.deleteBtn')}}</el-button>
	        </div>
          </div>
        </el-collapse-transition>        
	</div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {inputOne} from '@/components/input'
import {booleanToNumber,numberToBoolean,stringToArray,arrayToString} from '@/utils/common'
export default {
  components: { inputOne },
  props: {
  	vitem: {
  	  type: Object,
  	  default: {}
  	},
  	vtype: {
  	  type: Number,
  	  default: 0
  	},
  	vsort:{
  	  type: Boolean,
  	  default: false
  	},
  	vindex:{
  	  type: Number,
  	  default: 0
  	},
  	vshow:{
  	  type: Boolean,
  	  default: false
  	},
  	vlength:{
  	  type: Number,
  	  default: 0
  	}
  },
  data () {
  	return {
  	  sort: false,
  	  item: this.vitem,
  	  isShow: this.vshow,
  	  index: this.vindex,
  	  deleteShow: false,
  	  inputArray: [],
  	  readonly: false,
  	  first: this.vindex === 0 ? true : false,
  	  last: false,
      isDisplay: false,
      required: false,
      defaultVsetIsDisplayPointShow: process.env.defaultVsetIsDisplayPointShow || false
  	}
  },
  watch: {
  	vitem (val,old) {
  	  this.item = val
      if (val.required != 0) {
        this.required = true
      } else {
        this.required = false
      }
      if (val.isDisplay != 0) {
        this.isDisplay = true
      } else {
        this.isDisplay = false
      }
      
  	  this.init()
  	},
  	vtype (val) {
  	  //console.log(val)
  	},
  	vsort (val) {
  	  this.sort = val
  	},
  	vindex (val) {
  	  this.index = val
  	},
  	vshow (val) {
  	  this.isShow = val
  	}
  },
  mounted () {
    if (this.vitem.isDisplay != 0) {
      this.isDisplay = true
    } else {
      this.isDisplay = false
    }
    if (this.vitem.required != 0) {
      this.required = true
    } else {
      this.required = false
    }
  	this.init()
  },
  methods: {
  	stringToArray: stringToArray,
  	arrayToString: arrayToString,
  	init () {
  	  if (this.vindex + 1 === this.vlength) {
	  	 this.last = true
	    }
  	  this.readonly = this.vitem.itemType === 3 ? true : false
  	  this.inputArray = stringToArray(this.vitem.inputValue)
  	  this.isShow = this.vitem.vshow
  	},
  	doEdit () {
      this.isShow = true
  	},
  	doUp () {
  	  this.$emit('upkit',this.vindex)
  	},
  	doDown () {
  	  this.$emit('downkit',this.vindex)
  	},
    setItemIsDisplay (val) {
      if (!val) {
        this.required = false
        this.item.checked = false
        this.$emit('checkkit',this.vindex,false)
      }
      this.$emit('displaykit',this.vindex,val,this.item.isDisplay)
    },
    setItemRequired (val) {
      if (val) {
        this.isDisplay = true
        this.$emit('displaykit',this.vindex,true,this.item.isDisplay)
      }
      this.$emit('checkkit',this.vindex,val)
    },
  	setItemChecked (val) {
      this.item.isDisplay = val
      if (val) {
        this.isDisplay = true
        this.$emit('displaykit',this.vindex,true,this.item.isDisplay)
      }
  	  this.$emit('checkkit',this.vindex,val)
  	},
  	setValueItem (index,value) {
  	  this.inputArray[index] = value
  	},
  	deleteValueItem (index,value) {
  		if (this.inputArray.length > 1) {
  	      this.isShow = false
  		  this.inputArray.splice(index,1)
  		} else {
  		  this.$message({
  		  	type: 'warning',
  		  	message: '最少一个选项'
  		  })
  		}
  	},
  	addInputValue () {
  	  this.inputArray.push('')
  	},
  	saveEdit () {
      this.isShow = false
      this.item.inputValue = arrayToString(this.inputArray)
      this.$emit('savekit',this.item,this.index)
  	},
  	cancelEdit () {
  	  this.isShow = false
  	  this.$emit('cancelkit',this.item,this.index)
  	  this.inputArray = stringToArray(this.item.inputValue)
  	},
  	deleteEdit () {
  	  this.$emit('delekit',this.index)
  	}
  }
}
</script>