<template>
	<div class="lrmenuwrap">
		<div class="lrmenu-left">
		  <h3>选择部门</h3>
      <div class="leadheadwrap">
        <template v-for="(citem,index) in headItem">
          <template v-if="index === 0">
            <div class="c_selector_navbar_item" @click="goitem(citem,index)"><span>{{citem.name}}</span></div>
          </template>
          <template v-else>
            <div class="c_selector_navbar_item" @click="goitem(citem,index)"><i class="fa fa-angle-right"></i><span>{{citem.name}}</span></div>
          </template>  
        </template>
      </div>
		  <template v-for="(item,index) in leftItem">
        <div class="lrmenu-check-item">
          <p class="lrmenu-item" @click.once="selectItem(item)">
            <el-checkbox :label="item.label" v-model="checkArray[index]"><img :src="logo" alt="">{{item.label}}</el-checkbox></p>
          <template v-if="checkLength(item.children) === true">
            <span class="lrmenu-check-next itemgray" v-if="checkArray[index] === true" >下级</span>
            <span class="lrmenu-check-next " v-else @click="selectNext(item)">下级</span>
          </template>
          <template v-else>
            <!-- <span>8888</span> -->
          </template>
        </div>
		  </template>
		</div>
		<div class="lrmenu-right">
      <h3>已选部门</h3>
		  <template v-for="(item,index) in rightItem">
		  	<p class="lrmenu-item"><img :src="logo" alt="">{{item.label}}
		  		<span class="lrmenu-item-close" @click="removeItem(item,index)"><i class="fa fa-close"></i></span></p>
		  </template>
		</div>
	</div>
</template>
<script>
export default {
  props: ['leftData','rightData'],
  data () {
  	return {
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
    }
  },
  mounted () {
    this.rightItem = this.rightData
    this.leftItem = this.checkIsSelect(this.leftData)
    this.setHead()
  },
  methods: {
    setHead (){
      let hobj = {
        name: '部门列表',
        item: this.checkIsSelect(this.leftData)
      }
      this.headItem.push(hobj)
    },
    checkLength (val) {
      return val.length > 0
    },
  	selectItem (item) {
      console.log(item)
      console.log(this.rightItem)
      let obj = this.rightItem
      obj.push(item)
  	  this.rightItem = obj
  	  this.$emit('menukit',this.rightItem)
  	},
    goitem (item,index) {
      console.log(item)
      this.leftItem = this.checkIsSelect(this.headItem[index].item)
      this.headItem = this.headItem.slice(0,index+1)
    },
    selectNext (item) {
      this.leftItem = this.checkIsSelect(item.children)
      let hobj = {
        name: item.label,
        item: item.children
      }
      this.headItem.push(hobj)
    },
    itemIsChecked (item) {
      let _self = this
      let cFlag = false
      _self.rightItem.forEach(function(rele, rindex) {
        if (item.label === rele.label && item.pid === rele.pid) {
          cFlag = true
        }
      })
      return cFlag
    },
    checkIsSelect (item) {
      let _self = this
      if (item instanceof Array) {
        item.forEach(function(element, index) {    
          _self.rightItem.forEach(function(rele, rindex) {
            if (element.label === rele.label && element.pid === rele.pid) {
              element.isChecked = true
              _self.checkArray[index] = true
            }
          })
        })
      } else {
        _self.rightItem.forEach(function(rele, rindex) {
          if (item.label === rele.label && item.pid === rele.pid) {
            item.isChecked = true
          }
        })
        this.checkArray[0] = true 
      }
      return item
    },
    selectItemFalse (item,index) {
      let _self = this
      this.leftItem.forEach(function(element, eindex) {
        if (element.label === item.label && element.pid === item.pid) {
          //_self.leftItem.splice(eindex,1)
          //element.isChecked = true
          _self.checkArray[index] = false
        }
      })
    },
  	removeItem (item,index) {
      this.rightItem.splice(index,1)
      this.$emit('menukit',this.rightItem)
      this.selectItemFalse(item,index)
  	}
  }
}
</script>
<style lang="scss" scoped>
.lrmenuwrap{
	width:100%;
	overflow:hidden;
  text-align:left;
	.lrmenu-left,.lrmenu-right{
		width:50%;
		display:inline-block;
		float:left;
	}
}
.lrmenu-item{
  line-height:36px;
  img{
  	margin:0 5px;
  }
  .lrmenu-item-close{
  	float:right;
  }
}
.leadheadwrap {
    padding: 5px 11px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    .c_selector_navbar_item {
      max-width: 33%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #38adff;
      float: left;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      padding-left: 22px;
      .iconfont {
        position: absolute;
        left: 2px;
        color: #333;
        font-size: 14px;
      }
  }
}
.lrmenu-check-item{
  position:relative;
  .lrmenu-check-next {
    position:absolute;
    right:0;
    top:0;
    height:36px;
    line-height:36px;
    border-left:1px solid #38adff;
    color: #38adff;
    font-size: 14px;
    position: absolute;
    right: 0;
    cursor: pointer;
    padding-left: 10px;
    border-left: 1px solid #eee;
    -webkit-text-stroke-width: inherit;
    text-stroke-width: inherit;
    &.itemgray {
      pointer-events: none;
      color: gray;
    }
  }
}
</style>