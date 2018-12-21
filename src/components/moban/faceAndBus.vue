<template>
	<div>
    <template v-if="customTemplateShow">
      <new-tabs :is-get="isshow" :list="editableTabs" @getchange="init"></new-tabs>
    </template>
    <template v-else>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane :label="$t('moban.facemoban')" name="face" @tab-click="activeName === 'face'">
          <interview mtype="面试" mapid="facemap" :isshow="faceShow" ></interview>
        </el-tab-pane>
        <el-tab-pane :label="$t('moban.busmoban')" name="bus" @tab-click="activeName === 'bus'">
          <business mtype="商务" mapid="busmap" :isshow="!faceShow"></business>
        </el-tab-pane>
      </el-tabs>
    </template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import managerTemp from './managerTemp'
import interview from './interview'
import business from './interview'
import newTabs from './newTabs'
export default {
  props: ['isshow'],
  components: { interview, business, managerTemp, newTabs },
  data () {
  	return {
  	  activeName: 'face',
  	  faceShow: false,
      editableTabsValue: '0',
      tabIndex: 0,
      editableTabs: [],
      tabForm: {
        title: '',
        name: '3',
        id: 'newtab3',
        showValue: false,
        closable: false
      },
      dialogVisible: false,
      customTemplateShow: process.env.customTemplateShow || false,
      clickNum: 0,
      clickIndex: 0,
      editType: 'add',
      touchtime: new Date().getTime(),
      rules: {
        title: [
          { required: true, message: this.$t('tempNameNotNull'), trigger: 'blur' }
        ]
      }
  	}
  },
  watch: {
  	activeName (val) {
  	  if (val == 'face') {
  	  	this.faceShow = true
  	  } else {
  	  	this.faceShow = false
  	  }
  	},
  	isshow (val) {
      if (this.customTemplateShow){
        if (val) {
          this.init()
        }
      }
  	  if (this.activeName == 'face') {
  	  	this.faceShow = true
  	  }
  	},
    editableTabsValue (val) {
      let _self = this
      this.editableTabs.forEach(function(element, index) {
        if (index == parseInt(val)) {
          element.showValue = true
        } else {
          element.showValue = false
        }
      })
    }
  },
  mounted () {
    if (this.customTemplateShow) {
      this.init()
    }
  },
  methods: {
    init () {
      this.GetAllTemplateType()
    },
    GetAllTemplateType () {
      let newForm = {
        userid: getCache('userid')
      }
      this.$store.dispatch('GetAllTemplateType',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          let nArray = []
          let faceArray = []
          let busArray = []
          let _self = this
          let nArrayIndex = 2
          result.forEach(function(element, index) {

            let idName = ''
            let showValue = false
            let closable = true
            if (index == 0) {
              showValue = true
              _self.editableTabsValue = index.toString()
              _self.tabIndex = index
            }
            if (element.templateType == '面试') {
              idName = 'face'
              //showValue = true
              closable = false
              //_self.editableTabsValue = index.toString()
              //_self.tabIndex = index
              let obj = {
                title: element.templateType,
                name: '0',
                id: idName,
                showValue: showValue,
                closable: closable,
                type: 'old'
              }
              faceArray.push(obj)
            } else if (element.templateType == '商务') {
              idName = 'bus'
              closable = false
              showValue = false
              let obj = {
                title: element.templateType,
                name: '1',
                id: idName,
                showValue: showValue,
                closable: closable,
                type: 'old'
              }
              busArray.push(obj)
            } else {
              idName = 'new' + nArrayIndex
              showValue = false
              let obj = {
                title: element.templateType,
                name: nArrayIndex.toString(),
                id: idName,
                showValue: showValue,
                closable: closable,
                type: 'old'
              }
              nArray.push(obj)
              nArrayIndex ++ 
            }            
          })
          faceArray = faceArray.concat(busArray,nArray)
          this.editableTabs = faceArray
        }
      })
    }
  }
}
</script>