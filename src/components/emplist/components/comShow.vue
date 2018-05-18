<template>
	<div class="block paddingtb20" v-loading="loading">
		<template v-for="(item,index) in empBarList">
			<div class="empitemwrap">
			  <span class="empitemtitle" @click="doTitleShow(index)">{{item.companyName}}</span>
			  <el-collapse-transition>
				<div class="empsectionwrap" v-show="item.isShow">
				  <template v-for="(pitem,pindex) in item.children">
				  		<emp-item :semp-array="sempArray" :emp-item="pitem" :check-show="checkShow" @scheckkit="getCheckItem" @sempkit="checkItem"></emp-item>
				  </template>
				</div>
			  </el-collapse-transition>
			</div>
		</template>
	</div>
</template>
<script>
import empItem from './empItem'
import {getCache} from '@/utils/auth'
import {gb2pinying} from '@/utils/pinyin'
import {getCharacter,stringToArray,arrayToString} from '@/utils/common'
export default {
  components: {empItem},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    allShow: {
      type: Boolean,
      default: false
    },
    slist: {
      type: Array,
      default: []
    },
    updateShow:{
      type: Boolean,
      default: false
    }
  },
  data () {
  	return {
      showType:1,
      total:0,
      empBarList: [],
      checkShow: false,
      checked: false,
      sempArray: this.slist,
      defaultList: [],
      loading: true
  	}
  },
  watch: {
  	isShow (val) {
  	  if (val) {
  	  	this.getSubAccountByUserid()
  	  }
  	},
    allShow (val) {
      this.checkShow = val
      this.getSubAccountByUserid()
    },
    slist(val) {
      this.sempArray = val
    },
    updateShow (val) {
      if (val) {
        this.getSubAccountByUserid()
      }
    }
  },
  computed: {},
  mounted () {
  	if (this.isShow) {
  	  	this.getSubAccountByUserid()
  	}
  },
  methods: {
  	doTitleShow (index) {
  	  this.empBarList[index].isShow = !this.empBarList[index].isShow
  	},
    getCheckItem (item,val) {
      this.$emit('scheckkit',item,val)
    },
    checkItem (pitem) {
      this.$emit('sempkit',pitem)
    },
    getSubAccountByUserid () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getSubAccountByUserid',nform).then(res => {
      	let {status,result} = res
        if (status === 0) {
          let comArray = [{
          	id: 0,
          	companyName: '默认'
          }]
          for (let i=0;i<result.length;i++) {
            let item = result[i]
            comArray.push(item)
          }
          this.comList = comArray
          this.getEmpList()
        }
      })
    },
    getEmpList () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetEmpList',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.loading = false
          let total = result.length
          let _self = this
          let comArray = []
          this.comList.forEach(function(ele,index){
          	let eobj = ele
          	eobj.children = []
          	eobj.isShow = _self.allShow
            result.forEach(function(citem,cindex){
              if (citem.subaccountId === ele.id) {
              	citem.checked = _self.allShow
              	eobj.children.push(citem)
              }
            })
            comArray.push(eobj)
          })
          this.empBarList = comArray
        }
      })
    }
  }
}
</script>